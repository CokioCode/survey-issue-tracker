import { jwtDecode } from "jwt-decode";
import { type NextRequest, NextResponse } from "next/server";

type UserRole = "USER" | "ADMIN";

interface JWTPayload {
  role: UserRole;
  exp: number;
  [key: string]: unknown;
}

function decodeToken(token: string): JWTPayload | null {
  try {
    return jwtDecode<JWTPayload>(token);
  } catch {
    return null;
  }
}

function isValidToken(decoded: JWTPayload): boolean {
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const decodedToken = token ? decodeToken(token) : null;
  const isAuthenticated = !!decodedToken && isValidToken(decodedToken);
  const userRole = decodedToken?.role || null;

  if (pathname === "/login") {
    if (isAuthenticated && userRole) {
      const redirectUrl =
        userRole === "ADMIN" ? "/admin/dashboard" : "/users/dashboard";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    return NextResponse.next();
  }

  const isProtectedRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/users");

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthenticated && userRole) {
    if (userRole === "ADMIN" && pathname.startsWith("/users")) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    if (userRole === "USER" && pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/users/dashboard", request.url));
    }
  }

  if (pathname === "/") {
    if (isAuthenticated && userRole) {
      const redirectUrl =
        userRole === "ADMIN" ? "/admin/dashboard" : "/users/dashboard";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
