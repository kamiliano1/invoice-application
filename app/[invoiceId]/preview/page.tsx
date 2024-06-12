"use client";
import PreviewInvoiceWrapper from "@/components/PreviewInvoice/PreviewInvoiceWrapper";
export default function PreviewPage({
  params,
}: {
  params: { invoiceId: string };
}) {
  return <PreviewInvoiceWrapper params={params} />;
}
