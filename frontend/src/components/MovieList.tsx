import MovieCard from "./MovieCard";
import type { Movie } from "../types/types";

interface MovieListProps {
    movieList: Movie[];
    sortBy?: string;
    reverse?: boolean;
    searchQuery?: string;
    onUpdate: (updatedMovie: Movie) => void;
    onDelete: (movieId: string) => void;
}

const MovieList = ({ movieList, sortBy, reverse, searchQuery = '', onUpdate, onDelete }: MovieListProps) => {

    if (!movieList || !Array.isArray(movieList)) {
        return <h2 className="no-movies-title">No movies found.</h2>;
    }

    // Filter movies based on search query
    const filteredMovies = movieList.filter(movie => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return true;
        const titleMatch = movie.title.toLowerCase().includes(query);
        const descMatch = movie.description ? movie.description.toLowerCase().includes(query) : false;
        return titleMatch || descMatch;
    });

    const sortedMovieList =  [...filteredMovies].sort((a, b) => {
        switch (sortBy) {
            case 'likes': {
                const aLikes = (a.thumbsUp || 0) - (a.thumbsDown || 0);
                const bLikes = (b.thumbsUp || 0) - (b.thumbsDown || 0);
                return bLikes - aLikes;
            }
            case 'alphabetical':
                return a.title.localeCompare(b.title);
            case 'year':
                return (b.year || 0) - (a.year || 0);
            default:
                return 0;
        }
    });

    if (reverse) {
        sortedMovieList.reverse();
    }


    return (
        <div className="movie-grid">
            {sortedMovieList.length === 0 ? (
                <h2 className="no-movies-title">No movies yet. Add the first one!</h2>
            ) : (   
                sortedMovieList.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                ))
            )}
        </div>
    );
}

export default MovieList;