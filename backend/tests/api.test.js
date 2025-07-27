const request = require('supertest');
const app = require('../index');

describe('API Tests', () => {
  it('POST /login success', async () => {
    const res = await request(app).post('/login').send({ username: 'test', password: 'password' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('POST /login failure', async () => {
    const res = await request(app).post('/login').send({ username: 'fail', password: 'wrong' });
    expect(res.statusCode).toBe(401);
  });

  it('CRUD /items', async () => {
    const create = await request(app).post('/items').send({ text: 'Test Item' });
    expect(create.statusCode).toBe(201);
    const id = create.body.id;

    const get = await request(app).get('/items');
    expect(get.body).toEqual(expect.arrayContaining([{ id, text: 'Test Item' }]));

    const update = await request(app).put(`/items/${id}`).send({ text: 'Updated' });
    expect(update.body.text).toBe('Updated');

    const del = await request(app).delete(`/items/${id}`);
    expect(del.statusCode).toBe(204);
  });
});