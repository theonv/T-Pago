'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 
    const router = useRouter();

    useEffect(() => {
        try {
            const token = Cookies.get('auth_token');
            if (token) {
                const decodedUser = jwtDecode(token);
                setUser({ id: decodedUser.id, email: decodedUser.email });
            }
        } catch (error) {
            console.error('Falha ao decodificar o token do cookie:', error);
            setUser(null);
            Cookies.remove('auth_token');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = (token, userData) => {
        try {
            Cookies.set('auth_token', token, {
                expires: 1 / 12, 
            });
            setUser(userData);
        } catch (error) {
            console.error("Erro ao processar o login:", error);
            throw new Error('Falha ao processar o login');
        }
    };

    const logout = () => {
        setUser(null);
        Cookies.remove('auth_token');
        router.push('/');
    };

    const updateUser = (newUserData) => {
        setUser((currentUser) => ({ ...currentUser, ...newUserData }));
    };

    const value = {
        user,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user,
        isLoading,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser deve ser usado dentro de um UserProvider');
    }
    return context;
};