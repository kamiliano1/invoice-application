"use server";
import { InvoiceSchema } from "@/schemas";
import { z } from "zod";
import db from "@/lib/db";
export default async function createInvoice(
  values: z.infer<typeof InvoiceSchema>,
  id: string
) {
  const validatedData = InvoiceSchema.safeParse(values);
  if (!validatedData || !validatedData.success)
    return { error: "Something went wrong" };
  const {
    clientEmail,
    clientName,
    description,
    paymentTerms,
    status,
    paymentDue,
    total,
    senderAddress,
    clientAddress,
    items,
    invoiceId,
  } = validatedData.data;
  try {
    const invoice = await db.invoice.create({
      data: {
        invoiceDbId: id,
        invoiceId: invoiceId as string,
        clientEmail,
        clientName,
        description,
        paymentTerms,
        status,
        paymentDue: paymentDue as Date,
        total: total as number,
      },
    });
    await db.clientAddress.create({
      data: {
        uniqueId: invoice.id,
        street: clientAddress.street,
        city: clientAddress.city,
        postCode: clientAddress.postCode,
        country: clientAddress.country,
      },
    });
    await db.senderAddress.create({
      data: {
        uniqueId: invoice.id,
        street: senderAddress.street,
        city: senderAddress.city,
        postCode: senderAddress.postCode,
        country: senderAddress.country,
      },
    });
    const dataWithItemId = items.map((item) => ({
      ...item,
      itemId: invoice.id,
    }));
    await db.items.createMany({
      data: dataWithItemId,
    });
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
  return { success: "Invoice Created!" };
}
