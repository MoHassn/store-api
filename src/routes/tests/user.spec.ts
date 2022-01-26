import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('User Endpoints', () => {
  it('should return 400 without auth header', async () => {
    const res = await request.get('/users/');
    expect(res.status).toBe(400);
  });
  it('should return 400 without auth header', async () => {
    const res = await request.get('/users/5');
    expect(res.status).toBe(400);
  });
  it('should return 400 without auth header', async () => {
    const res = await request.post('/users/');
    expect(res.status).toBe(400);
  });
  it('should return 400 without auth header', async () => {
    const res = await request.get('/users/1/current-order');
    expect(res.status).toBe(400);
  });
});
