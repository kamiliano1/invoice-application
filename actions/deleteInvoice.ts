"use server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
export async function deleteInvoice(id: string) {
  if (id) {
    try {
      await db.invoice.delete({ where: { id } });
      revalidatePath("/");
      return { success: "Deleted" };
    } catch {
      return { error: "Something went wrong during delete" };
    }
  }
}
