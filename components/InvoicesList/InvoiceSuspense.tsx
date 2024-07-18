import { auth } from "@/auth";
import { getUserInvoicesById } from "@/data/invoices";
import InvoicesFiltered from "@/components/InvoicesList/InvoicesFiltered";
import SortSection from "@/components/Sort/SortSection";
import { z } from "zod";
import { InvoicesSchema } from "@/schemas";
export default async function InvoiceSuspense() {
  const session = await auth();
  const invoices = (await getUserInvoicesById(session?.user?.id)) as z.infer<
    typeof InvoicesSchema
  >;
  return (
    <>
      {invoices?.length ? <SortSection /> : null}
      <InvoicesFiltered invoices={invoices} />
    </>
  );
}
