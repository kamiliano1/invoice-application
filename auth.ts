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
  callbacks: {
    async signIn({ user, account }) {
      if (user && user.id) {
        const existingUser = await getUserById(user.id);
        if (!existingUser) return false;
        return true;
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
      // if (session.user && token.invoices) {
      //   session.user.invoices = token.invoices;
      // }

      return session;
    },
    async jwt({ token }) {
      if (token.sub) {
        const user = await getUserById(token.sub);
        if (!user) return token;
        token.id = user?.id;
        token.email = user.email;
        // const invoices = await getUserInvoicesById(user?.id);
        // token.invoices = invoices;
      }
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
