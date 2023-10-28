// import { NextRequest, NextResponse } from 'next/server';

import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

export const middleware = function (request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin-login')) {
    if (
      request.cookies.get('accessToken') &&
      request.cookies.get('role')?.value === 'ADMIN'
    ) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    !request.nextUrl.pathname.startsWith('/admin-login')
  ) {
    if (!request.cookies.get('accessToken')) {
      return NextResponse.redirect(new URL('/admin-login', request.url));
    } else if (
      request.cookies.get('accessToken') &&
      request.cookies.get('role')?.value !== 'ADMIN'
    ) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith('/admin-login')) {
    if (
      request.cookies.get('accessToken') &&
      request.cookies.get('role')?.value !== 'ADMIN'
    ) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  // if (request.nextUrl.pathname.startsWith('/admin-login')) {
  //   if (!request.cookies.get('accessToken')) {
  //     return NextResponse.redirect(new URL('/admin-login', request.url));
  //   } else if (
  //     request.cookies.get('accessToken') &&
  //     request.cookies.get('role')?.value !== 'ADMIN'
  //   ) {
  //     return NextResponse.redirect(new URL('/', request.url));
  //   }
  // }
};

export const config = {
  matcher: ['/admin/:path*', '/admin-login'],
};
