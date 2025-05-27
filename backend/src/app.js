import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

export const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

app.use(express.json());

app.get('/api/greeting', (_req, res) => {
  res.status(200).json({ greeting: 'Hello from the backend!' });
});

app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((_err, _req, res, _next) => {
  res.status(500).json({ message: 'Internal Server Error' });
});
