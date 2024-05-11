"use client";
import { darkModeState, userInvoicesState } from "@/atoms/settingsAppAtom";
import useWindowWith from "@/hooks/useWindowWidth";
import { useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { cn } from "@/lib/utils";
import Link from "next/link";
import InvoiceForm from "@/components/InvoiceForm/InvoiceForm";
import PreviewInvoice from "@/components/PreviewInvoice/PreviewInvoice";
export default function PreviewPage({
  params,
}: {
  params: { invoiceId: string };
}) {
  const { userInvoices } = useRecoilValue(userInvoicesState);
  const isDarkMode = useRecoilValue(darkModeState);
  const invoiceId = params.invoiceId;
  const searchParams = useSearchParams();
  const isInvoiceEdit = !!searchParams.get("invoiceEdit");
  const windowWidth = useWindowWith();
  const activeInvoice = userInvoices.filter((item) => item.id === invoiceId)[0];

  return (
    <main
      className={cn(
        "min-h-[calc(100dvh_-72px)] sm:min-h-[calc(100dvh_-_80px)] lg:h-[100vh] lg:px-0 flex flex-col bg-11 dark:bg-12",
        { dark: isDarkMode }
      )}
    >
      <div className="max-w-[778px] mx-auto w-full">
        <Link
          className="flex items-center text-headingS font-bold text-08 dark:text-white pt-6 px-6 sm:px-10 sm:pt-14"
          href={isInvoiceEdit ? `/${invoiceId}/preview` : "../"}
        >
          <MdKeyboardArrowLeft className="text-headingM text-01 mr-5" /> Go back
        </Link>
        {windowWidth < 640 ? (
          <>
            {isInvoiceEdit ? (
              <InvoiceForm invoiceData={activeInvoice} />
            ) : (
              <PreviewInvoice invoiceId={invoiceId} />
            )}
          </>
        ) : (
          <>
            <InvoiceForm invoiceData={activeInvoice} />
            <PreviewInvoice invoiceId={invoiceId} />
          </>
        )}
      </div>
    </main>
  );
}
