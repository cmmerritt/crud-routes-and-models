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

const revolution = {
  title: 'Deus Ex: Human Revolution',
  studio: 'Eidos',
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

  it('finds all games via GET', async () => {
    const game1 = await Game.insert(portal);
    const game2 = await Game.insert(revolution);

    const res = await request(app).get('/api/v1/games');

    expect(res.body).toEqual([game1, game2]);
  });

  it('updates game by id via PUT', async () => {
    const game = await Game.insert(portal);

    const updatedGame = {
      title: 'Portal',
      studio: 'Valve',
      rating: 4
    };

    const res = await request(app).put(`/api/v1/games/${game.id}`).send(updatedGame);

    expect(res.body).toEqual({ 'id': '1', ...updatedGame });
  });

  it('DELETES game by id', async () => {
    const game = await Game.insert(portal);
    const res = await request(app).delete(`/api/v1/games/${game.id}`);
    expect(res.body).toEqual(game);
  });
});
