import request from 'supertest';

import app from '../../src/app.js';
import { setupTestDB, teardownTestDB } from '../utils/testDb.js';

describe('Users API E2E', () => {
  let userId;
  beforeAll(async () => {
    await setupTestDB();
  });

  afterAll(async () => {
    await teardownTestDB();
  });

  it('should create a user, get it, update it, patch it and delete it', async () => {
    const createRes = await request(app)
      .post('/api/users')
      .send({ email: 'testuser@example.com', password: 'secret', role_id: 1 })
      .expect(201);

    userId = createRes.body.id;
    expect(createRes.body.email).toBe('testuser@example.com');

    const getRes = await request(app).get(`/api/users/${userId}`).expect(200);

    expect(getRes.body.email).toBe('testuser@example.com');

    await request(app)
      .put(`/api/users/${userId}`)
      .send({ email: 'updated@example.com', password: 'newpass', role_id: 1 })
      .expect(200);

    const updatedRes = await request(app)
      .get(`/api/users/${userId}`)
      .expect(200);

    expect(updatedRes.body.email).toBe('updated@example.com');

    await request(app)
      .patch(`/api/users/${userId}`)
      .send({ email: 'patched@example.com' })
      .expect(200);

    const patchedRes = await request(app)
      .get(`/api/users/${userId}`)
      .expect(200);

    expect(patchedRes.body.email).toBe('patched@example.com');

    await request(app).delete(`/api/users/${userId}`).expect(204);

    await request(app).get(`/api/users/${userId}`).expect(404);
  });
});
