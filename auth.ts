import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import db from "@/lib/db";
import { getUserById } from "./data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      return true;
    },
    async session({ session, token }) {
      console.log(session, "Session");

      return session;
    },
    async jwt({ token }) {
      if (token.sub) {
        const user = await getUserById(token.sub);
      }
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
