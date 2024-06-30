"use client";
import useCurrentInvoicesStatus from "@/hooks/useCurrentInvoicesStatus";

export default function InvoicesCount() {
  const countInvoiceInfo = useCurrentInvoicesStatus();
  return <p className="text-body">{countInvoiceInfo}</p>;
}
