import credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "@/schemas";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
// import { getUserByEmail } from "./data/user";

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
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
