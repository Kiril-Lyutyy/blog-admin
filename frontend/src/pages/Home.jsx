import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import usePosts from '../hooks/usePosts';
import useAuth from '../hooks/useAuth';

const stripHtml = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

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
  });
  const { user } = useAuth();
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
    setPage(1);
  };

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
    setPage(1);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
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
    <Box pb={4}>
      <Box display={'flex'} justifyContent="space-between" alignItems="center">
        <Typography variant="h3" mb={3}>
          Blog Posts
        </Typography>

        <Box
          mb={3}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          gap={2}
          flexWrap="wrap"
        >
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Sort by</InputLabel>
            <Select value={sort} label="Sort by" onChange={handleSortChange}>
              <MenuItem value="created_at">Date</MenuItem>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="author">Author</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Order</InputLabel>
            <Select value={order} label="Order" onChange={handleOrderChange}>
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Posts per page</InputLabel>
            <Select
              value={limit}
              label="Posts per page"
              onChange={handleLimitChange}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      <Grid>
        {posts.map((post) => {
          const cleanContent = stripHtml(post.content);
          const preview =
            cleanContent.length > 120
              ? cleanContent.slice(0, 120) + '...'
              : cleanContent;

          const canEdit =
            user &&
            user.permissions.includes('edit_posts') &&
            user.email === post.author;

          return (
            <Grid item xs={12} key={post.id}>
              <Box
                mb={2}
                sx={{
                  backgroundColor: '#2E2E2E',
                  borderRadius: 2,
                  padding: 2,
                  border: '1px solid #555',
                }}
              >
                <Box mb={0.5}>
                  <Typography
                    variant="h5"
                    component={Link}
                    to={`/posts/${post.id}`}
                    sx={{
                      textDecoration: 'none',
                      color: 'primary.main',
                      cursor: 'pointer',
                    }}
                  >
                    {post.title}
                  </Typography>
                </Box>

                <Typography
                  variant="body1"
                  fontSize={9}
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  By {post.author} on{' '}
                  {new Date(post.created_at).toLocaleDateString()}
                </Typography>

                <Typography mb={4} fontSize={11}>
                  {preview}
                </Typography>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Box>
                    {cleanContent.length > 120 && (
                      <Button
                        component={Link}
                        to={`/posts/${post.id}`}
                        size="small"
                        variant="contained"
                        color="secondary"
                      >
                        Read More
                      </Button>
                    )}
                  </Box>

                  {canEdit && (
                    <Box display="flex" gap={1}>
                      <Button
                        component={Link}
                        to={`/posts/${post.id}/edit`}
                        size="small"
                        variant="outlined"
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(post.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={totalPages > 0 ? totalPages : 1}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default Home;
