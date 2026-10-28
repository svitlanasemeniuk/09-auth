import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasSession =
    request.cookies.has('accessToken') ||
    request.cookies.has('refreshToken');

  if (
    !hasSession &&
    privateRoutes.some((route) =>
      pathname.startsWith(route)
    )
  ) {
    return NextResponse.redirect(
      new URL('/sign-in', request.url)
    );
  }

  if (
    hasSession &&
    publicRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(
      new URL('/profile', request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/notes', '/sign-in', '/sign-up'],
};
