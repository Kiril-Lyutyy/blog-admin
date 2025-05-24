const express = require('express');
const studentRoutes = require('./routes/student.routes.js');
const coursesRoutes = require('./routes/courses.routes.js');
const enrollmentRoutes = require('./routes/enrollment.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();

const app = express();

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Student Courses API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Rest API is up and running!');
});

app.use('/api/students', studentRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use((_req, res, _next) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Something went wrong' });
});

module.exports = app;
