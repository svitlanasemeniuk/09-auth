import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { refreshSession } from '@/lib/api/serverApi';
import * as setCookieParser from 'set-cookie-parser';

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

          if (res instanceof Response) {
            const setCookieHeader =
              res.headers.get('set-cookie');
            if (setCookieHeader) {
              const parsedCookies = setCookieParser.parse(
                setCookieParser.splitCookiesString(
                  setCookieHeader
                )
              );

              parsedCookies.forEach((cookie) => {
                response.cookies.set({
                  name: cookie.name,
                  value: cookie.value,
                  path: cookie.path,
                  domain: cookie.domain,
                  expires: cookie.expires,
                  httpOnly: cookie.httpOnly,
                  secure: cookie.secure,
                  sameSite:
                    cookie.sameSite?.toLowerCase() as
                      'strict' | 'lax' | 'none' | undefined,
                });
              });
            }
          } else {
            const data = res as {
              accessToken?: string;
              refreshToken?: string;
            };
            if (data?.accessToken)
              response.cookies.set(
                'accessToken',
                data.accessToken
              );
            if (data?.refreshToken)
              response.cookies.set(
                'refreshToken',
                data.refreshToken
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
