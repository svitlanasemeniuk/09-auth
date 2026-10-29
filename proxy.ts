import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { refreshSession } from '@/lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const authRoutes = ['/sign-in', '/sign-up'];

interface RefreshResponse {
  headers?: {
    'set-cookie'?: string | string[];
  };
  accessToken?: string;
  refreshToken?: string;
}

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
        new URL('/', request.url)
      );
    }
    return NextResponse.next();
  }

  if (isPrivateRoute) {
    if (!accessToken) {
      if (refreshToken) {
        try {
          const res =
            (await refreshSession()) as RefreshResponse;
          const response = NextResponse.next();

          if (res?.headers?.['set-cookie']) {
            const setCookieHeaders = Array.isArray(
              res.headers['set-cookie']
            )
              ? res.headers['set-cookie']
              : [res.headers['set-cookie']];

            setCookieHeaders.forEach(
              (cookieStr: string) => {
                const [cookiePair] = cookieStr.split(';');
                const [name, ...valueParts] =
                  cookiePair.split('=');
                response.cookies.set(
                  name.trim(),
                  valueParts.join('=')
                );
              }
            );
          } else if (
            res?.accessToken ||
            res?.refreshToken
          ) {
            if (res.accessToken)
              response.cookies.set(
                'accessToken',
                res.accessToken
              );
            if (res.refreshToken)
              response.cookies.set(
                'refreshToken',
                res.refreshToken
              );
          }

          return response;
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
    '/profile/:path*',
    '/notes/:path*',
    '/sign-in',
    '/sign-up',
  ],
};
