import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  login_redirect,
  publicRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isAuthenticated) {
      return Response.redirect(new URL(login_redirect, nextUrl));
    }
    return;
  }

  if (!isAuthenticated && !isPublicRoutes) {
    return Response.redirect(new URL("/", nextUrl));
  }
  //   return isAuthenticated
  //     ? NextResponse.next()
  //     : NextResponse.redirect(new URL("/auth/login", req.nextUrl));
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
