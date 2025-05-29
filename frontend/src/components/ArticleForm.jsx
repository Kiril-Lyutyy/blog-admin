import React from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';

const ArticleForm = () => {
  return (
    <Box component="form" sx={{ maxWidth: 600 }}>
      <Typography variant="h4" mb={3}>
        Create / Edit Article
      </Typography>

      <TextField label="Title" fullWidth margin="normal" required />
      <TextField
        label="Content"
        multiline
        rows={8}
        fullWidth
        margin="normal"
        required
      />

      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Save
      </Button>
    </Box>
  );
};

export default ArticleForm;
