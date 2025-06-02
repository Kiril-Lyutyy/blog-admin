import {
  createPost as createPostModel,
  deletePostById,
  findAllPosts,
  findPostById,
  getPostWithAuthorById,
  updatePostById,
} from '../models/post.model.js';

export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || 'created_at';
    const order = req.query.order || 'desc';

    const { posts, total } = await findAllPosts({ page, limit, sort, order });
    res.json({ posts, totalCount: total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await findPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch post' });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, content, author_id } = req.body;

    const id = await createPostModel({ title, content, author_id });
    const createdPost = await getPostWithAuthorById(id);

    res.status(201).json({
      message: 'Post created',
      post: createdPost,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create post' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const userPermissions = req.user.permissions || [];

    // Find the post first to check author
    const post = await findPostById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check ownership
    if (post.author_id !== userId) {
      return res
        .status(403)
        .json({ message: 'You can only edit your own posts' });
    }

    // Check permission
    if (!userPermissions.includes('edit_posts')) {
      return res
        .status(403)
        .json({ message: 'You do not have permission to edit posts' });
    }

    // Proceed to update
    const updated = await updatePostById(postId, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Post not found or not updated' });
    }

    res.json({ message: 'Post updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update post' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const deleted = await deletePostById(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete post' });
  }
};
