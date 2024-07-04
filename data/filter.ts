"use server";
import db from "@/lib/db";

export const getUserActiveFilter = async (id: string | undefined) => {
  try {
    if (!id) return null;
    const activeUserFilter = await db.sortInvoices.findUnique({
      where: { id },
    });
    return activeUserFilter;
  } catch {
    return null;
  }
};
