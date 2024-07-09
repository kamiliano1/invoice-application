"use server";
import db from "@/lib/db";
import { InvoicesSchema } from "@/schemas";
import { headers } from "next/headers";
import { z } from "zod";
export const getUserInvoicesById = async (id: string | undefined) => {
  try {
    if (!id) return null;
    // const activeUserFilter = await db.sortInvoices.findUnique({
    //   where: { id },
    // });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const invoices = await db.invoice.findMany({
      // where: { invoiceDbId: id, status: { in: activeUserFilter?.filterType } },
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

export const getUserInvoicesCountById = async (id: string | undefined) => {
  try {
    if (!id) return null;
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    const invoicesCount = await db.invoice.count({
      where: { invoiceDbId: id },
    });
    return invoicesCount;
    // const invoices = await db.invoice.findMany({
    //   // where: { invoiceDbId: id, status: { in: filteredArray } },
    //   where: { invoiceDbId: id },
    //   include: { clientAddress: true, senderAddress: true, items: true },
    // });
    // const validatedFields = InvoicesSchema.safeParse(
    //   invoices.filter((item) => item.status !== "draft")
    // );
    // if (validatedFields.success) return invoices;
  } catch {
    return null;
  }
};

export const getActivePathname = async () => {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  return pathname;
};
