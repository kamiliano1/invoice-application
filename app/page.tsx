"use client";
import { darkModeState } from "@/atoms/settingsAppAtom";
import InvoiceForm from "@/components/InvoiceForm/InvoiceForm";
import InvoicesList from "@/components/InvoicesList/InvoicesList";
import useWindowWith from "@/hooks/useWindowWidth";
import { cn } from "@/lib/utils";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import Link from "next/link";
export default function HomePage() {
  const windowWidth = useWindowWith();
  const isDarkMode = useRecoilValue(darkModeState);
  const searchParams = useSearchParams();
  const isInvoiceEdit = !!searchParams.get("invoiceEdit");
  return (
    <main
      className={cn(
        "flex flex-col items-start min-h-[calc(100dvh_-72px)] sm:min-h-[calc(100dvh_-_80px)] lg:min-h-[100vh] bg-11 dark:bg-12",
        {
          dark: isDarkMode,
        }
      )}
    >
      {windowWidth < 640 ? (
        <>
          {isInvoiceEdit ? (
            <>
              <Link
                className="flex items-center text-headingS font-bold text-08 dark:text-white p-6 sm:px-10 sm:pt-14 sm:hidden"
                href="../"
              >
                <MdKeyboardArrowLeft className="text-headingM text-01 mr-5" />{" "}
                Go back
              </Link>
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
