import { auth } from "@/auth";
import { getUserInvoicesById } from "@/data/invoices";
import { InvoicesSchema } from "@/schemas";
import { z } from "zod";
import CountText from "@/components/InvoicesList/CountText";

export default async function InvoicesCount() {
  const session = await auth();
  const invoices = (await getUserInvoicesById(session?.user?.id)) as z.infer<
    typeof InvoicesSchema
  >;
  return <CountText invoices={invoices} />;
}
