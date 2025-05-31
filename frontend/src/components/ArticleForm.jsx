import { Typography, TextField, Button, Box } from '@mui/material';

const ArticleForm = () => {
  return (
    <Box component="form" sx={{ maxWidth: 600 }}>
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
      />

      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Save
      </Button>
    </Box>
  );
};

export default ArticleForm;
