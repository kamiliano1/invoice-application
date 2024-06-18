"use server";
import { getUserById } from "@/data/user";
import db from "@/lib/db";
import { ChangePasswordSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
export async function changePassword(
  id: string,
  values: z.infer<typeof ChangePasswordSchema>
) {
  const validatedFields = ChangePasswordSchema.safeParse(values);
  if (!validatedFields.success || !validatedFields)
    return { error: "Invalid credentials" };
  const { currentPassword, newPassword, confirmNewPassword } =
    validatedFields.data;
  const existingUser = await getUserById(id);
  if (!existingUser) return { error: "Invalid credentials" };
  if (newPassword !== confirmNewPassword)
    return { error: "Password does not match" };
  const isCurrentPasswordCorrect = await bcrypt.compare(
    currentPassword,
    existingUser.password
  );
  if (!isCurrentPasswordCorrect) return { error: "Password does not match" };
  try {
    const newPasswordHashed = await bcrypt.hash(newPassword, 10);
    await db.user.update({
      where: { id: existingUser.id },
      data: { password: newPasswordHashed },
    });
    return { success: "Password Changed" };
  } catch (error) {
    console.log(error);

    return { error: "Something went wrong" };
  }
}
