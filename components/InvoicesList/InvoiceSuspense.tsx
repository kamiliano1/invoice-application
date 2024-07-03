import { auth } from "@/auth";
import InvoiceItemSkeleton from "@/components/InvoicesList/InvoiceItemSkeleton";
import { getUserInvoicesById } from "@/data/invoices";
import { Suspense } from "react";
import InvoiceItem from "./InvoiceItem";

export default async function InvoiceSuspense() {
  const session = await auth();
  const invoices = await getUserInvoicesById(session?.user?.id);
  return (
    <>
      <h2 className="text-[3rem]">{JSON.stringify(session)}</h2>
      {invoices?.map((item) => (
        <InvoiceItem
          id={item.id}
          key={item.invoiceId}
          invoiceId={item.invoiceId!}
          clientName={item.clientName}
          paymentDue={item.paymentDue!}
          status={item.status!}
          total={item.total!}
        />
      ))}
    </>
  );
}
