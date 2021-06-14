import { Router } from 'express';
import Book from '../models/Book';

export default Router()
  .post('/api/v1/books', async (req, res) => {
    try {
      const book = await Book.insert(req.body);
      res.send(book);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/books/:id', async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      res.send(book);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })
  .get('/api/v1/books', async (req, res) => {
    try {
      const books = await Book.findAll();
      res.send(books);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  });


