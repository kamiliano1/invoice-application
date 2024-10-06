import InvoicesList from "@/components/InvoicesList/InvoicesList";
import Sidebar from "@/components/ui/Sidebar";
import { cn } from "@/lib/utils";
import { SearchParamsType } from "@/types";
export default function InvoicesListWrapper({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  const isInvoiceEdit = searchParams.invoiceEdit;
  const isUserSettings = searchParams.userSetting;
  return (
    <main
      className={cn("flex flex-col items-start bg-11 dark:bg-12", {
        "overflow-hidden max-sm:h-[526px]": isInvoiceEdit || isUserSettings,
      })}
    >
      <InvoicesList />
      <Sidebar searchParams={searchParams} />
    </main>
  );
}
