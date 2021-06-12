import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Cat from '../lib/models/Cat.js';

describe('cat routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a cat via POST', async () => {
    const res = await request(app)
      .post('/api/v1/cats')
      .send({ name: 'garfield', type: 'tabby', weight: '50 lbs', age: 42 });

    expect(res.body).toEqual({
      id: '1',
      name: 'garfield',
      type: 'tabby',
      weight: '50 lbs',
      age: 42,
    });
  });

  it('finds a cat by id via GET', async () => {
    const cat = await Cat.insert({
      name: 'heathcliff',
      type: 'tabby',
      weight: '30 lbs',
      age: 55,
    });

    const res = await request(app)
      .get(`/api/v1/cats/${cat.id}`);

    expect(res.body).toEqual(cat);
  });

  it('finds all cats via GET', async () => {
    const garfield = await Cat.insert({
      name: 'garfield',
      type: 'tabby',
      weight: '50 lbs',
      age: 42,
    });

    const heathcliff = await Cat.insert({
      name: 'heathcliff',
      type: 'tabby',
      weight: '30 lbs',
      age: 55,
    });

    const littleKitty = await Cat.insert({
      name: 'little kitty',
      type: 'tabby',
      weight: '12 lbs',
      age: 12,
    });

    const res = await request(app).get('/api/v1/cats');

    expect(res.body).toEqual([garfield, heathcliff, littleKitty]);
  });

  it('DELETE cat from /api/v1/cats/:id', async () => {
    const littleKitty = await Cat.insert({
      name: 'little kitty',
      type: 'tabby',
      weight: '12 lbs',
      age: 12,
    });
    const res = await request(app).delete(`/api/v1/cats/${littleKitty.id}`);
    expect(res.body).toEqual(littleKitty);
  });
});
