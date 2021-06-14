import { Router } from 'express';
import Painting from '../models/Painting';

export default Router()
  .post('/api/v1/paintings', async (req, res) => {
    try {
      const painting = await Painting.insert(req.body);
      res.send(painting);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/paintings/:id', async (req, res) => {
    try {
      const painting = await Painting.findById(req.params.id);
      res.send(painting);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/paintings', async (req, res) => {
    try {
      const paintings = await Painting.findAll();
      res.send(paintings);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })

  .put('/api/v1/paintings/:id', async (req, res) => {
    try {
      const painting = await Painting.update(req.body, req.params.id);
      res.send(painting);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })

  .delete('/api/v1/paintings/:id', async (req, res) => {
    try {
      const painting = await Painting.delete(req.params.id);
      res.send(painting);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  });
