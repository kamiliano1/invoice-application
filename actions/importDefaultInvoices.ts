"use server";
import db from "@/lib/db";
import { invoiceData } from "@/data/data";
import { getUserById } from "@/data/user";
export async function importDefaultInvoices(id: string) {
  try {
    await db.$transaction(async (tx) => {
      const user = await getUserById(id);
      if (!user) return { error: "Something went wrong" };
      invoiceData.map(async (item) => {
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
        } = item;
        const invoice = await db.invoice.create({
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
        await db.items.createMany({ data: dataWithItemId });
      });
    });
  } catch (error) {
    console.log(error);

    return { error: "Something went wrong" };
  }
  return { success: "Invoices imported" };
}
