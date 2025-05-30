import {
  findAllPosts,
  findPostById,
  createPost as createPostModel,
  updatePostById,
  deletePostById,
} from '../models/post.model.js';

export const getPosts = async (req, res) => {
  try {
    const posts = await findAllPosts();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await findPostById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
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
    res.status(201).json({ id, message: 'Post created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create post' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const updated = await updatePostById(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update post' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const deleted = await deletePostById(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete post' });
  }
};
