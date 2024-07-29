import { auth } from "@/auth";
import PreviewInvoiceWrapper from "@/components/PreviewInvoice/PreviewInvoiceWrapper";
import { notFound } from "next/navigation";
import { getUserActiveInvoiceByInvoiceId } from "@/data/invoices";
import { SearchParamsType } from "@/types";
import { InvoiceSchema } from "@/schemas";
import { z } from "zod";
export default async function PreviewPage({
  searchParams,
  params,
}: {
  searchParams: SearchParamsType;
  params: { invoiceId: string };
}) {
  const invoiceId = params.invoiceId;
  const session = await auth();
  const activeInvoice = (await getUserActiveInvoiceByInvoiceId(
    invoiceId,
    session?.user?.id
  )) as z.infer<typeof InvoiceSchema>;
  if (!activeInvoice) notFound();
  return (
    <>
      <PreviewInvoiceWrapper
        searchParams={searchParams}
        id={invoiceId}
        activeInvoice={activeInvoice}
      />
      ;
    </>
  );
}
