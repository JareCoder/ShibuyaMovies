import { useUser } from "../services/UserContext";
import type { Movie } from "../types/types";
import MoviesListService from "../services/MoviesListService";

interface MovieCardProps {
  movie: Movie;
  onUpdate: (updatedMovie: Movie) => void;
  onDelete?: (movieId: string) => void;
}
const MovieCard = ({ movie, onUpdate, onDelete }: MovieCardProps) => {
  const { userId } = useUser();
  const VITE_POSTER_URL = import.meta.env.VITE_POSTER_URL || '';

  const handleThumbsUp = async () => {
    try {
      const updatedMovie = await MoviesListService.updateMovie(movie.id || '', { thumbsUp: (movie.thumbsUp || 0) + 1 }, userId);
      onUpdate(updatedMovie);
    } catch (error) {
      console.error("Error updating thumbs up:", error);
    }
  };

  const handleThumbsDown = async () => {
    try {
      const updatedMovie = await MoviesListService.updateMovie(movie.id || '', { thumbsDown: (movie.thumbsDown || 0) + 1 }, userId);
      onUpdate(updatedMovie);
    } catch (error) {
      console.error("Error updating thumbs down:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (movie.id) {
        await MoviesListService.deleteMovie(movie.id, userId);
        onDelete?.(movie.id);
      } else {
        console.error("Movie ID is undefined. Cannot delete movie.");
      }

      if (onDelete) {
        onDelete(movie.id || '');
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-poster-container">
        <img className="movie-poster" src={movie.poster ? movie.poster : VITE_POSTER_URL} alt={movie.title} />
        <div className="movie-poster-overlay"></div>
      </div>
      
      <div className="movie-info">
        <div className="movie-badge-list">
          <span className="movie-badge year">{movie.year}</span>
          <span className="movie-badge type">{movie.type}</span>
        </div>
        
        <h3>{movie.title}</h3>
        <p className="movie-description">{movie.description}</p>
        
        <div className="movie-actions">
          <div className="votes">
            <button 
              className={`thumbs-button ${movie.likedBy && movie.likedBy.includes(userId) ? "liked" : ""}`} 
              aria-label="thumbs up" 
              onClick={handleThumbsUp}
            >
              👍 {movie.thumbsUp}
            </button>
            <button 
              className={`thumbs-button ${movie.dislikedBy && movie.dislikedBy.includes(userId) ? "disliked" : ""}`} 
              aria-label="thumbs down"
              onClick={handleThumbsDown}
            >
              👎 {movie.thumbsDown}
            </button>
          </div>
          
          {userId === movie.postedBy && (
            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;