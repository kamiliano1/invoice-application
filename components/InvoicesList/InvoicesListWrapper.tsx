import InvoicesList from "@/components/InvoicesList/InvoicesList";
import Sidebar from "@/components/ui/Sidebar";
import { SearchParamsType } from "@/types";
export default function InvoicesListWrapper({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  return (
    <main className="flex flex-col items-start bg-11 dark:bg-12">
      <InvoicesList />
      <Sidebar searchParams={searchParams} />
    </main>
  );
}
