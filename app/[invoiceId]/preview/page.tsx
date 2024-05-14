"use client";
import PreviewInvoiceWrapper from "@/components/PreviewInvoice/PreviewInvoiceWrapper";
import { Suspense } from "react";
export default function PreviewPage({
  params,
}: {
  params: { invoiceId: string };
}) {
  return (
    <Suspense fallback={<h2>Loading</h2>}>
      <PreviewInvoiceWrapper params={params} />
    </Suspense>
  );
}
