"use server";
import db from "@/lib/db";
import { InvoiceStatus } from "@prisma/client";
export async function filterInvoices(
  id: string,
  filteredArray: InvoiceStatus[]
) {
  try {
    console.log(filteredArray);

    const filteredInvoices = await db.invoice.findMany({
      where: { invoiceDbId: id, status: { in: filteredArray } },
    });
    console.log(filteredInvoices.length);
  } catch {
    return null;
  }
}
