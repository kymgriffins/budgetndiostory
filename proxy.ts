import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Edge caching configuration
const STATIC_ASSETS =
  /\.(js|css|svg|png|jpg|jpeg|gif|webp|avif|woff|woff2|ttf|eot|ico)$/;
const HTML_PAGES = /\.html$/;

// Paths that should never be cached
const NO_CACHE_PATHS = ["/api/", "/_next/static/chunks/"];

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static assets handled by Next.js
  if (STATIC_ASSETS.test(pathname)) {
    return NextResponse.next();
  }

  // Skip middleware for API routes
  if (NO_CACHE_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  // Security headers
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "origin-when-cross-origin");

  // Performance headers for HTML pages
  if (HTML_PAGES.test(pathname) || pathname === "/") {
    // Stale-while-revalidate for dynamic content
    response.headers.set(
      "Cache-Control",
      "public, max-age=60, s-maxage=3600, stale-while-revalidate=86400",
    );
  }

  // Remove server info
  response.headers.delete("X-Powered-By");

  return response;
}

export const config = {
  // Match all request paths except for
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static
     * - _next/image
     * - favicon.ico
     */
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};
