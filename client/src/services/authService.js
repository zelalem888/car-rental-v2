// Custom Authentication Service
// Replace this with your own backend API calls

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

class AuthService {
  // Login with email and password
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();
      
      // Store token if provided
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      
      return data.user || data;
    } catch (error) {
      throw error;
    }
  }

  // Register new user
  async register(email, password, confirmPassword) {
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      const data = await response.json();
      
      // Store token if provided
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      
      return data.user || data;
    } catch (error) {
      throw error;
    }
  }

  // Login with Google (OAuth)
  async loginWithGoogle() {
    try {
      // Redirect to your backend OAuth endpoint
      window.location.href = `${API_BASE_URL}/auth/google`;
    } catch (error) {
      throw error;
    }
  }

  // Send password reset email
  async sendPasswordResetEmail(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send password reset email');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  // Logout
  async logout() {
    try {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
      
      localStorage.removeItem('authToken');
    } catch (error) {
      // Even if the API call fails, clear local storage
      localStorage.removeItem('authToken');
      throw error;
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        return null;
      }

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        localStorage.removeItem('authToken');
        return null;
      }

      const data = await response.json();
      return data.user || data;
    } catch (error) {
      localStorage.removeItem('authToken');
      return null;
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  }

  // Get auth token
  getToken() {
    return localStorage.getItem('authToken');
  }
}

export default new AuthService();

