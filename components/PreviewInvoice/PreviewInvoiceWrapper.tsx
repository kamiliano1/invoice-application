"use client";
import { darkModeState, userInvoicesState } from "@/atoms/settingsAppAtom";
import useWindowWith from "@/hooks/useWindowWidth";
import { useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import { cn } from "@/lib/utils";
import InvoiceForm from "@/components/InvoiceForm/InvoiceForm";
import PreviewInvoice from "@/components/PreviewInvoice/PreviewInvoice";
export default function PreviewInvoiceWrapper({
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
      className={cn("flex flex-col lg:px-0 bg-11 dark:bg-12", {
        dark: isDarkMode,
      })}
    >
      {windowWidth < 640 ? (
        <>
          {isInvoiceEdit ? (
            <InvoiceForm invoiceData={activeInvoice} invoiceId={invoiceId} />
          ) : (
            <PreviewInvoice invoiceId={invoiceId} />
          )}
        </>
      ) : (
        <>
          <InvoiceForm invoiceData={activeInvoice} invoiceId={invoiceId} />
          <PreviewInvoice invoiceId={invoiceId} />
        </>
      )}
    </main>
  );
}
