import { getUserActiveInvoiceByInvoiceId } from "@/data/invoices";
import StatusInvoice from "@/components/ui/StatusInvoice";

export default async function PreviewInvoiceStatus({ id }: { id: string }) {
  const activeInvoice = await getUserActiveInvoiceByInvoiceId(id);
  const status = activeInvoice?.status;
  return <StatusInvoice status={status} />;
}
