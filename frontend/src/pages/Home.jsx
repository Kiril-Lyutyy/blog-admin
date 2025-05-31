import { useState } from 'react';
import {
  Card,
  CardContent,
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
  const { posts, loading, error, totalCount } = usePosts({
    page,
    limit,
    sort,
    order,
  });
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

  return (
    <Box pb={4}>
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

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={2}>
        {posts.map((post) => {
          const cleanContent = stripHtml(post.content);
          const preview =
            cleanContent.length > 50
              ? cleanContent.slice(0, 50) + '...'
              : cleanContent;

          return (
            <Grid item xs={12} md={6} key={post.id}>
              <Card>
                <CardContent>
                  <Typography
                    variant="h6"
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
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    By {post.author} on{' '}
                    {new Date(post.created_at).toLocaleDateString()}
                  </Typography>
                  <Typography mb={2}>{preview}</Typography>
                  {cleanContent.length > 50 && (
                    <Button
                      component={Link}
                      to={`/posts/${post.id}`}
                      size="small"
                      variant="outlined"
                    >
                      Read More
                    </Button>
                  )}
                </CardContent>
              </Card>
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
