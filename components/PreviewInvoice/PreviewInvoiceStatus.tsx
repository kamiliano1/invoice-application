import { getUserActiveInvoiceByInvoiceId } from "@/data/invoices";
import StatusInvoice from "@/components/ui/StatusInvoice";
import { auth } from "@/auth";

export default async function PreviewInvoiceStatus({ id }: { id: string }) {
  const session = await auth();
  const activeInvoice = await getUserActiveInvoiceByInvoiceId(
    id,
    session?.user?.id
  );
  const status = activeInvoice?.status;
  return <StatusInvoice status={status} />;
}
