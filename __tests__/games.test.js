import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Game from '../lib/models/Game.js';

const portal = {
  title: 'Portal',
  studio: 'Valve',
  rating: 5
};

describe('game routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a game via POST', async () => {
    const res = await request(app)
      .post('/api/v1/games')
      .send(portal);

    expect(res.body).toEqual({ 'id': '1', ...portal });
  });

  it('finds a game by id via GET', async () => {
    const game = await Game.insert(portal);

    const res = await request(app).get(`/api/v1/games/${game.id}`);

    expect(res.body).toEqual(game);
  });
});
