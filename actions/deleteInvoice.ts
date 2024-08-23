"use server";
import db from "@/lib/db";
import { redirect } from "next/navigation";
export async function deleteInvoice(id: string) {
  if (id) {
    await db.invoice.delete({ where: { id } });
    redirect("/");
  }
}
