import { NextResponse } from "next/server";

/**
 * POST /api/auth/logout
 * Clears the auth_session cookie and redirects to /login
 */
export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set("auth_session", "", {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    path:     "/",
    maxAge:   0, // immediately expire
  });

  return response;
}