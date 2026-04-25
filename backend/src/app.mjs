import express from 'express';
import cors from 'cors';
import errorHandler from './middleware/errorMiddleware.mjs';
import cookieParser from 'cookie-parser';
import router from './routers/index.mjs';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL, 
  credentials: true,               
}));


// Simple Route
app.get('/', (req, res) => {
  res.send('Pet Care API is running...');
});
app.use(router);

// Error Middleware
app.use(errorHandler);

export default app;
