import { NextResponse } from "next/server";

/**
 * Runs on every request matching the config.matcher below.
 * Checks for the "auth_session" cookie — redirects to /login if missing.
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;

  const isAuthenticated = request.cookies.has("auth_session");

  // Protect all /dashboard routes
  if (pathname.startsWith("/dashboard") && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    // Pass the original destination so we can redirect back after login
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If already logged in, don't let them visit /login again
  if (pathname === "/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware to /dashboard and /login only
  matcher: ["/dashboard/:path*", "/login"],
};