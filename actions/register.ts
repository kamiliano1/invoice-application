"use server";
import db from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
export async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Something went wrong" };
  const { email, password, confirmPassword } = validatedFields.data;
  if (password !== confirmPassword) return { error: "Passwords do not match" };
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) return { error: "User already exist" };
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.create({
    data: { email, password: hashedPassword },
  });
  return { success: "User Created!" };
}
