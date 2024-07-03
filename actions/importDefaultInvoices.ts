"use server";
import db from "@/lib/db";
import { invoiceData } from "@/data/data";
import { getUserById } from "@/data/user";
import { Prisma } from "@prisma/client";
import { getUserInvoicesById } from "@/data/invoices";
import { revalidatePath } from "next/cache";
export async function importDefaultInvoices(id: string) {
  try {
    let importedInvoicesQty = 0;
    await db.$transaction(async (tx) => {
      const user = await getUserById(id);
      const userInvoices = await getUserInvoicesById(user?.id);
      const userInvoicesId = userInvoices?.map((item) => item.invoiceId);
      if (!user) return { error: "Something went wrong" };
      await Promise.all(
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

          if (!userInvoicesId?.includes(invoiceId as string)) {
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
            importedInvoicesQty++;
          }
        })
      );
    });
    revalidatePath("/");
    if (importedInvoicesQty === 0)
      return { error: "Invoices already imported" };
    revalidatePath("/");
    return {
      success: `${importedInvoicesQty} Invoice${
        importedInvoicesQty !== 1 ? "s" : ""
      } imported`,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      if (error.code === "P2002") return { error: "Invoices already imported" };
    return { error: "Something went wrong" };
  }
}
