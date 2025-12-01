import { NextResponse } from 'next/server';
import * as jose from 'jose';

export async function middleware(request) {
  const publicPaths = ['/', '/register', '/forgotpwd', '/forgotpwd/dispemail'];

  const token = request.cookies.get('auth_token')?.value;
  const { pathname, searchParams } = request.nextUrl;

  const tokenFromUrl = searchParams.get('token');
  const isPublicPath = publicPaths.includes(pathname);
  
  if (tokenFromUrl) {
    console.log("Token encontrado na URL, verificando...");
     try {
      const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
      
      const { payload } = await jose.jwtVerify(tokenFromUrl, secret);
      
      console.log('Token válido. Email:', payload.email);
      
      const resposta = NextResponse.next();
      resposta.cookies.set('reset_email', payload.email);
      return resposta;
    } catch (error) {
      console.error('Erro na verificação do token:', error.message);
      
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
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