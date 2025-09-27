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

  // Login: salva no estado, localStorage e cookie
  const login = async (jwt) => {
    console.log('Token recebido:', jwt);
    try {
      const { payload } = await jose.jwtVerify(jwt, secret);

      // Salva os dados do usuário
      setUser(payload,jwt);
      localStorage.setItem('user', JSON.stringify(payload),'token',jwt);
      
      console.log('Login realizado com sucesso');
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      throw new Error('Token inválido ou expirado');
    }
  };

    // Logout: limpa estado e localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
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
