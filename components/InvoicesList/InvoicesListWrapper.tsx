"use client";
import { darkModeState } from "@/atoms/settingsAppAtom";
import InvoiceForm from "@/components/InvoiceForm/InvoiceForm";
import InvoicesList from "@/components/InvoicesList/InvoicesList";
import useWindowWith from "@/hooks/useWindowWidth";
import { cn } from "@/lib/utils";
import { useRecoilValue } from "recoil";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
export default function InvoicesListWrapper() {
  const windowWidth = useWindowWith();
  const isDarkMode = useRecoilValue(darkModeState);
  const searchParams = useSearchParams();
  const isInvoiceEdit = !!searchParams.get("invoiceEdit");
  const [getInvoices, setGetInvoices] = useState(false);
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
              <InvoiceForm setGetInvoices={setGetInvoices} />
            </>
          ) : (
            <InvoicesList getInvoices={getInvoices} />
          )}
        </>
      ) : (
        <>
          <InvoicesList getInvoices={getInvoices} />
          <InvoiceForm setGetInvoices={setGetInvoices} />
        </>
      )}
    </main>
  );
}
