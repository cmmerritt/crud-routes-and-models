import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('dollhouse routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a dollhouse via POST', async () => {
    const res = await request(app)
      .post('/api/v1/dollhouses')
      .send({ name: 'Fairfield Greenleaf', scale: '1/24', price: 119 });

    expect(res.body).toEqual({ 
      id: '1',
      name: 'Fairfield Greenleaf',
      scale: '1/24',
      price: 119,
    });
  });
});
