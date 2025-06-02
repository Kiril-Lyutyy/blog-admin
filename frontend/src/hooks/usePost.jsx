import { useCallback, useEffect, useState } from 'react';

import { getPostById } from '../api/postsApi';

const usePost = (id) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState(null);

  const fetchPost = useCallback(async () => {
    if (!id) {
      return;
    }
    setLoading(true);
    try {
      const response = await getPostById(id);
      setPost(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch post');
      setPost(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return { post, loading, error, refetch: fetchPost };
};

export default usePost;
