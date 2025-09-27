'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import * as jose from 'jose';

const publicRoutes = ['/', '/register', '/forgotpwd', '/forgotpwd/dispemail'];

export function AuthProvider({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const verifyToken = async (token) => {
    try {
      const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET || 'sua_chave_secreta_padrao');
      await jose.jwtVerify(token, secret);
      return true;
    } catch (error) {
      console.error('Token inválido ou expirado:', error);
      return false;
    }
  };

  const configureRequestHeaders = (token) => {
    if (typeof window !== 'undefined' && token) {
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

  useEffect(() => {
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
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  if (!isPublicRoute && !isAuthenticated) {
    router.replace('/');
    return null;
  }

  return children;
}