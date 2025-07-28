if (url.pathname.startsWith('/admin')) {
  const isAuth = request.cookies.get('auth')?.value;
  if (!isAuth) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}