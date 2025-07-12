import { NextResponse } from 'next/server';

const PROTECTED_PATHS = ['/dashboard', '/admin'];
// const PROTECTED_PATHS = ['/', '/dashboard', '/profile', '/admin'];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 로그인 페이지는 예외
  if (pathname === '/login') {
    return NextResponse.next();
  }

  // 정적 파일이, 내부 리소스는 제외
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg')
  ) {
    return NextResponse.next();
  }

  const isProtected = PROTECTED_PATHS.some(path => pathname === path || pathname.startsWith(`${path}/`));

  const token = request.cookies.get('accessToken')?.value;

  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'], 
};