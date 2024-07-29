import { SearchParamsType } from "@/types";
import Sidebar from "@/components/ui/Sidebar";
import PreviewInvoice from "@/components/PreviewInvoice/PreviewInvoice";
import { z } from "zod";
import { InvoiceSchema } from "@/schemas";

export default function PreviewInvoiceWrapper({
  searchParams,
  id,
  activeInvoice,
}: {
  searchParams: SearchParamsType;
  id: string;
  activeInvoice: z.infer<typeof InvoiceSchema>;
}) {
  return (
    <main className="flex flex-col lg:px-0 bg-11 dark:bg-12">
      <PreviewInvoice
        id={id}
        searchParams={searchParams}
        activeInvoice={activeInvoice}
      />
      <Sidebar id={id} searchParams={searchParams} />
    </main>
  );
}
