/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';
import { authService } from '../services/authService';
import { useDispatch } from "react-redux";
import { clearCart, getCart } from "../redux/cartSlice";

const AuthContext = createContext(null);

const getTokenFromUser = (userData) => {
  
  const search = (value, visited = new WeakSet()) => {
    if (!value || typeof value !== 'object') return null;
    if (visited.has(value)) return null;
    visited.add(value);

    if (typeof value.token === 'string' && value.token) return value.token;
    if (typeof value.accessToken === 'string' && value.accessToken) return value.accessToken;
    if (typeof value.authToken === 'string' && value.authToken) return value.authToken;

    if (value.user && typeof value.user === 'object') {
      const nestedToken = search(value.user, visited);
      if (nestedToken) return nestedToken;
    }

    if (value.data && typeof value.data === 'object') {
      const nestedToken = search(value.data, visited);
      if (nestedToken) return nestedToken;
    }

    for (const nestedValue of Object.values(value)) {
      if (nestedValue && typeof nestedValue === 'object') {
        const nestedToken = search(nestedValue, visited);
        if (nestedToken) return nestedToken;
      }
    }

    return null;
  };

  return search(userData);
};

const persistAuthData = (userData) => {
  const token = getTokenFromUser(userData);

  if (token) {
    localStorage.setItem('token', token);
    localStorage.setItem('authToken', token);
    localStorage.setItem('accessToken', token);
  }

  localStorage.setItem('vk_current_user', JSON.stringify(userData));
};

export const AuthProvider = ({ children }) => {
  // Lazy state initialization to satisfy react-hooks/set-state-in-effect
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('vk_current_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
  setLoading(true);

  try {
    const user = await authService.login(email, password);

    setCurrentUser(user);
    persistAuthData(user);
    await dispatch(getCart());

    // Load this user's cart from database
    await dispatch(getCart());

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
      persistAuthData(user);
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
      dispatch(clearCart());

    localStorage.removeItem('vk_current_user');
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('accessToken');
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