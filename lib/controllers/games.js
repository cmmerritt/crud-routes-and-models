import { Router } from 'express';
import Game from '../models/Game';

export default Router() 
  .post('/api/v1/games', async (req, res) => {
    try {
      const game = await Game.insert(req.body);
      res.send(game);
    } catch(err) {
      res.status(401).send(err);
    }
  });