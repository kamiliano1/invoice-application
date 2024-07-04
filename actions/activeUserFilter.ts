"use server";
import db from "@/lib/db";

export default async function activeUserFilter(id: string | undefined) {
  const filter = db.sortInvoices.findUnique({ where: { id } });
  // const updateFilter = await db.sortInvoices.update({
  //   where: { id },
  //   data: {
  //     filterType: ["paid", "pending"],
  //     sortDirection: "asc",
  //     sortLabel: "name",
  //   },
  // });
  return filter;
}
