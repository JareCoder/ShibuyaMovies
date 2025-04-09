import express from 'express';
import { GetMovies, CreateMovie, DeleteMovie, UpdateMovie } from '../controllers/movieController';

const moviesRoutes = express.Router();

moviesRoutes.get('/', GetMovies);

moviesRoutes.post('/', CreateMovie);

moviesRoutes.delete('/:id', DeleteMovie);

moviesRoutes.patch('/:id', UpdateMovie);

export default moviesRoutes;