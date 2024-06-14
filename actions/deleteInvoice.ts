"use server";
import { getUserActiveInvoiceByInvoiceId } from "@/data/invoices";
import db from "@/lib/db";
export async function deleteInvoice(userInvoiceId: string) {
  try {
    if (userInvoiceId) {
      const invoiceToDelete = await getUserActiveInvoiceByInvoiceId(
        userInvoiceId
      );
      if (!invoiceToDelete) return { error: "Something went wrong" };
      await db.invoice.delete({ where: { id: invoiceToDelete?.id } });
      return { success: "Deleted" };
    }
  } catch {
    return { error: "Something went wrong during delete" };
  }
}
