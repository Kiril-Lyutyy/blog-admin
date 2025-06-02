import { useCallback, useEffect, useState } from 'react';

import {
  createPost as createPostApi,
  deletePost,
  getPosts,
  updatePost,
} from '../api/postsApi';

const usePosts = ({
  page = 1,
  limit = 10,
  sort = 'created_at',
  order = 'desc',
  autoFetch,
} = {}) => {
  const [posts, setPosts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
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
  }, [page, limit, sort, order]);

  const handleCreate = async (data) => {
    try {
      await createPostApi(data);
      if (autoFetch) {
        await fetchPosts();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await updatePost(id, data);
      if (autoFetch) {
        await fetchPosts();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      if (autoFetch) {
        await fetchPosts();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete post');
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchPosts();
    }
  }, [fetchPosts, autoFetch]);

  return {
    posts,
    totalCount,
    loading,
    error,
    refetch: fetchPosts,
    createPost: handleCreate,
    updatePost: handleUpdate,
    deletePost: handleDelete,
  };
};

export default usePosts;
