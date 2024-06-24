import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  publicPreviewRoute,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isPublicPreviewRoute = nextUrl.pathname.includes(publicPreviewRoute);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return undefined;
  if (isAuthRoute) {
    if (isLoggedIn)
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    return undefined;
  }
  // if (!isLoggedIn && !isPublicRoute && !isPublicPreviewRoute) {
  //   return Response.redirect(new URL("/login", nextUrl));
  // }
  if (!isLoggedIn && isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return undefined;
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
