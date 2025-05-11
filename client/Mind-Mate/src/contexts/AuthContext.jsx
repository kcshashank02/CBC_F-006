import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Access the API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:6585';

// Create auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // Initialize state from sessionStorage to prevent loss on refresh
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = sessionStorage.getItem('currentUser');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Error parsing user data from sessionStorage:', error);
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('isAuthenticated') === 'true';
  });
  const [lastActivity, setLastActivity] = useState(() => {
    try {
      const saved = sessionStorage.getItem('lastActivity');
      return saved ? parseInt(saved) : Date.now();
    } catch (error) {
      console.error('Error parsing lastActivity from sessionStorage:', error);
      return Date.now();
    }
  });

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Since there's no specific /me endpoint, try to use the user profile endpoint
        // This will work if your backend validates the JWT cookie before allowing access
        try {
          const profileEndpoint = `${API_URL}/api/user/data`;
          console.log(`Checking auth status at: ${profileEndpoint}`);
          
          const response = await axios.get(profileEndpoint, { 
            withCredentials: true 
          });
          
          if (response.data && response.data.success) {
            setIsAuthenticated(true);
            sessionStorage.setItem('isAuthenticated', 'true');
            setCurrentUser(response.data.user);
            try {
              sessionStorage.setItem('currentUser', JSON.stringify(response.data.user));
            } catch (error) {
              console.error('Error storing user data in sessionStorage:', error);
            }
            // Update last activity time
            const now = Date.now();
            setLastActivity(now);
            sessionStorage.setItem('lastActivity', now.toString());
          } else {
            setIsAuthenticated(false);
            sessionStorage.removeItem('isAuthenticated');
            setCurrentUser(null);
            sessionStorage.removeItem('currentUser');
          }
        } catch (error) {
          console.log('Not authenticated:', error.message);
          setIsAuthenticated(false);
          setCurrentUser(null);
          sessionStorage.removeItem('isAuthenticated');
          sessionStorage.removeItem('currentUser');
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Track user activity
  useEffect(() => {
    const updateActivity = () => {
      const now = Date.now();
      setLastActivity(now);
      sessionStorage.setItem('lastActivity', now.toString());
    };

    // Reset the activity timer on user interactions
    window.addEventListener('click', updateActivity);
    window.addEventListener('keypress', updateActivity);
    window.addEventListener('scroll', updateActivity);
    window.addEventListener('mousemove', updateActivity);

    return () => {
      window.removeEventListener('click', updateActivity);
      window.removeEventListener('keypress', updateActivity);
      window.removeEventListener('scroll', updateActivity);
      window.removeEventListener('mousemove', updateActivity);
    };
  }, []);

  // Auto-logout after 1 hour of inactivity
  useEffect(() => {
    if (!isAuthenticated) return;

    const inactivityTimeout = 60 * 60 * 1000; // 1 hour in milliseconds
    
    const checkInactivity = setInterval(() => {
      const now = Date.now();
      if (now - lastActivity > inactivityTimeout) {
        console.log('Logging out due to inactivity');
        logout();
      }
    }, 60000); // Check every minute

    return () => clearInterval(checkInactivity);
  }, [isAuthenticated, lastActivity]);

  // Login function
  const login = async (email, password) => {
    try {
      const loginEndpoint = `${API_URL}/api/auth/login`;
      console.log(`Logging in at: ${loginEndpoint}`);
      
      const res = await axios.post(loginEndpoint, 
        { email, password }, 
        { withCredentials: true } // Important to accept cookies from server
      );
      
      if (res.data && res.data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('isAuthenticated', 'true');
        
        if (res.data.user) {
          setCurrentUser(res.data.user);
          try {
            sessionStorage.setItem('currentUser', JSON.stringify(res.data.user));
          } catch (error) {
            console.error('Error storing user data in sessionStorage:', error);
          }
        } else {
          // If user data not included in login response, fetch it
          const profileResult = await getUserProfile();
          if (profileResult.success && profileResult.user) {
            try {
              sessionStorage.setItem('currentUser', JSON.stringify(profileResult.user));
            } catch (error) {
              console.error('Error storing user data in sessionStorage:', error);
            }
          }
        }
        
        // Reset activity timer
        const now = Date.now();
        setLastActivity(now);
        sessionStorage.setItem('lastActivity', now.toString());
        
        return { success: true };
      } else {
        return { success: false, message: res.data?.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed. Please try again.' 
      };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const logoutEndpoint = `${API_URL}/api/auth/logout`;
      console.log(`Logging out at: ${logoutEndpoint}`);
      
      const res = await axios.post(logoutEndpoint, {}, 
        { withCredentials: true }
      );
      
      // Clear auth state
      setIsAuthenticated(false);
      setCurrentUser(null);
      sessionStorage.removeItem('isAuthenticated');
      sessionStorage.removeItem('currentUser');
      sessionStorage.removeItem('lastActivity');
      
      if (res.data && res.data.success) {
        return { success: true };
      } else {
        return { success: false, message: res.data?.message || 'Logout failed' };
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear auth state even if API call fails
      setIsAuthenticated(false);
      setCurrentUser(null);
      sessionStorage.removeItem('isAuthenticated');
      sessionStorage.removeItem('currentUser');
      sessionStorage.removeItem('lastActivity');
      return { 
        success: false, 
        message: error.response?.data?.message || 'Logout failed. Please try again.' 
      };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const registerEndpoint = `${API_URL}/api/auth/register`;
      console.log(`Registering at: ${registerEndpoint}`);
      
      const res = await axios.post(registerEndpoint, userData, { 
        withCredentials: true 
      });
      
      if (res.data && res.data.success) {
        // Auto-login after registration since backend sets the cookie
        setIsAuthenticated(true);
        sessionStorage.setItem('isAuthenticated', 'true');
        
        if (res.data.user) {
          setCurrentUser(res.data.user);
          try {
            sessionStorage.setItem('currentUser', JSON.stringify(res.data.user));
          } catch (error) {
            console.error('Error storing user data in sessionStorage:', error);
          }
        } else {
          // If user data not included in register response, fetch it
          const profileResult = await getUserProfile();
          if (profileResult.success && profileResult.user) {
            try {
              sessionStorage.setItem('currentUser', JSON.stringify(profileResult.user));
            } catch (error) {
              console.error('Error storing user data in sessionStorage:', error);
            }
          }
        }
        
        // Reset activity timer
        const now = Date.now();
        setLastActivity(now);
        sessionStorage.setItem('lastActivity', now.toString());
        
        return { success: true };
      } else {
        return { success: false, message: res.data?.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed. Please try again.' 
      };
    }
  };

  // Get user profile function
  const getUserProfile = async () => {
    try {
      const profileEndpoint = `${API_URL}/api/user/data`;
      console.log(`Getting profile at: ${profileEndpoint}`);
      
      const res = await axios.get(profileEndpoint, { 
        withCredentials: true 
      });
      
      if (res.data && res.data.success) {
        setCurrentUser(res.data.user);
        try {
          sessionStorage.setItem('currentUser', JSON.stringify(res.data.user));
        } catch (error) {
          console.error('Error storing user data in sessionStorage:', error);
        }
        return { success: true, user: res.data.user };
      } else {
        return { success: false, message: res.data?.message || 'Failed to get profile' };
      }
    } catch (error) {
      console.error('Get profile error:', error);
      
      // If we get a 401 or 403, it means we're not authenticated
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
      
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to get profile. Please try again.' 
      };
    }
  };

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    logout,
    register,
    getUserProfile,
    apiUrl: API_URL
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;