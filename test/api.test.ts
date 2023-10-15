import request from 'supertest';

import app from '../src/app';

describe('GET /api/v1', () => {
  it('responds with a json message', done => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        200,
        {
          message: 'Welcome my api 👋',
        },
        done,
      );
  });
});

describe('GET /api/v1/users', () => {
  it('responds with a json message', done => {
    request(app)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, { message: 'Get all users', success: true, data: {} }, done);
  });
});
