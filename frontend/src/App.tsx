import { useEffect, useState } from 'react'
import { UserProvider } from './services/UserContext'
import MovieList from './components/MovieList'
import { Movie } from './types/types'
import moviesService from './services/MoviesListService'
import AddMovieModal from './components/AddMovieModal'
import './App.css'

function App() {

  const fetchMovies = async () => {
    try {
      const movies = await moviesService.getMovies()
      console.log('Fetched movies:', movies)
      setMovieList(movies)
    } catch (error) {
      console.error('Error fetching movies:', error)
      setMovieList([])
    }
  }

  const postMovie = async (movie: Movie) => {
    try {
      const newMovie = await moviesService.addMovie(movie)
      setMovieList((prevMovies) => [...prevMovies, newMovie])
    } catch (error) {
      console.error('Error adding movie:', error)
    }
  }

  const [movieList, setMovieList] = useState<Movie[]>([])
  const [sortBy, setSortBy] = useState<string>('likes')
  const [reverse, setReverse] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <UserProvider>
      <h1>Movie List</h1>
      <div className="navbar">
        <h2>Sort by:</h2>
        <div className="sort-container">  
          <button className="sort-button" onClick={() => setSortBy('likes')}>
            Likes
          </button>
          <button className="sort-button" onClick={() => setSortBy('alphabetical')}>
            Alphabetical
          </button>
          <button className="sort-button" onClick={() => setSortBy('year')}>
            Year
          </button>
          <button 
            className="sort-button reverse-button" 
            style={{ backgroundColor: reverse ? '#580606' : '#126407' }}
            onClick={() => setReverse(!reverse)}>
            Reverse
          </button>
        </div>
          <button className="add-movie-button" onClick={() => setIsOpen(true)}>
            Add Movie
          </button>
          <AddMovieModal 
            isOpen={isOpen} 
            onSubmit={(movie) => {
              postMovie({ ...movie,  year: Number(movie.year) })
              setIsOpen(false)
            }} />
      </div>
      <MovieList 
        movieList={movieList} 
        sortBy={sortBy} 
        reverse={reverse}
        onUpdate={(updatedMovie) => {
          setMovieList((prevMovies) =>
            prevMovies.map((movie) => (movie.id === updatedMovie.id ? updatedMovie : movie))
          );
        }} 
      />
    </UserProvider>
  )
}

export default App
