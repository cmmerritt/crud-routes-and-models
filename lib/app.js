import express from 'express';
import catController from './controllers/cats.js';
import dollhouseController from './controllers/dollhouses.js';
import bookController from './controllers/books.js';
import paintingController from './controllers/paintings.js';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';

const app = express();

app.use(express.json());

app.use(catController);
app.use(dollhouseController);
app.use(bookController);
app.use(paintingController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
