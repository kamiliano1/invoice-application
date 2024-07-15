import credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "@/schemas";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";

export default {
  providers: [
    github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields || !validatedFields.success) return null;
        const { email, password } = validatedFields.data;
        const existingUser = await getUserByEmail(email);
        if (!existingUser || !existingUser.password) return null;
        const passwordMatch = await bcrypt.compare(
          password,
          existingUser.password
        );
        if (!passwordMatch) return null;
        return existingUser;
      },
    }),
  ],
} satisfies NextAuthConfig;
