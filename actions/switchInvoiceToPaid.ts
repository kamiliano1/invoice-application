"use server";
import db from "@/lib/db";
export async function switchInvoiceToPaid(userInvoiceId: string) {
  try {
    await db.invoice.update({
      where: { id: userInvoiceId },
      data: { status: "paid" },
    });

    return { success: "Invoice switched to paid" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}
