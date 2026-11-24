import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  const guestOnlyRoutes = [
    "/auth/sign-in",
    "/auth/sign-up",
    "/auth/forget-password",
    "/auth/reset-password",
  ];
  const protectedRoutes = [
    "/profile",
    "/auth/change-password",
    "/dashboard",
  ];

  if (token && guestOnlyRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/sign-in",
    "/auth/sign-up",
    "/auth/forget-password",
    "/auth/reset-password/:path*",
    "/auth/change-password",
    "/profile",
    "/dashboard",
  ],
};
