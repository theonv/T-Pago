import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const token = request.cookies.get('auth_token')
  const isPublicRoute = [
    '/',
    '/register'
  ].some(route => request.nextUrl.pathname.startsWith(route))

  // Se não for rota pública e não tiver token, redireciona para login
  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}
 
// Configurar quais rotas o middleware deve verificar
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|img).*)',
  ],
}