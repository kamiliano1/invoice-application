"use server";
import { auth } from "@/auth";
import db from "@/lib/db";
import { InvoicesSchema } from "@/schemas";
export const getUserInvoicesById = async (id: string | undefined) => {
  try {
    if (!id) return null;
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const invoices = await db.invoice.findMany({
      // where: { invoiceDbId: id, status: { in: filteredArray } },
      where: { invoiceDbId: id },
      include: { clientAddress: true, senderAddress: true, items: true },
    });
    const validatedFields = InvoicesSchema.safeParse(
      invoices.filter((item) => item.status !== "draft")
    );
    if (validatedFields.success) return invoices;

    return null;
  } catch {
    return null;
  }
};

export const getUserActiveInvoiceByInvoiceId = async (invoiceId: string) => {
  try {
    const activeUserInvoice = await db.invoice.findFirst({
      where: { invoiceId },
      include: { clientAddress: true, items: true, senderAddress: true },
    });
    return activeUserInvoice;
  } catch (error) {
    return null;
  }
};
