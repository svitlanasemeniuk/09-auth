import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { refreshSession } from '@/lib/api/serverApi';
import setCookieParser from 'set-cookie-parser';

const privateRoutes = ['/profile', '/notes'];
const authRoutes = ['/sign-in', '/sign-up'];

interface RefreshData {
  headers?: Record<string, string | string[]>;
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
    if (accessToken) {
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
          const res = await refreshSession();
          const response = NextResponse.next();
          const data = res as unknown as RefreshData;

          if (data?.headers && data.headers['set-cookie']) {
            const setCookieHeader =
              data.headers['set-cookie'];

            const parsedCookies = setCookieParser.parse(
              typeof setCookieHeader === 'string'
                ? setCookieParser.splitCookiesString(
                    setCookieHeader
                  )
                : setCookieHeader
            );

            parsedCookies.forEach((cookie) => {
              response.cookies.set(
                cookie.name,
                cookie.value,
                {
                  path: cookie.path,
                  domain: cookie.domain,
                  expires: cookie.expires,
                  httpOnly: cookie.httpOnly,
                  secure: cookie.secure,
                  sameSite:
                    cookie.sameSite?.toLowerCase() as
                      'lax' | 'strict' | 'none' | undefined,
                }
              );
            });
          } else if (
            data?.accessToken ||
            data?.refreshToken
          ) {
            if (data.accessToken) {
              response.cookies.set(
                'accessToken',
                data.accessToken,
                { path: '/' }
              );
            }
            if (data.refreshToken) {
              response.cookies.set(
                'refreshToken',
                data.refreshToken,
                { path: '/' }
              );
            }
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
