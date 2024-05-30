"use server";
import db from "@/lib/db";
import { InvoicesSchema } from "@/schemas";
import { InvoiceStatus } from "@prisma/client";
export const getUserInvoicesById = async (
  id: string | undefined,
  filteredArray: InvoiceStatus[]
) => {
  try {
    if (!id) return null;
    const invoices = await db.invoice.findMany({
      where: { invoiceDbId: id, status: { in: filteredArray } },
      include: { clientAddress: true, senderAddress: true, items: true },
    });

    const validatedData = InvoicesSchema.safeParse(invoices);
    if (validatedData.success) return validatedData.data;
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
