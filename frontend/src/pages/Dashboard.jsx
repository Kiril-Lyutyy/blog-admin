import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { mockPosts } from '../mocks/mockData.js';

const Home = () => {
  return (
    <div>
      <Typography variant="h3" mb={3}>
        Blog Posts
      </Typography>

      <Grid container spacing={2}>
        {mockPosts.map((post) => (
          <Grid item xs={12} md={6} key={post.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{post.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  By {post.author} on {post.createdAt}
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
