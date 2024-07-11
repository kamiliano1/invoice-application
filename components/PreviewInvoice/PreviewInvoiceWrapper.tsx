import { SearchParamsType } from "@/types";
import Sidebar from "@/components/ui/Sidebar";
import PreviewInvoice from "@/components/PreviewInvoice/PreviewInvoice";

export default function PreviewInvoiceWrapper({
  searchParams,
  id,
}: {
  searchParams: SearchParamsType;
  id: string;
}) {
  return (
    <main className="flex flex-col lg:px-0 bg-11 dark:bg-12">
      <PreviewInvoice id={id} searchParams={searchParams} />
      <Sidebar id={id} searchParams={searchParams} />
    </main>
  );
}
