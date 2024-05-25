"use client";
import PreviewInvoiceWrapper from "@/components/PreviewInvoice/PreviewInvoiceWrapper";
import { Suspense } from "react";
export default function PreviewPage({
  params,
}: {
  params: { invoiceId: string };
}) {
  return (
    <Suspense>
      <PreviewInvoiceWrapper params={params} />
    </Suspense>
  );
}
