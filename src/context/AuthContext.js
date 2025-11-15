import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Helper function to handle token and user setup after login/register
  const handleAuthSuccess = async (data) => {
    if (!data?.token) {
      throw new Error('Invalid response from server');
    }

    const { token, user } = data;
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    // Set the user in state
    setCurrentUser(user || { email: data.email, username: data.username });
    setError(null);
    
    return { user: user || { email: data.email, username: data.username }, token };
  };
  
  // Use useCallback for logout since it's used in useEffect (interceptor)
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setCurrentUser(null);
    navigate('/login', { replace: true });
  }, [navigate]); // navigate is a stable reference

  // --- Initial Auth Check (Combined Logic from both snippets) ---
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Set header for API call validation
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Validate token and fetch user data
        const response = await api.get('/auth/me'); 
        
        // Set the user only if the API call is successful
        setCurrentUser(response.data);
        setError(null);

      } catch (err) {
        console.error('Error initializing user session:', err);
        // If /auth/me fails (e.g., 401 Unauthorized), the token is invalid.
        // Use the stable logout function to clean up
        logout(); 
      } finally {
        // Stop loading regardless of success/failure
        setLoading(false);
      }
    };

    initializeAuth();
  }, [logout]); // Run once on mount, depends on stable logout function

  // --- Login/Register Functions (From Second Snippet) ---
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await api.post('/auth/login', { email, password });
      return await handleAuthSuccess(data);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await api.post('/auth/register', userData);
      return await handleAuthSuccess(data);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Interceptor to handle 401 responses globally (From Second Snippet)
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          // Use the stable logout function defined above
          logout(); 
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [logout]); // Dependency on stable logout function

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser?._id, // Assumes user object has an _id field
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Only render children once the initial loading/check is complete */}
      {!loading && children}
    </AuthContext.Provider>
  );
};