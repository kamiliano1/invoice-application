"use server";
import db from "@/lib/db";
import { InvoicesSchema } from "@/schemas";

export const getUserInvoicesById = async (id: string | undefined) => {
  // await new Promise((resolve) => setTimeout(resolve, 500));
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

export const getUserActiveInvoiceByInvoiceId = async (
  id: string | undefined,
  invoiceId: string | undefined
) => {
  try {
    if (!id) return;
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    const activeUserInvoice = await db.invoice.findFirst({
      where: { id, invoiceDbId: invoiceId },
      include: { clientAddress: true, items: true, senderAddress: true },
    });
    return activeUserInvoice;
  } catch (error) {
    return null;
  }
};
export const getUserActiveInvoiceId = async (
  id: string,
  invoiceId: string | undefined
) => {
  try {
    const activeUserInvoiceId = await db.invoice.findFirst({
      where: { id, invoiceDbId: invoiceId },
    });
    console.log(activeUserInvoiceId);

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
