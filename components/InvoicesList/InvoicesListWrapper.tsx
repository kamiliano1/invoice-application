"use client";
import { darkModeState } from "@/atoms/settingsAppAtom";
import InvoiceForm from "@/components/InvoiceForm/InvoiceForm";
import InvoicesList from "@/components/InvoicesList/InvoicesList";
import useWindowWith from "@/hooks/useWindowWidth";
import { cn } from "@/lib/utils";
import { useRecoilValue } from "recoil";
import { useSearchParams } from "next/navigation";
export default function InvoicesListWrapper() {
  const windowWidth = useWindowWith();
  const isDarkMode = useRecoilValue(darkModeState);
  const searchParams = useSearchParams();
  const isInvoiceEdit = !!searchParams.get("invoiceEdit");
  return (
    <main
      className={cn("flex flex-col items-start bg-11 dark:bg-12", {
        dark: isDarkMode,
      })}
    >
      {windowWidth < 640 ? (
        <>
          {isInvoiceEdit ? (
            <>
              <InvoiceForm />
            </>
          ) : (
            <InvoicesList />
          )}
        </>
      ) : (
        <>
          <InvoicesList />
          <InvoiceForm />
        </>
      )}
    </main>
  );
}
