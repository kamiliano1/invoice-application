"use server";
import { getUserActiveInvoiceByInvoiceId } from "@/data/invoices";
import db from "@/lib/db";
export async function deleteInvoice(userInvoiceId?: string) {
  try {
    if (userInvoiceId) {
      const invoiceToDelete = await getUserActiveInvoiceByInvoiceId(
        userInvoiceId
      );
      setTimeout(async () => {
        await db.invoice.delete({ where: { id: invoiceToDelete?.id } });
        return { success: "Deleted" };
      }, 6000);
    }
  } catch {
    return { error: "Something went wrong during delete" };
  }
}
