import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import database from './config/dbConfig';
import movieRoutes from './routes/movieRoutes';

const PORT = process.env.API_PORT;
const API_ROOT = process.env.API_ROOT;
const URL = process.env.API_URL;

if (!PORT || !API_ROOT || !URL) {
  throw new Error('Environment variables API_PORT, API_ROOT, or API_URL are not defined');
}

const app = express();

app
  .use(cors())
  .use(express.json())
  .use(API_ROOT, movieRoutes)
  .use(express.static('dist'));

database.sync()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server is running on ${URL}:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
