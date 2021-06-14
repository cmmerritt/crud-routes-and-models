import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

const rebecca = {
  title: 'Rebecca',
  author: 'Daphne du Maurier',
  year: 1938
};

/* const castle = {
  title: 'We Have Always Lived in the Castle',
  author: 'Shirley Jackson',
  year: 1962
}; */

describe('book routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a book via POST', async () => {
    const res = await request(app)
      .post('/api/v1/books')
      .send(rebecca);

    expect(res.body).toEqual({ id: '1', ...rebecca });
  });
});

