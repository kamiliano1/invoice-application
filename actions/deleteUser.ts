"use server";
import db from "@/lib/db";
import { getUserById } from "@/data/user";
import { DeleteUserSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { signOut } from "@/auth";

export async function deleteUser(
  id: string,
  value: z.infer<typeof DeleteUserSchema>
) {
  const existingUser = await getUserById(id);
  if (!existingUser) return { error: "Invalid credentials" };
  const isCurrentPasswordCorrect = await bcrypt.compare(
    value.currentPassword,
    existingUser.password
  );
  if (!isCurrentPasswordCorrect) return { error: "Password does not match" };
  try {
    await db.user.delete({ where: { id } });
    return { success: "User deleted" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}
