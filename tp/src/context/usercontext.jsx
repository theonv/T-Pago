'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import *  as jose from 'jose';

const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET || 'sua_chave_secreta_padrao');

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

  // Login: salva no estado e localStorage
  const login = async (jwt) => {
    console.log('Token recebido:', jwt);
    try {
      const { payload } = await jose.jwtVerify(jwt, secret);

      setUser(payload);
      console.log('Payload decodificado:', payload);
      localStorage.setItem('user', JSON.stringify(payload));
    } catch (error) {
      console.error('complexo', error);
    }
  };

  // Logout: limpa estado e localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
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
