import { useState } from 'react';
import { useUser } from "../services/UserContext";
import '../style/AddMovieModal.css';

interface AddMovieModalProps {
  isOpen: boolean;
  onSubmit: (movieData: {
    title: string;
    postedBy: string;
    year: string;
    description: string;
    poster: string;
    type: string;
    link?: string;
  }) => void;
  onClose: () => void;
}

const AddMovieModal = ({ isOpen, onSubmit, onClose }: AddMovieModalProps) => {
  const { userId } = useUser();
  const allowLinks = import.meta.env.ALLOW_LINKS === 'true';
  const [movieData, setMovieData] = useState({
    title: '',
    year: '',
    description: '',
    poster: '',
    type: '',
    link: '',
  });

  if (!isOpen) return null;

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMovieData({
        ...movieData,
        [e.target.name]: e.target.value,
    });
};


const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Exclude link from submit if ALLOW_LINKS is false
    const submissionData = allowLinks 
      ? { ...movieData, postedBy: userId }
      : { ...movieData, postedBy: userId, link: undefined };
      
    onSubmit(submissionData);

    setMovieData({
        title: '',
        year: '',
        description: '',
        poster: '',
        type: '',
        link: '',
    });
};

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Add a New Movie</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={movieData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Year:</label>
            <input
              type="number"
              name="year"
              value={movieData.year}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={movieData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Poster URL:</label>
            <input
              type="url"
              name="poster"
              value={movieData.poster}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Type:</label>
            <input
              type="text"
              name="type"
              value={movieData.type}
              onChange={handleChange}
              required
            />
          </div>
          {allowLinks && (
            <div>
              <label>Watch Link (Optional):</label>
              <input
                type="url"
                name="link"
                placeholder="https://example.com/watch"
                value={movieData.link}
                onChange={handleChange}
              />
            </div>
          )}
          <button type="submit">Add Movie</button>
        </form>
      </div>
    </div>
  );
};

export default AddMovieModal;
