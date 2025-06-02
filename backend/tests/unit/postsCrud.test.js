import { jest } from '@jest/globals';

const actualPostModel = await import('../../src/models/post.model.js');

const mockFindAllPosts = jest.fn();
const mockFindPostById = jest.fn();
const mockCreatePostModel = jest.fn();
const mockGetPostWithAuthorById = jest.fn();
const mockUpdatePostById = jest.fn();
const mockDeletePostById = jest.fn();

jest.unstable_mockModule('../../src/models/post.model.js', () => ({
  ...actualPostModel,
  findAllPosts: mockFindAllPosts,
  findPostById: mockFindPostById,
  createPost: mockCreatePostModel,
  getPostWithAuthorById: mockGetPostWithAuthorById,
  updatePostById: mockUpdatePostById,
  deletePostById: mockDeletePostById,
}));

const { getPosts, getPostById, createPost, updatePost, deletePost } =
  await import('../../src/controllers/post.controller.js');

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('Post Controller', () => {
  let req, res;

  beforeEach(() => {
    req = { params: {}, query: {}, body: {}, user: { id: 1, permissions: [] } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('getPosts', () => {
    it('should return posts with totalCount', async () => {
      const fakePosts = [{ id: 1 }, { id: 2 }];
      mockFindAllPosts.mockResolvedValue({ posts: fakePosts, total: 15 });
      req.query = { page: '2', limit: '5', sort: 'title', order: 'asc' };

      await getPosts(req, res);

      expect(mockFindAllPosts).toHaveBeenCalledWith({
        page: 2,
        limit: 5,
        sort: 'title',
        order: 'asc',
      });
      expect(res.json).toHaveBeenCalledWith({
        posts: fakePosts,
        totalCount: 15,
      });
    });

    it('should handle errors with status 500', async () => {
      mockFindAllPosts.mockRejectedValue(new Error('fail'));
      await getPosts(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Failed to fetch posts',
      });
    });
  });

  describe('getPostById', () => {
    it('should return post if found', async () => {
      const post = { id: 123 };
      mockFindPostById.mockResolvedValue(post);
      req.params.id = 123;

      await getPostById(req, res);

      expect(mockFindPostById).toHaveBeenCalledWith(123);
      expect(res.json).toHaveBeenCalledWith(post);
    });

    it('should return 404 if post not found', async () => {
      mockFindPostById.mockResolvedValue(null);
      req.params.id = 999;

      await getPostById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Post not found' });
    });

    it('should return 500 on error', async () => {
      mockFindPostById.mockRejectedValue(new Error('fail'));
      await getPostById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Failed to fetch post',
      });
    });
  });

  describe('createPost', () => {
    it('should create a post and return it with 201', async () => {
      const postId = 10;
      const createdPost = { id: postId, title: 'Test', author: { id: 1 } };
      req.body = { title: 'Test', content: 'Content', author_id: 1 };

      mockCreatePostModel.mockResolvedValue(postId);
      mockGetPostWithAuthorById.mockResolvedValue(createdPost);

      await createPost(req, res);

      expect(mockCreatePostModel).toHaveBeenCalledWith({
        title: 'Test',
        content: 'Content',
        author_id: 1,
      });
      expect(mockGetPostWithAuthorById).toHaveBeenCalledWith(postId);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Post created',
        post: createdPost,
      });
    });

    it('should return 500 on error', async () => {
      req.body = { title: 'Test', content: 'Content', author_id: 1 };
      mockCreatePostModel.mockRejectedValue(new Error('fail'));

      await createPost(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Failed to create post',
      });
    });
  });

  describe('updatePost', () => {
    it('should update post if user is author and has permission', async () => {
      req.params.id = 5;
      req.user = { id: 42, permissions: ['edit_posts'] };
      req.body = { title: 'Updated Title' };

      mockFindPostById.mockResolvedValue({ id: 5, author_id: 42 });
      mockUpdatePostById.mockResolvedValue(true);

      await updatePost(req, res);

      expect(mockFindPostById).toHaveBeenCalledWith(5);
      expect(mockUpdatePostById).toHaveBeenCalledWith(5, {
        title: 'Updated Title',
      });
      expect(res.json).toHaveBeenCalledWith({ message: 'Post updated' });
    });

    it('should return 404 if post not found', async () => {
      mockFindPostById.mockResolvedValue(null);
      req.params.id = 5;

      await updatePost(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Post not found' });
    });

    it('should return 403 if user is not author', async () => {
      mockFindPostById.mockResolvedValue({ id: 5, author_id: 1 });
      req.params.id = 5;
      req.user = { id: 2, permissions: ['edit_posts'] };

      await updatePost(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message: 'You can only edit your own posts',
      });
    });

    it('should return 403 if user lacks edit permission', async () => {
      mockFindPostById.mockResolvedValue({ id: 5, author_id: 2 });
      req.params.id = 5;
      req.user = { id: 2, permissions: [] };

      await updatePost(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message: 'You do not have permission to edit posts',
      });
    });

    it('should return 404 if update failed', async () => {
      mockFindPostById.mockResolvedValue({ id: 5, author_id: 2 });
      mockUpdatePostById.mockResolvedValue(false);
      req.params.id = 5;
      req.user = { id: 2, permissions: ['edit_posts'] };
      req.body = { title: 'Updated' };

      await updatePost(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Post not found or not updated',
      });
    });

    it('should return 500 on error', async () => {
      mockFindPostById.mockRejectedValue(new Error('fail'));
      req.params.id = 5;

      await updatePost(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Failed to update post',
      });
    });
  });

  describe('deletePost', () => {
    it('should delete post and return success message', async () => {
      req.params.id = 12;
      mockDeletePostById.mockResolvedValue(true);

      await deletePost(req, res);

      expect(mockDeletePostById).toHaveBeenCalledWith(12);
      expect(res.json).toHaveBeenCalledWith({ message: 'Post deleted' });
    });

    it('should return 404 if post not found', async () => {
      mockDeletePostById.mockResolvedValue(false);
      req.params.id = 13;

      await deletePost(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Post not found' });
    });

    it('should return 500 on error', async () => {
      mockDeletePostById.mockRejectedValue(new Error('fail'));
      req.params.id = 14;

      await deletePost(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Failed to delete post',
      });
    });
  });
});

afterAll(() => {
  console.error.mockRestore();
});
