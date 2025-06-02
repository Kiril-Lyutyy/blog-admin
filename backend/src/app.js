import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import userRoutes from './routes/user.routes.js';
import { setupSwagger } from './swagger.js';

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
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((_err, _req, res, _next) => {
  res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
