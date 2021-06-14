import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Book from '../lib/models/Book.js';

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

  it('finds a book by id via GET', async () => {
    const book = await Book.insert(rebecca);

    const res = await request(app)
      .get(`/api/v1/books/${book.id}`);

    expect(res.body).toEqual(book);
  });
});

