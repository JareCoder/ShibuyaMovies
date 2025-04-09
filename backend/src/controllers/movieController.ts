import Movie from '../models/movie';
import { Request, Response, RequestHandler } from 'express';


export const GetMovies: RequestHandler = async (_req: Request, res: Response): Promise<void> => {
  try {
    const movies = await Movie.findAll();
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Database error occurred" });
  }
};

export const GetMovieById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findOne({ where: { id } });
    
    if (!movie) {
      res.status(404).json({ error: 'Movie to get not found' });
      return;
    }

    res.json(movie);
  }
  catch (error) {
    console.error("Error fetching movie by ID:", error);
    res.status(500).json({ error: 'Database error occurred' });
  }
};

export const CreateMovie: RequestHandler = async (req: Request, res: Response) => {
  try {
    const newMovie = req.body;
    
    // Validate input - ensure title exists
    if (!newMovie.title) {
      res.status(400).json({ error: 'Title is required' });
    }
    
    const createdMovie = await Movie.create(newMovie);
    
    res.status(201).json(createdMovie);
  } catch (error) {
    console.error("Error inserting new movie:", error);
    res.status(500).json({ error: 'Database error occurred' });
  }
};

export const DeleteMovie: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedMovie = await Movie.destroy({ where: { id } });
    if (!deletedMovie) {
      res.status(404).json({ error: 'Movie to delete not found' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ error: 'Database error occurred' });
  }
};

export const UpdateMovie: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { thumbsUp, thumbsDown, userId } = req.body;

    if (!userId) {
      res.status(400).json({ error: 'User ID is required' });
      return;
    }

    const movie = await Movie.findOne({ where: { id } });
    if (!movie) {
      res.status(404).json({ error: 'Movie not found' });
      return;
    }

    let likedBy: string[] = [...movie.likedBy];
    let dislikedBy: string[] = [...movie.dislikedBy];
    let thumbsUpCount: number =  movie.thumbsUp;
    let thumbsDownCount: number = movie.thumbsDown;

    if (thumbsUp !== undefined) {
      if (!likedBy.includes(userId)) {
        thumbsUpCount += 1;
        likedBy.push(userId);

        if (dislikedBy.includes(userId)) {
          thumbsDownCount -= 1;
          dislikedBy = dislikedBy.filter(u => u !== userId);
        }
      }
    }

    if (thumbsDown !== undefined) {
      if (!dislikedBy.includes(userId)) {
        thumbsDownCount += 1;
        dislikedBy.push(userId);

        if (likedBy.includes(userId)) {
          thumbsUpCount -= 1;
          likedBy = likedBy.filter(u => u !== userId);
        }
      }
    }

    movie.thumbsUp = thumbsUpCount;
    movie.thumbsDown = thumbsDownCount;
    movie.likedBy = likedBy;
    movie.dislikedBy = dislikedBy;

    await movie.save();

    res.json(movie);
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ error: 'Database error occurred' });
  }

};