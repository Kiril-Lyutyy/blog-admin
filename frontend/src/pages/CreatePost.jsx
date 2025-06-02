import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import PostForm from '../components/PostForm';
import { useAuth } from '../context/AuthContext';
import usePosts from '../hooks/usePosts';

const CreatePostPage = () => {
  const navigate = useNavigate();
  const { createPost } = usePosts();
  const { user } = useAuth();

  const handleCreate = async ({ title, content }) => {
    try {
      if (!user?.id) {
        throw new Error('Author not found');
      }

      await createPost({ title, content, author_id: user.id });
      toast.success('Post created successfully!');
      navigate('/', { replace: true });
    } catch (err) {
      toast.error(`Failed to create post: ${err.message}`);
    }
  };

  return <PostForm onSubmit={handleCreate} />;
};

export default CreatePostPage;
