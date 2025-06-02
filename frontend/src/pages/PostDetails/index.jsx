import { Alert,CircularProgress } from '@mui/material';
import { Link as RouterLink,useParams } from 'react-router-dom';

import usePost from '../hooks/usePost';
import {
  BackButton,
  PostBox,
  PostContent,
  PostMeta,
  PostTitle,
} from './styles';

const PostDetails = () => {
  const { id } = useParams();
  const { post, loading, error } = usePost(id);

  if (loading) {return <CircularProgress />;}
  if (error) {return <Alert severity="error">{error}</Alert>;}
  if (!post) {return <Alert severity="info">Post not found</Alert>;}

  return (
    <PostBox>
      <BackButton component={RouterLink} to="/" variant="outlined">
        Back to Posts
      </BackButton>

      <PostTitle variant="h3" gutterBottom>
        {post.title}
      </PostTitle>

      <PostMeta variant="subtitle1">
        By {post.author} on {new Date(post.created_at).toLocaleDateString()}
      </PostMeta>

      <PostContent>{post.content}</PostContent>
    </PostBox>
  );
};

export default PostDetails;
