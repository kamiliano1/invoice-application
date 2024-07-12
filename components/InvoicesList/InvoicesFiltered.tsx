"use client";
import { z } from "zod";
import InvoiceItem from "@/components/InvoicesList/InvoiceItem";
import { InvoicesSchema } from "@/schemas";
import EmptyInvoice from "@/components/InvoicesList/EmptyInvoice";
import { useFilterInvoices } from "@/hooks/useFilterInvoices";
export default function InvoicesFiltered({
  invoices,
}: {
  invoices: z.infer<typeof InvoicesSchema>;
}) {
  const filteredInvoices = useFilterInvoices(invoices);
  return (
    <>
      {filteredInvoices?.length ? (
        filteredInvoices?.map((item) => (
          <InvoiceItem
            id={item.id}
            key={item.invoiceId}
            invoiceId={item.invoiceId!}
            clientName={item.clientName}
            paymentDue={item.paymentDue!}
            status={item.status!}
            total={item.total!}
          />
        ))
      ) : (
        <EmptyInvoice />
      )}
    </>
  );
}
