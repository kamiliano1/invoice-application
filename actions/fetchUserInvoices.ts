"use server";
import db from "@/lib/db";
export default async function fetchUserInvoices(id: string | undefined) {
  try {
    const userData = db.user.findUnique({ where: { id } });
    const userInvoices = db.invoice.findMany({
      where: { invoiceDbId: id },
      include: { clientAddress: true, senderAddress: true, items: true },
    });
    return userInvoices;
  } catch (error) {
    return { error: "Something went wrong" };
  }
}
