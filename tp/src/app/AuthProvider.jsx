'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import * as jose from 'jose';

const publicRoutes = ['/', '/register', '/forgotpwd', '/forgotpwd/dispemail'];

// Componente de Loading simples para evitar hidration mismatch
function LoadingSpinner({ message = "Carregando..." }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
}

export function AuthProvider({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const verifyToken = async (token) => {
    try {
      const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET || 'porfavorfunciona');
      await jose.jwtVerify(token, secret);
      return true;
    } catch (error) {
      console.error('Token inválido ou expirado:', error);
      return false;
    }
  };

  const configureRequestHeaders = (token) => {
    if (typeof window !== 'undefined' && token) {
      localStorage.setItem('auth_token', token);
      
      const originalFetch = window.fetch;
      window.fetch = function(url, options = {}) {
        options.headers = {
          ...options.headers,
          'Authorization': `Bearer ${token}`
        };
        return originalFetch.call(this, url, options);
      };
    }
  };

  // Aguarda a hidratação completa
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
        
        if (!token && !isPublicRoute) {
          router.replace('/');
          return;
        }

        if (token) {
          const isValid = await verifyToken(token);
          if (!isValid) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            if (!isPublicRoute) {
              router.replace('/');
            }
            setIsAuthenticated(false);
          } else {
            setIsAuthenticated(true);
            configureRequestHeaders(token);
          }
        }
      } catch (error) {
        console.error('Erro na verificação de autenticação:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router, mounted]);

  // Mostra loading enquanto não está montado ou carregando
  if (!mounted || isLoading) {
    return <LoadingSpinner />;
  }

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  
  // Se não é rota pública e não está autenticado, mostra loading (redirecionando)
  if (!isPublicRoute && !isAuthenticated) {
    return <LoadingSpinner />;
  }

  return children;
}