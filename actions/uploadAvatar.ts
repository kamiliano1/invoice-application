"use server";
import db from "@/lib/db";
export async function uploadAvatar(id: string, avatar: string) {
  try {
    await db.user.update({
      where: { id },
      data: { avatar },
    });
    return { success: "Avatar successfully updated" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong during sending avatar" };
  }
}
