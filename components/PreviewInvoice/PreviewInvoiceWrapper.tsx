"use client";
import { darkModeState, userInvoicesState } from "@/atoms/settingsAppAtom";
import useWindowWith from "@/hooks/useWindowWidth";
import { useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import { cn } from "@/lib/utils";
import InvoiceForm from "@/components/InvoiceForm/InvoiceForm";
import PreviewInvoice from "@/components/PreviewInvoice/PreviewInvoice";
import { getUserActiveInvoiceByInvoiceId } from "@/data/invoices";
import { InvoiceSchema } from "@/schemas";
import { useTransition, useState, useEffect } from "react";
import { z } from "zod";
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

  const activeInvoice = userInvoices.filter(
    (item) => item.invoiceId === invoiceId
  )[0];
  const [isPending, startTransition] = useTransition();
  const [invoiceData, setInvoiceData] =
    useState<z.infer<typeof InvoiceSchema>>();

  useEffect(() => {
    const fetchData = async () => {
      startTransition(() => {
        getUserActiveInvoiceByInvoiceId(invoiceId).then((res) => {
          if (res) {
            const validatedData = InvoiceSchema.safeParse(res);
            if (validatedData.success) setInvoiceData(validatedData.data);
          }
        });
      });
    };
    fetchData();
  }, [invoiceId]);
  if (isPending) return <h2 className="p-[10rem] text-headingL">LOADING</h2>;
  return (
    <main
      className={cn("flex flex-col lg:px-0 bg-11 dark:bg-12", {
        dark: isDarkMode,
      })}
    >
      {windowWidth < 640 ? (
        <>
          {isInvoiceEdit ? (
            <InvoiceForm invoiceData={invoiceData} invoiceId={invoiceId} />
          ) : (
            <PreviewInvoice
              invoiceData={invoiceData}
              activeInvoiceId={invoiceId}
            />
          )}
        </>
      ) : (
        <>
          <InvoiceForm invoiceData={invoiceData} invoiceId={invoiceId} />
          <PreviewInvoice
            invoiceData={invoiceData}
            activeInvoiceId={invoiceId}
          />
        </>
      )}
    </main>
  );
}
