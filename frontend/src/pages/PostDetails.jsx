import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';

import usePost from '../hooks/usePost';

const PostDetails = () => {
  const { id } = useParams();
  const { post, loading, error } = usePost(id);

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
