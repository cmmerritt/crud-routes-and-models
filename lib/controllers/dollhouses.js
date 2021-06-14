import { Router } from 'express';
import Dollhouse from '../models/Dollhouse';

export default Router()
  .post('/api/v1/dollhouses', async(req, res) => {
    try {
      const dollhouse = await Dollhouse.insert(req.body);
      res.send(dollhouse);
    } catch(err) {
      res.status(401).send(err);
    }
  });
