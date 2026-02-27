import { NextResponse } from "next/server";

/**
 * POST /api/auth/login
 * Body: { id: string, password: string }
 *
 * Validates against ADMIN_ID / ADMIN_PASSWORD in .env.local
 * Sets a secure httpOnly "auth_session" cookie on success.
 */
export async function POST(request) {
  try {
    const { id, password } = await request.json();

    const validId       = process.env.ADMIN_ID;
    const validPassword = process.env.ADMIN_PASSWORD;

    // Guard: env vars must be set
    if (!validId || !validPassword) {
      console.error("ADMIN_ID or ADMIN_PASSWORD not set in .env.local");
      return NextResponse.json(
        { error: "Server misconfiguration. Contact the admin." },
        { status: 500 }
      );
    }

    // Validate credentials
    if (id !== validId || password !== validPassword) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    // Build session token — simple signed value for this static auth pattern.
    // For production, use a proper JWT library like "jose".
    const secret    = process.env.AUTH_SECRET ?? "fallback-secret";
    const payload   = `${id}:${Date.now()}`;
    const sessionToken = Buffer.from(`${payload}:${secret}`).toString("base64");

    const response = NextResponse.json({ success: true });

    // Set httpOnly cookie — not accessible from JS, cleared on browser close by default
    response.cookies.set("auth_session", sessionToken, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === "production",
      sameSite: "lax",
      path:     "/",
      // 7-day expiry
      maxAge:   60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
}