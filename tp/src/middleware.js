import { NextResponse } from 'next/server';
import * as jose from 'jose';

export async function middleware(request) {
  const { pathname, searchParams } = request.nextUrl;

  /* =====================================================
   * 1. IGNORAR ARQUIVOS ESTÁTICOS E ASSETS
   * ===================================================== */
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/icons') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.jpeg') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.webp') ||
    pathname.endsWith('.ico')
  ) {
    return NextResponse.next();
  }

  /* =====================================================
   * 2. CONFIGURAÇÕES GERAIS
   * ===================================================== */
  const publicPaths = [
    '/',
    '/register',
    '/forgotpwd',
    '/forgotpwd/dispemail',
  ];

  const token = request.cookies.get('auth_token')?.value;
  const tokenFromUrl = searchParams.get('token');
  const isPublicPath = publicPaths.includes(pathname);

  /* =====================================================
   * 3. TOKEN VINDO PELA URL (RESET DE SENHA)
   * ===================================================== */
  if (tokenFromUrl) {
    try {
      const secret = new TextEncoder().encode(
        process.env.NEXT_PUBLIC_JWT_SECRET
      );

      const { payload } = await jose.jwtVerify(tokenFromUrl, secret);

      const response = NextResponse.next();
      response.cookies.set('reset_email', payload.email, {
        httpOnly: true,
        path: '/',
      });

      return response;
    } catch (error) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  /* =====================================================
   * 4. USUÁRIO LOGADO TENTANDO ACESSAR ROTAS PÚBLICAS
   * ===================================================== */
  if (token && isPublicPath) {
    return NextResponse.redirect(
      new URL('/home', request.url)
    );
  }

  /* =====================================================
   * 5. USUÁRIO NÃO LOGADO EM ROTA PROTEGIDA
   * ===================================================== */
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  /* =====================================================
   * 6. ACESSO LIBERADO
   * ===================================================== */
  return NextResponse.next();
}

/* =====================================================
 * 7. MATCHER
 * ===================================================== */
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
