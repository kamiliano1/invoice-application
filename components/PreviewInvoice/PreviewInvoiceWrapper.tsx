"use client";
import {
  darkModeState,
  settingsAppState,
  userInvoicesState,
} from "@/atoms/settingsAppAtom";
import useWindowWith from "@/hooks/useWindowWidth";
import { useSearchParams } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";
import { cn } from "@/lib/utils";
import PreviewInvoice from "@/components/PreviewInvoice/PreviewInvoice";
import { getUserInvoicesById } from "@/data/invoices";
import { InvoiceSchema, InvoicesSchema } from "@/schemas";
import { useTransition, useState, useEffect } from "react";
import { z } from "zod";
import PreviewInvoiceSkeleton from "@/components/PreviewInvoice/PreviewInvoiceSkeleton";
import Sidebar from "../ui/Sidebar";
import useCurrentUser from "@/hooks/useCurrentUser";
export default function PreviewInvoiceWrapper({
  params,
}: {
  params: { invoiceId: string };
}) {
  const userId = useCurrentUser();
  const { userInvoices, isLoaded, activeInvoice } =
    useRecoilValue(userInvoicesState);
  const isDarkMode = useRecoilValue(darkModeState);
  const invoiceId = params.invoiceId;
  const searchParams = useSearchParams();
  const isInvoiceEdit = !!searchParams.get("invoiceEdit");
  const windowWidth = useWindowWith();
  const isUserEdit = !!searchParams.get("userSetting");
  // const activeInvoice = userInvoices.filter(
  //   (item) => item.invoiceId === invoiceId
  // )[0];
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
