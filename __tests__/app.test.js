import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe(' routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a cat via POST', async () => {
    const res = await request(app)
      .post('api/v1/cats')
      .semd({ name: 'garfield', type: 'tabby', weight: '50 lbs', age: 42 });

    expect(res.body).toEqual({
      id: '1',
      name: 'garfield',
      type: 'tabby',
      weight: '50 lbs',
      age: 42,
    });
  }) ;
});
