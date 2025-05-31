import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import usePosts from '../hooks/usePosts';

const Home = () => {
  const { posts, loading, error } = usePosts();

  return (
    <div>
      <Typography variant="h3" mb={3}>
        Blog Posts
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} md={6} key={post.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{post.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  By {post.author} on{' '}
                  {new Date(post.created_at).toLocaleDateString()}
                </Typography>
                <Typography mt={1}>{post.summary}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
