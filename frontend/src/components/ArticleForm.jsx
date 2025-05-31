import { Typography, TextField, Button, Box } from '@mui/material';
import { useState } from 'react';
import usePosts from '../hooks/usePosts';
import useAuth from '../hooks/useAuth';

const ArticleForm = () => {
  const { createPost } = usePosts();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user?.id) return alert('Author not found');

    createPost({
      title,
      content,
      author_id: user.id,
    });

    setTitle('');
    setContent('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600 }}>
      <Typography variant="h3" mb={1}>
        Create / Edit Article
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
