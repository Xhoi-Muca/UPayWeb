import { NextResponse, type NextRequest } from "next/server";

/**
 * Albanian (default) is served at the root and rewritten internally to /sq.
 * English is served under /en. An explicit /sq prefix redirects to the clean URL.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/App" || pathname === "/App/") {
    const url = req.nextUrl.clone();
    url.pathname = "/app";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/sq" || pathname.startsWith("/sq/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }
  if (pathname === "/en" || pathname.startsWith("/en/")) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/sq${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = { matcher: ["/((?!_next|api|.*[.].*).*)"] };
