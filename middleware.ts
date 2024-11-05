import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has("connect.sid");
  const isPublicPath = publicRoutes.includes(pathname);

  // Se não estiver autenticado e tentar acessar rota privada
  if (!isAuthenticated && !isPublicPath) {
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }

  // Se estiver autenticado e tentar acessar rota pública
  if (isAuthenticated && isPublicPath) {
    const url = new URL("/home", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/home/:path*",
    "/categorias/:path*",
    "/financeiro/:path*",
  ],
};
