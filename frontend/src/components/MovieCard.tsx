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
      <img src={movie.poster} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.year}</p>
      <p>{movie.type}</p>
      <p>{movie.description}</p>
      <div className="votes">
        <button 
          className={`thumbs-button ${movie.likedBy && movie.likedBy.includes(userId) ? "liked" : ""}`} 
          aria-label="thumbs up" 
          onClick={handleThumbsUp}
        >
          <span role="img" aria-label="thumbs up">
            👍 {movie.thumbsUp}
          </span>
        </button>
        <button 
          className={`thumbs-button ${movie.dislikedBy && movie.dislikedBy.includes(userId) ? "disliked" : ""}`} 
          aria-label="thumbs down"
          onClick={handleThumbsDown}
        >
          <span role="img" aria-label="thumbs down">
           👎 {movie.thumbsDown}
          </span>
        </button>
      </div>
      {userId === movie.postedBy && (
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      )}
    </div>
  );
};

export default MovieCard;