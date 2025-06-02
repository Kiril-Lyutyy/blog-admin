import request from 'supertest';

import app from '../../src/app.js';
import { setupTestDB, teardownTestDB } from '../utils/testDb.js';

async function getAuthToken() {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'admin@example.com', password: 'admin123' });

  if (!res.body.token) {
    throw new Error('Failed to get auth token');
  }

  return res.body.token;
}

describe('Posts API Integration', () => {
  let postId;
  let authToken;

  beforeAll(async () => {
    await setupTestDB();
    authToken = await getAuthToken();
  });

  afterAll(async () => {
    await teardownTestDB();
  });

  it('should create a new post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Integration Test Post',
        content: 'Testing integration',
        author_id: 1,
      })
      .expect(201);

    expect(res.body.post).toHaveProperty('id');
    expect(res.body.post.title).toBe('Integration Test Post');
    postId = res.body.post.id;
  });

  it('should get a list of posts including the new post', async () => {
    const res = await request(app).get('/api/posts?limit=100').expect(200);

    expect(res.body.posts.some((p) => p.id === postId)).toBe(true);
  });

  it('should update the post', async () => {
    const res = await request(app)
      .put(`/api/posts/${postId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ title: 'Updated Title', content: 'Some content here' })
      .expect(200);

    expect(res.body.message).toBe('Post updated');
  });

  it('should delete the post', async () => {
    const res = await request(app)
      .delete(`/api/posts/${postId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(res.body.message).toBe('Post deleted');
  });
});
