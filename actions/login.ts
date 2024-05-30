"use server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success || !validatedFields)
    return { error: "Invalid credentials" };
  const { email, password } = values;
  const existingUser = await getUserByEmail(email);

  if (!existingUser) return { error: "Invalid credentials" };

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
  return { success: "You are logged in" };
}
