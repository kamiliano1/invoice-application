"use server";
import db from "@/lib/db";
import { InvoicesSchema } from "@/schemas";

export const getUserInvoicesById = async (id: string | undefined) => {
  try {
    if (!id) return null;

    const invoices = await db.invoice.findMany({
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

export const getUserActiveInvoiceByInvoiceId = async (id?: string) => {
  try {
    if (!id) return;
    const activeUserInvoice = await db.invoice.findFirst({
      where: { id },
      include: { clientAddress: true, items: true, senderAddress: true },
    });
    return activeUserInvoice;
  } catch (error) {
    return null;
  }
};
export const getUserActiveInvoiceId = async (id: string) => {
  try {
    const activeUserInvoiceId = await db.invoice.findFirst({
      where: { id },
    });
    return activeUserInvoiceId?.invoiceId;
  } catch (error) {
    return null;
  }
};

export const getUserInvoicesCountById = async (id: string | undefined) => {
  try {
    if (!id) return null;
    const invoicesCount = await db.invoice.count({
      where: { invoiceDbId: id },
    });
    return invoicesCount;
  } catch {
    return null;
  }
};
