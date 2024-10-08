import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import db from "@/lib/db";
import { getUserById } from "@/data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: { signIn: "/login" },
  callbacks: {
    async signIn({ user }) {
      if (user && user.id) {
        const existingUser = await getUserById(user.id);
        if (existingUser) return true;
      }
      return false;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      if (session.user) {
        session.user.email = token.email as string;
      }
      return session;
    },
    async jwt({ token }) {
      if (token.sub) {
        const user = await getUserById(token.sub);
        if (!user) return token;
        token.id = user?.id;
        token.email = user.email;
      }
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
