"use client";
import InvoicesList from "@/components/InvoicesList/InvoicesList";
import useWindowWith from "@/hooks/useWindowWidth";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/ui/Sidebar";
export default function InvoicesListWrapper() {
  const windowWidth = useWindowWith();
  const searchParams = useSearchParams();
  const isInvoiceEdit = !!searchParams.get("invoiceEdit");
  const isUserEdit = !!searchParams.get("userSetting");
  return (
    <main className="flex flex-col items-start bg-11 dark:bg-12">
      {windowWidth < 640 ? (
        <>
          {isInvoiceEdit || isUserEdit ? (
            <>
              <Sidebar />
            </>
          ) : (
            <InvoicesList />
          )}
        </>
      ) : (
        <>
          <InvoicesList />
          <Sidebar />
        </>
      )}
    </main>
  );
}
