import { Alert, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import PostForm from '../components/PostForm';
import { useAuth } from '../context/AuthContext';
import usePost from '../hooks/usePost';
import usePosts from '../hooks/usePosts';

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { post, loading, error } = usePost(id);
  const { updatePost } = usePosts();

  const handleUpdate = async ({ title, content }) => {
    try {
      await updatePost(id, { title, content });
      toast.success('Post updated successfully!');
      navigate(`/posts/${id}`, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update post');
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!post) {
    return <Alert severity="error">Post not found</Alert>;
  }

  if (post.author_id !== user?.id) {
    return <Alert severity="error">You can only edit your own posts</Alert>;
  }

  if (!user.permissions.includes('edit_posts')) {
    return (
      <Alert severity="error">You do not have permission to edit posts</Alert>
    );
  }

  return <PostForm initialData={post} onSubmit={handleUpdate} isEdit />;
};

export default EditPostPage;
