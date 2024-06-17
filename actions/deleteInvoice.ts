"use server";
import db from "@/lib/db";
export async function deleteInvoice(userInvoiceId: string) {
  if (userInvoiceId) {
    try {
      await db.invoice.delete({ where: { id: userInvoiceId } });
      return { success: "Deleted" };
    } catch {
      return { error: "Something went wrong during delete" };
    }
  }
}
