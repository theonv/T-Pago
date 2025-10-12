import { NextResponse } from 'next/server';

export function middleware(request) {
  const publicPaths = ['/', '/register', '/forgotpwd'];

  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  const isPublicPath = publicPaths.includes(pathname);

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/config/editprofile', request.url));
  }
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};