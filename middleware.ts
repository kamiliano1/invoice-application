import authConfig from "@/auth.config";
import NextAuth from "next-auth";
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  console.log("CURRENT PATHNAME", nextUrl.pathname);
  // if (isLoggedIn) return Response.redirect(new URL("/", nextUrl));
  // if (!isLoggedIn) return Response.redirect(new URL(`/login`, nextUrl));
  return undefined;
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
