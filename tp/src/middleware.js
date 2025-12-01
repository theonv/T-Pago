import { NextResponse } from 'next/server';

export function middleware(request) {
  const publicPaths = ['/', '/register', '/forgotpwd', '/forgotpwd/dispemail'];

  const token = request.cookies.get('auth_token')?.value;
  const { pathname, searchParams } = request.nextUrl;

  const tokenFromUrl = searchParams.get('token');
  const isPublicPath = publicPaths.includes(pathname);
  
  if (tokenFromUrl) {
    console.log("token url fodasse");
    return NextResponse.next();
  }
  
  if (token && isPublicPath) {
    console.log('Você e pika');
    return NextResponse.redirect(new URL('/config/editprofile', request.url));
  }
  
  if (!token && !isPublicPath) {
    console.log('Sem acesso negão ');
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};