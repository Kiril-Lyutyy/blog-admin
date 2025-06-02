import {
  Alert,
  Box,
  CircularProgress,
  Pagination,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';

import PostCard from '../../components/PostCard';
import SortOrderLimitControls from '../../components/SortOrderLimitControls';
import { useAuth } from '../../context/AuthContext';
import usePosts from '../../hooks/usePosts';
import { Container } from './styles';

const Home = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sort, setSort] = useState('created_at');
  const [order, setOrder] = useState('desc');

  const { posts, loading, error, totalCount, deletePost } = usePosts({
    page,
    limit,
    sort,
    order,
    autoFetch: true,
  });
  const { user } = useAuth();

  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  const handlePageChange = (_, value) => setPage(value);

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
    setPage(1);
  };

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
    setPage(1);
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId);
        toast.success('Post deleted successfully!');
      } catch (err) {
        toast.error(`Failed to delete post: ${err.message}`);
      }
    }
  };

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h3">Blog Posts</Typography>

        <SortOrderLimitControls
          sort={sort}
          order={order}
          limit={limit}
          onSortChange={handleSortChange}
          onOrderChange={handleOrderChange}
          onLimitChange={handleLimitChange}
        />
      </Box>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {posts.map((post) => {
        const canEdit =
          user &&
          user.permissions.includes('edit_posts') &&
          user.email === post.author;

        return (
          <PostCard
            key={post.id}
            post={post}
            canEdit={canEdit}
            onDelete={handleDelete}
          />
        );
      })}

      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Container>
  );
};

export default Home;
