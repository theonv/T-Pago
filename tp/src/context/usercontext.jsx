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
            console.log('🔄 [UserContext] Verificando autenticação...');
            
            // Tenta pegar do Cookie primeiro (sistema antigo)
            let token = Cookies.get('auth_token');
            
            // Se não tiver no Cookie, tenta no localStorage
            if (!token && typeof window !== 'undefined') {
                token = alocalStorage.getItem('token');
                console.log('🔄 [UserContext] Token do localStorage:', token ? 'Encontrado' : 'Não encontrado');
            } else {
                console.log('🔄 [UserContext] Token do Cookie:', token ? 'Encontrado' : 'Não encontrado');
            }
            
            if (token) {
                const decodedUser = jwtDecode(token);
                setUser({ id: decodedUser.id, email: decodedUser.email });
                
                // Sincroniza: se tem no Cookie mas não no localStorage, salva no localStorage
                if (Cookies.get('auth_token') && typeof window !== 'undefined' && !localStorage.getItem('token')) {
                    localStorage.setItem('token', token);
                    console.log('🔄 [UserContext] Token sincronizado para localStorage');
                }
                
                console.log('✅ [UserContext] Usuário autenticado:', decodedUser.email);
            } else {
                console.log('⚠️ [UserContext] Nenhum token encontrado');
            }
        } catch (error) {
            console.error('❌ [UserContext] Falha ao decodificar o token:', error);
            setUser(null);
            Cookies.remove('auth_token');
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = (token, userData) => {
        try {
            console.log('🔐 [UserContext] Fazendo login...');
            console.log('🔐 [UserContext] Token recebido:', token ? 'Sim' : 'Não');
            
            // Salva o token em Cookies (sistema antigo)
            Cookies.set('auth_token', token, {
                expires: 1 / 12, 
            });
            
            // Salva também no localStorage (para as requisições)
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', token);
                console.log('🔐 [UserContext] Token salvo no localStorage');
            }
            
            setUser(userData);
            console.log('🔐 [UserContext] Login completo!');
        } catch (error) {
            console.error("❌ [UserContext] Erro ao processar o login:", error);
            throw new Error('Falha ao processar o login');
        }
    };

    const logout = () => {
        console.log('👋 [UserContext] Fazendo logout...');
        setUser(null);
        Cookies.remove('auth_token');
        
        // Remove também do localStorage
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            console.log('👋 [UserContext] Token removido do localStorage');
        }
        
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