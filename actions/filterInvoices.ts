"use server";
import db from "@/lib/db";
import { InvoiceStatus } from "@prisma/client";
export async function filterInvoices(
  id: string,
  filteredArray: InvoiceStatus[]
) {
  try {
    const filteredInvoices = await db.invoice.findMany({
      where: { invoiceDbId: id, status: { in: filteredArray } },
    });
    return filteredInvoices;
  } catch {
    return null;
  }
}
