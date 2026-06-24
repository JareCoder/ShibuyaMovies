import { useEffect, useState } from 'react'
import { UserProvider } from './services/UserContext'
import MovieList from './components/MovieList'
import { Movie } from './types/types'
import moviesService from './services/MoviesListService'
import AddMovieModal from './components/AddMovieModal'
import PasswordModal from './components/PasswordModal'
import axios from 'axios'
import './App.css'

function App() {

  const fetchMovies = async () => {
    try {
      const movies = await moviesService.getMovies()
      console.log('Fetched movies:', movies)
      setMovieList(movies)
      setShowPasswordModal(false)
      setPasswordError('')
    } catch (error) {
      console.error('Error fetching movies:', error)
      setMovieList([])
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem('app_password')
        setShowPasswordModal(true)
        const errorData = error.response?.data as { error?: string } | undefined
        if (errorData?.error === 'Incorrect password') {
          setPasswordError('Decryption key is incorrect. Decryption failed.')
        } else {
          setPasswordError('')
        }
      }
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
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<string>('')

  const handlePasswordSubmit = async (password: string) => {
    localStorage.setItem('app_password', password)
    try {
      const movies = await moviesService.getMovies()
      setMovieList(movies)
      setShowPasswordModal(false)
      setPasswordError('')
    } catch (error) {
      console.error('Decryption failed:', error)
      localStorage.removeItem('app_password')
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setPasswordError('Decryption key is incorrect. Decryption failed.')
      } else {
        setPasswordError('Decryption failed. Please try again.')
      }
    }
  }

  useEffect(() => {
    fetchMovies()
    if (import.meta.env.SITE_TITLE) {
      document.title = import.meta.env.SITE_TITLE;
    }
  }, [])

  return (
    <UserProvider>
      <div className="app-container">
        <header className="main-header sticky-header">
          <div className="header-top-row">
            <h1 className="header-title">{import.meta.env.SITE_TITLE || 'Jemlap Movies'}</h1>

            {/* Desktop-only Controls: Search, Sort Trigger Button, Add Movie */}
            <div className="desktop-controls desktop-only">
              <div className="search-bar-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button className={`sort-trigger-button ${isSortOpen ? 'active' : ''}`} onClick={() => setIsSortOpen(!isSortOpen)}>
                Sort
              </button>

              <button className="add-movie-button" onClick={() => setIsOpen(true)}>
                Add Movie
              </button>
            </div>

            {/* Mobile-only Actions */}
            <div className="mobile-actions mobile-only">
              <button
                className={`hamburger-button ${isMenuOpen ? 'open' : ''}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>

          {/* Collapsible Section (for PC Sort options OR Mobile Hamburger menu) */}
          <div className={`nav-menu ${(isSortOpen || isMenuOpen) ? 'open' : ''} ${isMenuOpen ? 'mobile-expanded' : ''} ${isSortOpen ? 'desktop-expanded' : ''}`}>
            {/* Mobile-only Search Bar */}
            <div className="search-bar-container mobile-only">
              <input
                type="text"
                className="search-input"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Sorting Section */}
            <div className="sort-section">
              <h2>Sort by:</h2>
              <div className="sort-container">
                <button className={`sort-button ${sortBy === 'likes' ? 'active' : ''}`} onClick={() => setSortBy('likes')}>
                  Likes
                </button>
                <button className={`sort-button ${sortBy === 'alphabetical' ? 'active' : ''}`} onClick={() => setSortBy('alphabetical')}>
                  Alphabetical
                </button>
                <button className={`sort-button ${sortBy === 'year' ? 'active' : ''}`} onClick={() => setSortBy('year')}>
                  Year
                </button>
                <button
                  className="sort-button reverse-button"
                  style={{ backgroundColor: reverse ? 'rgba(255, 49, 49, 0.15)' : 'rgba(57, 255, 20, 0.15)', borderColor: reverse ? 'var(--neon-red)' : 'var(--neon-green)', color: reverse ? 'var(--neon-red)' : 'var(--neon-green)' }}
                  onClick={() => setReverse(!reverse)}>
                  Reverse
                </button>
              </div>
            </div>

            {/* Mobile-only Add Movie button inside mobile menu */}
            <button className="add-movie-button mobile-only" onClick={() => { setIsOpen(true); setIsMenuOpen(false); }}>
              Add Movie
            </button>
          </div>
        </header>

        <AddMovieModal
          isOpen={isOpen}
          onSubmit={(movie) => {
            postMovie({ ...movie, year: Number(movie.year) })
            setIsOpen(false)
          }}
          onClose={() => setIsOpen(false)}
        />

        <PasswordModal
          isOpen={showPasswordModal}
          onSubmit={handlePasswordSubmit}
          errorMsg={passwordError}
        />

        <MovieList
          movieList={movieList}
          sortBy={sortBy}
          reverse={reverse}
          searchQuery={searchQuery}
          onUpdate={(updatedMovie) => {
            setMovieList((prevMovies) =>
              prevMovies.map((movie) => (movie.id === updatedMovie.id ? updatedMovie : movie)));
          }}
          onDelete={(movieId) => {
            setMovieList((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
          }}
        />
      </div>
    </UserProvider>
  )
}

export default App
