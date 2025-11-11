import React, { useState } from 'react';
import { auth } from './Firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setIsError(false);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset link sent! Please check your email.');
      setIsError(false);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      setIsError(true);
      switch (error.code) {
        case 'auth/invalid-email':
          setMessage('Please enter a valid email address.');
          break;
        case 'auth/user-not-found':
          setMessage('No account found with this email address.');
          break;
        case 'auth/too-many-requests':
          setMessage('Too many attempts. Please try again later.');
          break;
        default:
          setMessage('An error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Reset Password</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            style={styles.input}
            disabled={isLoading}
          />
          {message && (
            <div style={{
              ...styles.message,
              backgroundColor: isError ? '#ffebee' : '#e8f5e9',
              color: isError ? '#c62828' : '#2e7d32'
            }}>
              {message}
            </div>
          )}
          <div style={styles.buttonContainer}>
            <button
              type="button"
              onClick={onClose}
              style={styles.cancelButton}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                ...styles.submitButton,
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? 'Processing...' : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '10px'
  },
  cancelButton: {
    padding: '8px 16px',
    fontSize: '14px',
    border: 'none',
    backgroundColor: '#f5f5f5',
    color: '#333',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  submitButton: {
    padding: '8px 16px',
    fontSize: '14px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: 'white',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  message: {
    padding: '10px',
    borderRadius: '4px',
    textAlign: 'center'
  }
};

export default ForgotPassword;