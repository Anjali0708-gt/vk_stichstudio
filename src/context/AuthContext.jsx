/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Lazy state initialization to satisfy react-hooks/set-state-in-effect
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('vk_current_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const user = await authService.login(email, password);
      console.log("User from authService:", user);
      setCurrentUser(user);
      localStorage.setItem('vk_current_user', JSON.stringify(user));
      if (user?.token) {
        localStorage.setItem('token', user.token); // adjust key name to match your backend's response shape
      }
      return user;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      const user = await authService.register(userData);
      setCurrentUser(user);
      localStorage.setItem('vk_current_user', JSON.stringify(user));
      if (user?.token) {
        localStorage.setItem('token', user.token);
      }
      return user;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    return await authService.resetPassword(email);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('vk_current_user');
    localStorage.removeItem('token');
  };

  const addBookingToState = (booking) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        bookings: [...(currentUser.bookings || []), booking]
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('vk_current_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    forgotPassword,
    addBookingToState,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};