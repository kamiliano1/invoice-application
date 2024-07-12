import PreviewInvoiceWrapper from "@/components/PreviewInvoice/PreviewInvoiceWrapper";
import { SearchParamsType } from "@/types";
export default function PreviewPage({
  searchParams,
  params,
}: {
  searchParams: SearchParamsType;
  params: { invoiceId: string };
}) {
  const invoiceId = params.invoiceId;
  return (
    <>
      <PreviewInvoiceWrapper searchParams={searchParams} id={invoiceId} />;
    </>
  );
}
