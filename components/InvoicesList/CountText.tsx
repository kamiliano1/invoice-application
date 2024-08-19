"use client";
import { useFilterInvoices } from "@/hooks/useFilterInvoices";
import { InvoicesSchema } from "@/schemas";
import { z } from "zod";

export default function CountText({
  invoices,
}: {
  invoices: z.infer<typeof InvoicesSchema>;
}) {
  const userCount = useFilterInvoices(invoices)?.length;
  if (userCount === 0) {
    return <p className="text-body">No invoices</p>;
  }
  return userCount !== 1 ? (
    <>
      <p className="text-body sm:hidden">{userCount} invoices</p>
      <p className="text-body hidden sm:block">
        There are {userCount} total invoices
      </p>
    </>
  ) : (
    <>
      <p className="text-body sm:hidden">{userCount} invoice</p>
      <p className="text-body hidden sm:block">
        There is {userCount} total invoice
      </p>
    </>
  );
}
