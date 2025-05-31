import { useEffect, useState, useCallback } from 'react';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../api/postsApi';

const usePosts = ({
  page = 1,
  limit = 10,
  sort = 'created_at',
  order = 'desc',
} = {}) => {
  const [posts, setPosts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await getPosts({ page, limit, sort, order });
      setPosts(response.data.posts);
      setTotalCount(response.data.totalCount);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const fetchPost = useCallback(async (id) => {
    try {
      const response = await getPostById(id);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch post');
      return null;
    }
  }, []);

  const handleCreate = async (data) => {
    try {
      await createPost(data);
      await fetchPosts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await updatePost(id, data);
      await fetchPosts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      await fetchPosts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete post');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page, limit, sort, order]);

  return {
    posts,
    totalCount,
    loading,
    error,
    refetch: fetchPosts,
    fetchPost,
    createPost: handleCreate,
    updatePost: handleUpdate,
    deletePost: handleDelete,
  };
};

export default usePosts;
