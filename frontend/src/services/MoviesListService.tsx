import axios from 'axios';
import type { Movie } from '../types/types';

const BASE_URL = import.meta.env.VITE_API_URL;

const getMovies = async () => {
  try {
    if (!BASE_URL) {
      throw new Error('BASE_URL is not defined');
    }
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

const addMovie = async (movieData: Movie) => {
  try {
    if (!BASE_URL) {
        throw new Error('BASE_URL is not defined');
      }

    const movie = {
      ...movieData,
      thumbsUp: 0,
      thumbsDown: 0,
      likedBy: [],
      dislikedBy: []
    };

    const response = await axios.post(BASE_URL, movie);
    return response.data;
  } catch (error) {
    console.error('Error adding movie:', error);
    throw error;
  }
};

const updateMovie = async (id: string, updates: Partial<Movie>, userId: string): Promise<Movie> => {
  try {
    if (!BASE_URL) {
        throw new Error('BASE_URL is not defined');
      }

    const updatesWithUserId = { ...updates, userId };
    const response = await axios.patch(`${BASE_URL}/${id}`, updatesWithUserId);
    return response.data;
  } catch (error) {
    console.error('Error updating movie:', error);
    throw error;
  }
}

const deleteMovie = async (id: string, userId: string) => {
  try {
    if (!BASE_URL) {
        throw new Error('BASE_URL is not defined');
      }

      const movieResponse = await axios.get(`${BASE_URL}/${id}`);
      const movie = movieResponse.data;
      
      if (movie.postedBy !== userId) {
        throw new Error('You are not authorized to delete this movie');
      } else {
        await axios.delete(`${BASE_URL}/${id}`);
      }

  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
};

export default {
    getMovies,
    addMovie,
    updateMovie,
    deleteMovie,
};