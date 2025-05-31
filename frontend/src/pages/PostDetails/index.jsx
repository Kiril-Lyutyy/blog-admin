import { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { CircularProgress, Alert } from '@mui/material';
import usePosts from '../hooks/usePosts';
import {
  PostBox,
  PostTitle,
  PostMeta,
  PostContent,
  BackButton,
} from './styles';

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

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!post) return <Alert severity="info">Post not found</Alert>;

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
