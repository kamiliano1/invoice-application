"use server";
import db from "@/lib/db";
import { getUserActiveInvoiceByInvoiceId } from "@/data/invoices";
export async function switchInvoiceToPaid(userInvoiceId: string) {
  try {
    const invoiceToPaid = await getUserActiveInvoiceByInvoiceId(userInvoiceId);
    if (!invoiceToPaid) return { error: "Something went wrong" };
    await db.invoice.update({
      where: { id: invoiceToPaid.id },
      data: { status: "paid" },
    });
    return { success: "Invoice switched to paid" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}
