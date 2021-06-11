import express from 'express';
import catController from './controllers/cats.js';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';

const app = express();

app.use(express.json());

app.use(catController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
