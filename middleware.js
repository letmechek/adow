import { NextResponse } from "next/server";
import { verifyJwt } from "./src/lib/auth";

const PROTECTED_PATHS = ["/admin"];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path));

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = request.cookies.get("adow_admin_token")?.value;
  const payload = token ? verifyJwt(token) : null;

  if (!payload) {
    if (pathname.startsWith("/admin/login")) {
      return NextResponse.next();
    }
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
