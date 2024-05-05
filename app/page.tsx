"use client";
import { darkModeState } from "@/atoms/settingsAppAtom";
import InvoiceForm from "@/components/InvoiceForm/InvoiceForm";
import InvoicesList from "@/components/InvoicesList/InvoicesList";
import useWindowWith from "@/hooks/useWindowWidth";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";
export default function HomePage() {
  const windowWidth = useWindowWith();
  const isDarkMode = useRecoilValue(darkModeState);
  const searchParams = useSearchParams();
  const isInvoiceEdit = !!searchParams.get("invoiceEdit");
  if (windowWidth < 640)
    return (
      <main
        className={cn(
          "flex flex-col items-start min-h-[calc(100dvh_-72px)] sm:min-h-[calc(100dvh_-_80px)] lg:min-h-[100vh] bg-11 dark:bg-12",
          {
            dark: isDarkMode,
          }
        )}
      >
        {isInvoiceEdit ? <InvoiceForm /> : <InvoicesList />}
      </main>
    );
  return (
    <main
      className={cn(
        "flex flex-col items-start min-h-[calc(100dvh_-72px)] sm:min-h-[calc(100dvh_-_80px)] lg:min-h-[100vh] bg-11 dark:bg-12",
        {
          dark: isDarkMode,
        }
      )}
    >
      <InvoicesList />
      <InvoiceForm />
    </main>
  );
}
