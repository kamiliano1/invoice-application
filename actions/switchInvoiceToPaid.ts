"use server";
import { auth } from "@/auth";
import { getUserActiveInvoiceByInvoiceId } from "@/data/invoices";
import db from "@/lib/db";
import { InvoiceSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
export async function switchInvoiceToPaid(id: string) {
  const session = await auth();
  try {
    const activeInvoice = await getUserActiveInvoiceByInvoiceId(
      id,
      session?.user?.id
    );
    const validatedFields = InvoiceSchema.safeParse(activeInvoice);
    if (validatedFields.success) {
      await db.invoice.update({
        where: { id },
        data: { status: "paid" },
      });
      revalidatePath(`/${id}/preview`);
      return { success: "Invoice switched to paid" };
    }
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}
