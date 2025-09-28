'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import * as jose from 'jose';

const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET || 'porfavorfunciona');

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Recarrega o usuário do localStorage ao iniciar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('auth_token');
        
        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Erro ao recuperar dados do usuário:', error);
        // Limpa dados corrompidos
        localStorage.removeItem('user');
        localStorage.removeItem('auth_token');
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  // Login: salva no estado, localStorage e configura token
  const login = async (jwt) => {
    console.log('Token recebido:', jwt);
    try {
      const { payload } = await jose.jwtVerify(jwt, secret);

      // Salva os dados do usuário e token
      setUser(payload);
      localStorage.setItem('user', JSON.stringify(payload));
      localStorage.setItem('auth_token', jwt);
      
      console.log('Login realizado com sucesso', payload);
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      throw new Error('Token inválido ou expirado');
    }
  };

  // Logout: limpa estado e localStorage
  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('auth_token');
      
      // Restaura fetch original se foi modificado
      if (window.fetch.toString().includes('Authorization')) {
        window.location.reload();
      }
    }
  };

  // Função para atualizar dados do usuário
  const updateUser = (newUserData) => {
    const updatedUser = { ...user, ...newUserData };
    setUser(updatedUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      login, 
      logout, 
      updateUser,
      isAuthenticated: !!user,
      isLoading 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser deve ser usado dentro do UserProvider');
  return ctx;
};