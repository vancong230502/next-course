import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken');
  const pathname = request.nextUrl.pathname;

  // Danh sách các route cần bảo vệ
  const protectedPaths = ['/dashboard', '/profile', '/my-courses'];
  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // Nếu đã đăng nhập mà truy cập /login, redirect sang /dashboard
  if (pathname === '/login' && refreshToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Nếu chưa đăng nhập mà truy cập protected route
  if (isProtected && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/my-courses/:path*',
    '/login',
  ],
};
