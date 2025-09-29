"use client";

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';

const AUTH_ROUTES = ['/', '/register'];

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
    </div>
  );
}

export function AuthProvider({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const publicRoute = AUTH_ROUTES.some(r => pathname.startsWith(r));
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (!publicRoute && !token) {
      router.replace('/');
      return;
    }
  }, [pathname, router]);

  useEffect(() => {
    const check = () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      const publicRoute = AUTH_ROUTES.some(r => pathname.startsWith(r));
      if (!token) {
        setIsAuth(false);
        setIsLoading(false);
        if (!publicRoute) router.replace('/');
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decoded.exp && decoded.exp < now) {
          localStorage.removeItem('auth_token');
          setIsAuth(false);
          if (!publicRoute) router.replace('/');
          setIsLoading(false);
          return;
        }
        setIsAuth(true);
      } catch (e) {
        console.error('AuthProvider: token inválido', e);
        localStorage.removeItem('auth_token');
        setIsAuth(false);
        if (!publicRoute) router.replace('/');
      } finally {
        setIsLoading(false);
      }
    };

    check();
  }, [pathname, router]);

  if (isLoading) return <LoadingSpinner />;

  const publicRoute = AUTH_ROUTES.some(r => pathname.startsWith(r));
  if (!isAuth && !publicRoute) return null;

  return <>{children}</>;
}

export default AuthProvider;