"use server";
import { InvoiceSchema } from "@/schemas";
import { z } from "zod";
import db from "@/lib/db";
import { getUserActiveInvoiceByInvoiceId } from "@/data/invoices";
import { getUserById } from "@/data/user";
export default async function createInvoice(
  values: z.infer<typeof InvoiceSchema>,
  id: string,
  userInvoiceId?: string
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
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    await db.$transaction(async (tx) => {
      if (userInvoiceId) {
        const invoiceToEdit = await getUserActiveInvoiceByInvoiceId(
          userInvoiceId
        );
        const invoice = await tx.invoice.update({
          where: { id: invoiceToEdit?.id },
          data: {
            clientEmail,
            clientName,
            description,
            paymentTerms,
            status,
            paymentDue: paymentDue as Date,
            total: total as number,
            clientAddress: {
              update: {
                street: clientAddress.street,
                city: clientAddress.city,
                postCode: clientAddress.postCode,
                country: clientAddress.country,
              },
            },
            senderAddress: {
              update: {
                street: senderAddress.street,
                city: senderAddress.city,
                postCode: senderAddress.postCode,
                country: senderAddress.country,
              },
            },
          },
        });
        const dataWithItemId = items.map((item) => ({
          ...item,
          itemId: invoice.id,
        }));
        await tx.items.deleteMany({ where: { itemId: invoice.id } });
        await tx.items.createMany({
          data: dataWithItemId,
        });
      } else {
        const user = await getUserById(id);
        if (!user) return { error: "Something went wrong" };
        const invoice = await tx.invoice.create({
          data: {
            invoiceDbId: user.id,
            invoiceId: invoiceId as string,
            clientEmail,
            clientName,
            description,
            paymentTerms,
            status,
            paymentDue: paymentDue as Date,
            total: total as number,
            clientAddress: {
              create: {
                street: clientAddress.street,
                city: clientAddress.city,
                postCode: clientAddress.postCode,
                country: clientAddress.country,
              },
            },
            senderAddress: {
              create: {
                street: senderAddress.street,
                city: senderAddress.city,
                postCode: senderAddress.postCode,
                country: senderAddress.country,
              },
            },
          },
        });
        const dataWithItemId = items.map((item) => ({
          ...item,
          itemId: invoice.id,
        }));
        await tx.items.createMany({ data: dataWithItemId });
      }
    });
  } catch (error) {
    console.log(error);

    return { error: "Something went wrong" };
  }
  return { success: "Invoice Created!" };
}
