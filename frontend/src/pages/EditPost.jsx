import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';
import { getPostById, updatePost } from '../api/postsApi';
import useAuth from '../hooks/useAuth';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      try {
        const response = await getPostById(id);
        setPost(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (err) {
        setError('Failed to fetch post');
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!post) return <Typography>Post not found</Typography>;

  if (post.author_id !== user?.id) {
    return <Alert severity="error">You can only edit your own posts</Alert>;
  }
  if (!user.permissions.includes('edit_posts')) {
    return (
      <Alert severity="error">You do not have permission to edit posts</Alert>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await updatePost(id, { title, content });
      toast.success('Post updated successfully!');
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600, mx: 'auto' }}
    >
      <Typography variant="h4" mb={3}>
        Edit Post
      </Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        minRows={6}
        required
      />
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      <Box mt={3} display="flex" gap={2}>
        <Button type="submit" variant="contained" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
        <Button component={RouterLink} to={`/posts/${id}`} variant="outlined">
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EditPost;
