import authConfig from "@/auth.config";
import NextAuth from "next-auth";
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  console.log("CURRENT PATHNAME", nextUrl.pathname);
  return undefined;
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
