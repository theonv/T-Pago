'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          try {
            const decoded = jwtDecode(token);
            setUser({ id: decoded.id, email: decoded.email });
          } catch (e) {
            console.error('Token inválido no localStorage', e);
            localStorage.removeItem('auth_token');
          }
        }
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  const login = (token) => {
    if (typeof window === 'undefined') return;
    try {
      const decoded = jwtDecode(token);
      const userData = { id: decoded.id, email: decoded.email };
      setUser(userData);
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (e) {
      throw new Error('Token inválido');
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
  };

  const updateUser = (newUserData) => {
    const updated = { ...(user || {}), ...newUserData };
    setUser(updated);
    if (typeof window !== 'undefined') localStorage.setItem('user', JSON.stringify(updated));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser, isAuthenticated: !!user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser deve ser usado dentro do UserProvider');
  return ctx;
};