import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [auth, setAuth] = useState({
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  token: localStorage.getItem('token') || null,
});

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.token && !auth.user) {
   
    }
  }, [auth.token]);

const login = ({ user, token }) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user)); 
  setAuth({ user, token });
  navigate('/dashboard');
};

  const logout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error('Error during logout', err);
    } finally {
    setAuth({ user: null, token: null });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    }
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
