import express from 'express';
import cors from 'cors';
import errorHandler from './middleware/errorMiddleware.mjs';
import cookieParser from 'cookie-parser';
import router from './routers/index.mjs';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './config/swagger.mjs';

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: [process.env.CLIENT_URL, 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true,
}));


// Simple Route
app.get('/', (req, res) => {
  res.send('Pet Care API is running...');
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(router);

// Error Middleware
app.use(errorHandler);

export default app;
