// middleware.ts (project root)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;

  // Change this to whatever paths you want to protect
  if (request.nextUrl.pathname.startsWith("/explore") && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Automatically add the token to all outgoing requests to your backend
  const requestHeaders = new Headers(request.headers);
  if (accessToken) {
    requestHeaders.set("authorization", `Bearer ${accessToken}`);
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/explore/:path*"], // add your protected paths
};