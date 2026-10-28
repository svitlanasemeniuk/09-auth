import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { refreshSession } from '@/lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const authRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken =
    cookieStore.get('refreshToken')?.value;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isAuthRoute) {
    if (refreshToken) {
      return NextResponse.redirect(
        new URL('/notes/filter/all', request.url)
      );
    }
    return NextResponse.next();
  }

  if (isPrivateRoute) {
    if (!accessToken) {
      if (refreshToken) {
        try {
          await refreshSession();
          return NextResponse.next();
        } catch {
          return NextResponse.redirect(
            new URL('/sign-in', request.url)
          );
        }
      } else {
        return NextResponse.redirect(
          new URL('/sign-in', request.url)
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
