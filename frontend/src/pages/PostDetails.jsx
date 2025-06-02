import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';

import {
  Typography,
  CircularProgress,
  Alert,
  Box,
  Button,
} from '@mui/material';
import usePosts from '../hooks/usePosts';

const PostDetails = () => {
  const { id } = useParams();
  const { fetchPost, loading, error } = usePosts();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function loadPost() {
      const data = await fetchPost(id);
      setPost(data);
    }
    loadPost();
  }, [id, fetchPost]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!post) {
    return <Typography>Post not found</Typography>;
  }

  return (
    <Box>
      <Button component={RouterLink} to="/" variant="outlined" sx={{ mb: 3 }}>
        Back to Posts
      </Button>
      <Typography variant="h3" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        By {post.author} on {new Date(post.created_at).toLocaleDateString()}
      </Typography>
      <Typography sx={{ whiteSpace: 'pre-line' }}>{post.content}</Typography>
    </Box>
  );
};

export default PostDetails;
