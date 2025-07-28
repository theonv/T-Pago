'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Recarrega o usuário do localStorage ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login: salva no estado, localStorage e no cookie
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));

    // Cria o cookie "auth", válido por 1 dia
    Cookies.set('auth', 'true', { expires: 1, path: '/' });
  };

  // Logout: limpa estado, localStorage e o cookie
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');

    // Remove o cookie "auth"
    Cookies.remove('auth');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser deve ser usado dentro do UserProvider');
  return ctx;
};