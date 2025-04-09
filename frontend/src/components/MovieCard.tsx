import { useUser } from "../services/UserContext";
import type { Movie } from "../types/types";
import MoviesListService from "../services/MoviesListService";

interface MovieCardProps {
  movie: Movie;
  onUpdate: (updatedMovie: Movie) => void;
}
const MovieCard = ({ movie, onUpdate }: MovieCardProps) => {
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

  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.year}</p>
      <p>{movie.type}</p>
      <p>{movie.description}</p>
      <div className="votes">
        <button className="thumbs-button" aria-label="thumbs up" onClick={handleThumbsUp}>
          <span role="img" aria-label="thumbs up">
            👍 {movie.thumbsUp}
          </span>
        </button>
        <button className="thumbs-button" aria-label="thumbs down" onClick={handleThumbsDown}>
          <span role="img" aria-label="thumbs down">
           👎 {movie.thumbsDown}
          </span>
        </button>
      </div>
    </div>
  );
};

export default MovieCard;