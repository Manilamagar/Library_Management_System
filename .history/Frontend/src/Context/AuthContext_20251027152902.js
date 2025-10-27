// frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/check', { withCredentials: true });
        setUser(res.data);
      } catch {
        setUser(null);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('http://localhost:5002/api/auth/login', { email, password }, { withCredentials: true });
    setUser({ role: res.data.role });
  };

  const logout = async () => {
    await axios.get('http://localhost:5002/api/auth/logout', { withCredentials: true });
    setUser(null);
  };

  const register = async (username, email, password, role) => {
    await axios.post('http://localhost:5002/api/auth/register', { username,email, password, role });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};