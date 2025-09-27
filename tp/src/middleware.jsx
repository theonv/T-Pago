import { NextResponse } from 'next/server';
import * as jose from 'jose';

// Lista de rotas públicas que não precisam de autenticação
const publicRoutes = [
  '/',
  '/register',
  '/forgotpwd',
  '/forgotpwd/dispemail'
];

// Função para verificar se a rota atual é pública
function isPublicRoute(pathname) {
  return publicRoutes.some(route => pathname.startsWith(route));
}

// Middleware do Next.js para autenticação
export async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Se for uma rota pública, permite o acesso
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Verifica o token nos headers
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    console.log('Token não encontrado, redirecionando para a página inicial');
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    // Verifica o token JWT
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET || 'sua_chave_secreta_padrao');
    await jose.jwtVerify(token, secret);
    
    // Token válido, permite o acesso e mantém o token no header
    const response = NextResponse.next();
    response.headers.set('Authorization', `Bearer ${token}`);
    return response;

  } catch (error) {
    console.error('Token inválido ou erro na verificação:', error);
    // Redireciona para a página inicial em caso de token inválido
    return NextResponse.redirect(new URL('/', request.url));
  }
}

// Configuração do matcher para o middleware
export const config = {
  matcher: [
    // Aplica o middleware a todas as rotas exceto:
    // - api/auth (rotas de autenticação)
    // - _next (arquivos internos do Next.js)
    // - static (arquivos estáticos)
    // - favicon.ico, sitemap.xml (arquivos públicos)
    '/((?!api/auth|_next|static|favicon.ico|sitemap.xml).*)'
  ]
};