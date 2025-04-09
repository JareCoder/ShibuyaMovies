import MovieCard from "./MovieCard";
import type { Movie } from "../types/types";

interface MovieListProps {
    movieList: Movie[];
    sortBy?: string;
    reverse?: boolean;
    onUpdate: (updatedMovie: Movie) => void;
    onDelete: (movieId: string) => void;
}

const MovieList = ({ movieList, sortBy, reverse, onUpdate, onDelete }: MovieListProps) => {

    const sortedMovieList =  movieList.sort((a, b) => {
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
        <div>
        {sortedMovieList.map((movie) => (
            <MovieCard
                key={movie.id}
                movie={movie}
                onUpdate={onUpdate}
                onDelete={onDelete}
            />
        ))}
        </div>
    );
}

export default MovieList;