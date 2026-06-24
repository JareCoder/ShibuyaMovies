import { useState } from 'react';
import '../style/PasswordModal.css';

interface PasswordModalProps {
  isOpen: boolean;
  onSubmit: (password: string) => void;
  errorMsg: string;
}

const PasswordModal = ({ isOpen, onSubmit, errorMsg }: PasswordModalProps) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(password);
  };

  return (
    <div className="pwd-overlay">
      <div className="pwd-content">
        <div className="pwd-alert-banner">
          <span className="pwd-alert-icon">⚠️</span>
          <h3>ACCESS RESTRICTED</h3>
        </div>
        <p className="pwd-description">
          A secure connection is required. Please enter the decryption key to access the {import.meta.env.SITE_TITLE || 'Jemlap Movies'} database.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="pwd-input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ENTER DECRYPTION KEY..."
              required
              autoFocus
            />
            <button
              type="button"
              className="pwd-toggle-visibility"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errorMsg && <p className="pwd-error-message">{errorMsg}</p>}
          <button type="submit" className="pwd-submit-button">
            ESTABLISH CONNECTION
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
