"use server";
import { getUserByEmail } from "@/data/user";
import db from "@/lib/db";
import { ChangeEmailSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";
export async function changeEmail(
  activeEmail: string,
  values: z.infer<typeof ChangeEmailSchema>
) {
  const validatedFields = ChangeEmailSchema.safeParse(values);
  if (!validatedFields.success || !validatedFields)
    return { error: "Invalid credentials" };
  const { currentEmail, newEmail } = validatedFields.data;
  const existingUser = await getUserByEmail(currentEmail);
  if (!existingUser) return { error: "Invalid credentials" };
  if (currentEmail !== activeEmail) return { error: "Wrong active Email" };
  if (activeEmail === newEmail)
    return { error: "New Email can't be the same as old" };
  const newEmailUser = await getUserByEmail(newEmail);
  if (newEmailUser) return { error: "Email already in use" };
  try {
    await db.user.update({
      where: { id: existingUser.id },
      data: { email: newEmail },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
  return { success: "Email updated!" };
}
