import { Box,Button, TextField, Typography } from '@mui/material';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuth } from '../context/AuthContext';
import usePosts from '../hooks/usePosts';

const ArticleForm = ({ initialData = null, isEdit = false, onSubmit }) => {
  const { createPost } = usePosts();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setContent(initialData.content || '');
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      return alert('Author not found');
    }

    try {
      if (isEdit && onSubmit) {
        await onSubmit({ title, content });
      } else {
        await createPost({
          title,
          content,
          author_id: user.id,
        });
        toast.success('Post created successfully!');
        navigate('/', { replace: true });
      }

      if (!isEdit) {
        setTitle('');
        setContent('');
      }
    } catch (err) {
      toast.error(
        `Failed to ${isEdit ? 'update' : 'create'} post: ${err.message}`,
      );
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600 }}>
      <Typography variant="h3" mb={1}>
        {isEdit ? 'Edit Article' : 'Create Article'}
      </Typography>

      <TextField
        label="Title"
        margin="normal"
        fullWidth
        size="small"
        variant="outlined"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Content"
        multiline
        rows={8}
        margin="normal"
        fullWidth
        size="small"
        variant="outlined"
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Save
      </Button>
    </Box>
  );
};

export default ArticleForm;
