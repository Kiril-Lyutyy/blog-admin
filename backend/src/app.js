import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { setupSwagger } from './swagger.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();

setupSwagger(app);

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/api/greeting', (_req, res) => {
  res.status(200).json({ greeting: 'Hello from the backend!' });
});

app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((_err, _req, res, _next) => {
  res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
