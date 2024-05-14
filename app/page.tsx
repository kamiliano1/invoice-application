"use client";
import InvoicesListWrapper from "@/components/InvoicesList/InvoicesListWrapper";
import { Suspense } from "react";
export default function HomePage() {
  return (
    <Suspense fallback={<h2>Loading</h2>}>
      <InvoicesListWrapper />;
    </Suspense>
  );
}
