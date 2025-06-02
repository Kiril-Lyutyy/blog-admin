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

describe('Users API Integration', () => {
  let authToken;
  let userId;

  beforeAll(async () => {
    await setupTestDB();
    authToken = await getAuthToken();
  });

  afterAll(async () => {
    await teardownTestDB();
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        email: 'testuser@example.com',
        password: 'password123',
        role_id: 2,
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe('testuser@example.com');
    expect(res.body.role_id).toBe(2);

    userId = res.body.id;
  });

  it('should get a list of users with pagination and filters', async () => {
    const res = await request(app)
      .get('/api/users')
      .query({ page: 1, limit: 10, search: 'testuser', role_id: 2 })
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.meta).toMatchObject({
      page: 1,
      limit: 10,
    });

    const found = res.body.data.some((user) => user.id === userId);
    expect(found).toBe(true);
  });

  it('should get a user by ID', async () => {
    const res = await request(app)
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(res.body).toHaveProperty('id', userId);
    expect(res.body.email).toBe('testuser@example.com');
  });

  it('should update a user fully (PUT)', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        email: 'updateduser@example.com',
        password: 'newpassword123',
        role_id: 3,
      })
      .expect(200);

    expect(res.body.message).toBe('User updated successfully');
  });

  it('should partially update a user (PATCH)', async () => {
    const res = await request(app)
      .patch(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        email: 'patcheduser@example.com',
      })
      .expect(200);

    expect(res.body.message).toBe('User updated successfully');
  });

  it('should delete a user', async () => {
    await request(app)
      .delete(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(204);
  });

  it('should return 404 when getting deleted user', async () => {
    await request(app)
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(404);
  });
});
