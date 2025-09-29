"use client";

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/context/usercontext';

const PUBLIC_ROUTES = ['/', '/register'];

export default function RouteGuard() {
  const { isAuthenticated, isLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // espera carregar contexto
    const isPublic = PUBLIC_ROUTES.some(r => pathname.startsWith(r));
    if (!isAuthenticated && !isPublic) {
      router.replace('/');
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  return null;
}
