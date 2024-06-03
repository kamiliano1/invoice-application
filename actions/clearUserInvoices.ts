"use server";
import { getUserInvoicesById } from "@/data/invoices";
import { getUserById } from "@/data/user";
import db from "@/lib/db";
export async function clearUserInvoices(userId: string) {
  try {
    const user = await getUserById(userId);
    if (!user) return { error: "Something went wrong" };
    const userInvoices = await getUserInvoicesById(user.id);
    if (!userInvoices?.length) return { error: "You don't have any invoices" };
    await db.invoice.deleteMany({ where: { invoiceDbId: userId } });
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
  return { success: "Your database has been cleared" };
}
