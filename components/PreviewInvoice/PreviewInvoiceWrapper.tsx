"use client";
import {
  darkModeState,
  settingsAppState,
  userInvoicesState,
} from "@/atoms/settingsAppAtom";
import PreviewInvoice from "@/components/PreviewInvoice/PreviewInvoice";
import PreviewInvoiceSkeleton from "@/components/PreviewInvoice/PreviewInvoiceSkeleton";
import { getUserInvoicesById } from "@/data/invoices";
import useCurrentUser from "@/hooks/useCurrentUser";
import useWindowWith from "@/hooks/useWindowWidth";
import { cn } from "@/lib/utils";
import { InvoicesSchema } from "@/schemas";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { z } from "zod";
import Sidebar from "@/components/ui/Sidebar";
export default function PreviewInvoiceWrapper({
  params,
}: {
  params: { invoiceId: string };
}) {
  const userId = useCurrentUser();
  const { isLoaded, activeInvoice } = useRecoilValue(userInvoicesState);
  const isDarkMode = useRecoilValue(darkModeState);
  const invoiceId = params.invoiceId;
  const searchParams = useSearchParams();
  const isInvoiceEdit = !!searchParams.get("invoiceEdit");
  const windowWidth = useWindowWith();
  const isUserEdit = !!searchParams.get("userSetting");

  const [settingsState, setSettingsState] = useRecoilState(settingsAppState);
  useEffect(() => {
    const fetchData = async () => {
      if (!isLoaded) {
        getUserInvoicesById(userId).then((res) => {
          if (res) {
            const validatedFields = InvoicesSchema.safeParse(
              res.filter((item) => item.status !== "draft")
            );
            if (validatedFields.success) {
              setSettingsState((prev) => ({
                ...prev,
                userInvoices: res as z.infer<typeof InvoicesSchema>,
                isLoaded: true,
              }));
            }
          }
        });
      }
    };
    fetchData();
  }, [setSettingsState, isLoaded, userId]);
  return (
    <main
      className={cn("flex flex-col lg:px-0 bg-11 dark:bg-12", {
        dark: isDarkMode,
      })}
    >
      {!isLoaded ? (
        <PreviewInvoiceSkeleton />
      ) : (
        <>
          {windowWidth < 640 ? (
            <>
              {isInvoiceEdit || isUserEdit ? (
                <Sidebar
                  invoiceData={activeInvoice(invoiceId)}
                  invoiceId={invoiceId}
                />
              ) : (
                <>
                  <PreviewInvoice
                    invoiceData={activeInvoice(invoiceId)}
                    activeInvoiceId={invoiceId}
                  />
                </>
              )}
            </>
          ) : (
            <>
              <Sidebar
                invoiceData={activeInvoice(invoiceId)}
                invoiceId={invoiceId}
              />
              <PreviewInvoice
                invoiceData={activeInvoice(invoiceId)}
                activeInvoiceId={invoiceId}
              />
            </>
          )}
        </>
      )}
    </main>
  );
}
