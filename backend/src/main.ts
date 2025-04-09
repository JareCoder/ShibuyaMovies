import express from 'express'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' })
const app = express();

app
  .use(cors())
  .use(express.json())
  .use(express.static('dist'))

// Mock movie data
const movieList = [
  {
    id: uuidv4(),
    poster: 'https://placehold.co/600x400',
    title: 'Movie 1',
    year: 2021,
    description: 'Description of Movie 1',
    type: 'Action',
    thumbsUp: 10,
    thumbsDown: 2,
    likedBy: [] as string[],
    dislikedBy: [] as string[],
  },
  {
    id: uuidv4(),
    poster: 'https://placehold.co/400',
    title: 'Movie 2',
    year: 2020,
    description: 'Description of Movie 2',
    type: 'Drama',
    thumbsUp: 8,
    thumbsDown: 1,
    likedBy: [] as string[],
    dislikedBy: [] as string[],
  },
  {
    id: uuidv4(),
    poster: 'https://placehold.co/600x400',
    title: 'Movie 3',
    year: 2019,
    description: 'Description of Movie 3',
    type: 'Comedy',
    thumbsUp: 15,
    thumbsDown: 3,
    likedBy: [] as string[],
    dislikedBy: [] as string[],
  },
  {
    id: uuidv4(),
    poster: 'https://placehold.co/600x400',
    title: 'Movie 4',
    year: 2018,
    description: 'Description of Movie 4',
    type: 'Horror',
    thumbsUp: 5,
    thumbsDown: 0,
    likedBy: [] as string[],
    dislikedBy: [] as string[],
  },
]

const API_ROOT = process.env.API_PATH;

app.get(`${API_ROOT}`, (_req, res) => {
  res.json(movieList);
});

app.post(`${API_ROOT}`, (req, res) => {
  const newMovie = req.body;
  
  if (!newMovie.title) {
    res.status(400).json({ error: 'Title is required' });
    return;
  }
  // Maybe more input validation?
  
  newMovie.id = uuidv4();
  movieList.push(newMovie);
  res.status(201).json(newMovie);
});

app.delete(`${API_ROOT}/:id`, (req, res) => {
  const { id } = req.params;
  const movieIndex = movieList.findIndex(movie => movie.id === id);
  if (movieIndex === -1) {
    res.status(404).json({ error: 'Movie not found' });
    return;
  }
  movieList.splice(movieIndex, 1);
  res.status(204).end();
});

app.patch(`${API_ROOT}/:id`, (req, res) => {
  const { id } = req.params;
  const { thumbsUp, thumbsDown, userId } = req.body;

  const movie = movieList.find((movie) => movie.id === id);

  if (!movie) {
    res.status(404).json({ error: 'Movie not found' });
    return;
  }

  if (!userId){
    res.status(400).json({ error: 'User ID is required' });
    return;
  }

  movie.likedBy = movie.likedBy || [];
  movie.dislikedBy = movie.dislikedBy || [];

  if (thumbsUp !== undefined) {
    if (movie.likedBy.includes(userId)) {
      movie.thumbsUp -= 1;
      movie.likedBy = movie.likedBy.filter(id => id !== userId);
    }else{
      movie.thumbsUp += 1;
      movie.likedBy.push(userId);

      if (movie.dislikedBy.includes(userId)) {
        movie.thumbsDown -= 1;
        movie.dislikedBy = movie.dislikedBy.filter(id => id !== userId);
      }
    }
  }

  if (thumbsDown !== undefined) {
    if (movie.dislikedBy.includes(userId)) {
      movie.thumbsDown -= 1;
      movie.dislikedBy = movie.dislikedBy.filter(id => id !== userId);
    }else{
      movie.thumbsDown += 1;
      movie.dislikedBy.push(userId);

      if (movie.likedBy.includes(userId)) {
        movie.thumbsUp -= 1;
        movie.likedBy = movie.likedBy.filter(id => id !== userId);
      }
    }
  }

  res.json(movie);
});


const PORT = process.env.API_PORT;
const URL = process.env.API_URL;
app.listen(PORT, () => {
  console.log(`Server is running on ${URL}:${PORT}`);
});