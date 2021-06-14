import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Cat from '../lib/models/Cat.js';
import Dollhouse from '../lib/models/Dollhouse.js';

const fairfield = {
  name: 'Greenleaf Fairfield', 
  scale: '1/24', 
  price: 119
};

const storybook = {
  name: 'Greenleaf Storybook Cottage',
  scale: '1/12',
  price: 58
};

describe('dollhouse routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a dollhouse via POST', async () => {
    const res = await request(app)
      .post('/api/v1/dollhouses')
      .send(fairfield);

    expect(res.body).toEqual({ 
      id: '1', ...fairfield
    });
  });

  it('finds a dollhouse by id via GET', async () => {
    const dollhouse = await Dollhouse.insert(storybook);

    const res = await request(app).get(`/api/v1/dollhouses/${dollhouse.id}`);

    expect(res.body).toEqual(dollhouse);
  });

});
