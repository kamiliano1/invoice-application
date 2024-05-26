"use server";
import db from "@/lib/db";
import { InvoiceStatus } from "@prisma/client";
export default async function fetchUserInvoices(
  id: string | undefined,
  filteredArray: InvoiceStatus[]
) {
  try {
    const userInvoices = db.invoice.findMany({
      where: { invoiceDbId: id, status: { in: filteredArray } },
      include: { clientAddress: true, senderAddress: true, items: true },
    });
    return userInvoices;
  } catch (error) {
    return { error: "Something went wrong" };
  }
}
