import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Painting from '../lib/models/Painting.js';

const rocks = {
  title: 'Madonna of the Rocks',
  museum: 'Louvre',
  artist: 'Leonardo da Vinci'
};

const ermine = {
  title: 'Lady with an Ermine',
  museum: 'Czartoryski',
  artist: 'Leonardo da Vinci'
}; 

describe('painting routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a painting via POST', async () => {
    const res = await request(app)
      .post('/api/v1/paintings')
      .send(rocks);

    expect(res.body).toEqual({ id: '1', ...rocks });
  });

  it('finds a painting by id via GET', async () => {
    const painting = await Painting.insert(ermine);

    const res = await request(app)
      .get(`/api/v1/paintings/${painting.id}`);
    
    expect(res.body).toEqual(painting);
  });

  it('finds all paintings via GET', async () => {
    const painting1 = await Painting.insert(rocks);
    const painting2 = await Painting.insert(ermine);

    const res = await request(app).get('/api/v1/paintings');

    expect(res.body).toEqual([painting1, painting2]);
  });

  it('UPDATES painting by id', async () => {
    const painting = await Painting.insert(rocks);
    const updatedPainting = {
      title: 'Virgin of the Rocks',
      museum: 'Louvre',
      artist: 'Leonardo da Vinci'
    };

    const res = await request(app).put(`/api/v1/paintings/${painting.id}`).send(updatedPainting);
    expect(res.body).toEqual({ 'id': '1', ...updatedPainting });
  });

  it('DELETES painting by id', async () => {
    const painting = await Painting.insert(rocks);
    const res = await request(app).delete(`/api/v1/paintings/${painting.id}`);
    expect(res.body).toEqual(painting);
  });
});
