"use server";
import db from "@/lib/db";
export default async function uploadAvatar(image: string) {
  try {
    await db.invoice.update({
      where: { id: "665225653c512fd100dec786" },
      data: { description: image },
    });
  } catch (error) {
    console.log(error);
  }
}
