import express from 'express';
import cors from 'cors';
import errorHandler from './middleware/errorMiddleware.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Simple Route
app.get('/', (req, res) => {
  res.send('Pet Care API is running...');
});

// Error Middleware
app.use(errorHandler);

export default app;
