import express from 'express';
import { GetMovies, GetMovieById, CreateMovie, DeleteMovie, UpdateMovie } from '../controllers/movieController';
import { checkPassword } from '../middleware/authMiddleware';

const moviesRoutes = express.Router();

moviesRoutes.use(checkPassword);

moviesRoutes.get('/', GetMovies);

moviesRoutes.get('/:id', GetMovieById);

moviesRoutes.post('/', CreateMovie);

moviesRoutes.delete('/:id', DeleteMovie);

moviesRoutes.patch('/:id', UpdateMovie);

export default moviesRoutes;