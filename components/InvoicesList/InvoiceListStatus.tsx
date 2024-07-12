import StatusInvoice from "@/components/ui/StatusInvoice";

export default function InvoiceListStatus({ status }: { status: string }) {
  return <StatusInvoice status={status} />;
}
