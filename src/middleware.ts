import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "changeme");

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  console.log("[middleware] token:", token);

  if (!token) {
    console.log("[middleware] No token found, redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    console.log("[middleware] JWT verified, payload:", payload);
    return NextResponse.next();
  } catch (err) {
    console.log("[middleware] JWT verification failed:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/transactions/:path*", "/wallet/:path*"], // protect these routes
};
