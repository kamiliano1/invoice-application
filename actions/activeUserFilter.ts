"use server";
import db from "@/lib/db";
import { InvoiceStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function activeUserFilter(
  id: string | undefined,
  filterArray: InvoiceStatus[]
) {
  try {
    if (!id) return null;
    const filter = db.sortInvoices.findUnique({ where: { id } });
    const updateFilter = await db.sortInvoices.update({
      where: { id },
      data: {
        filterType: filterArray,
        sortDirection: "asc",
        sortLabel: "name",
      },
    });
    revalidatePath("/");
    return filter;
  } catch {
    return null;
  }
}
