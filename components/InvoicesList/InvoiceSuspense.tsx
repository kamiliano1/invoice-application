import { auth } from "@/auth";
import { getUserInvoicesById } from "@/data/invoices";
import InvoiceItem from "@/components/InvoicesList/InvoiceItem";
import EmptyInvoice from "@/components/InvoicesList/EmptyInvoice";
import activeUserFilter from "@/actions/activeUserFilter";
import { getUserActiveFilter } from "@/data/filter";

export default async function InvoiceSuspense() {
  const session = await auth();
  const invoices = await getUserInvoicesById(session?.user?.id);
  const filter = await getUserActiveFilter(session?.user?.id);
  return (
    <>
      <h2 className="text-[3rem]">{JSON.stringify(session)}</h2>
      {JSON.stringify(filter)}
      {invoices?.length ? (
        invoices?.map((item) => (
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
