import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from "emailjs-com";

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

      const res = await fetch(
        "http://localhost:3000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email: email.trim() })
        }
      )
      const response = await res.json();
console.log(response)
      if (!response.token) {
        setMessage("Please try again later.");
        return;
      }
      const resetLink = `http://localhost:5173/reset-password?token=${response.token}`;

      await emailjs.send(
        "service_04n9b1o",
        "template_3fd0egd",
        // import.meta.env.VITE_EMAILJS_SERVICE_ID,
        // import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          email: email,
          link: resetLink,
        },
        "ij6znEh0E_12jo44a"
        // import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );



      setMessage('Password reset link has been sent.');
      setIsError(false);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setIsError(true);
      setMessage(error.message || 'An error occurred. Please try again later.');
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
            <div
              style={{
                ...styles.message,
                backgroundColor: isError ? '#ffebee' : '#e8f5e9',
                color: isError ? '#c62828' : '#2e7d32'
              }}
            >
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