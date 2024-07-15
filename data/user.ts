"use server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};
export const getUserAvatar = async (id: string | undefined) => {
  try {
    const avatar = await db.user.findUnique({
      where: { id },
    });
    revalidatePath("/");
    revalidatePath(`/${id}/preview`);
    return avatar?.avatar;
  } catch {
    return null;
  }
};
