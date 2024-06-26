"use client";
import { settingsAppState, userInvoicesState } from "@/atoms/settingsAppAtom";
import InvoiceFilterPopover from "@/components/InvoicesList/InvoiceFilterPopover";
import InvoiceItem from "@/components/InvoicesList/InvoiceItem";
import InvoiceItemSkeleton from "@/components/InvoicesList/InvoiceItemSkeleton";
import SortElement from "@/components/Sort/SortElement";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useData from "@/hooks/useData";
import useWindowWith from "@/hooks/useWindowWidth";
import { SortTypes } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import EmptyInvoice from "@/components/InvoicesList/EmptyInvoice";
import SortSection from "@/components/Sort/SortSection";
export default function InvoicesList() {
  useData();
  const [settingsState, setSettingsState] = useRecoilState(settingsAppState);
  const windowWidth = useWindowWith();
  const [actualSortStatus, setActualSortStatus] = useState<SortTypes>({
    label: "",
    status: "",
  });
  const [countInvoiceInfo, setCountInvoiceInfo] = useState("");
  const { isLoaded, totalInvoicesCount, filteringInvoices } =
    useRecoilValue(userInvoicesState);
  const router = useRouter();
  const createNewInvoice = () => {
    router.push("/?invoiceEdit=true");
  };
  useEffect(() => {
    if (totalInvoicesCount === 0) {
      setCountInvoiceInfo("No invoices");
      return;
    }
    totalInvoicesCount !== 1
      ? setCountInvoiceInfo(`${totalInvoicesCount} invoices`)
      : setCountInvoiceInfo(`${totalInvoicesCount} invoice`);
    if (windowWidth > 640) {
      totalInvoicesCount !== 1
        ? setCountInvoiceInfo(`There are ${totalInvoicesCount} total invoices`)
        : setCountInvoiceInfo(`There is ${totalInvoicesCount} total invoice`);
    }
  }, [totalInvoicesCount, windowWidth]);

  return (
    <div className="p-6 sm:p-10 w-full flex flex-col gap-y-4 max-w-[778px] mx-auto lg:mt-20 z-[1]">
      <div className="font-bold flex items-center text-08 dark:text-white my-4 sm:mb-7">
        <div className="mr-auto">
          <h1 className="text-headingM sm:text-headingL mb-1">Invoices</h1>
          {!isLoaded ? (
            <Skeleton className="h-[18px] w-30" />
          ) : (
            <p className="text-body">{countInvoiceInfo}</p>
          )}
        </div>
        <InvoiceFilterPopover />
        <Button
          variant="violetWithPlusIcon"
          onClick={createNewInvoice}
          size={windowWidth < 640 ? "small" : "default"}
          className="text-headingS text-white"
        >
          {windowWidth < 640 ? "New" : "New Invoice"}
        </Button>
      </div>

      {!isLoaded ? (
        <InvoiceItemSkeleton />
      ) : (
        <>
          {filteringInvoices({
            label: actualSortStatus.label,
            status: actualSortStatus.status,
          })?.length ? (
            <>
              <SortSection
                actualSortStatus={actualSortStatus}
                setActualSortStatus={setActualSortStatus}
              />
              {filteringInvoices({
                label: actualSortStatus.label,
                status: actualSortStatus.status,
              })?.map((item) => (
                <InvoiceItem
                  id={item.id}
                  key={item.invoiceId}
                  invoiceId={item.invoiceId!}
                  clientName={item.clientName}
                  paymentDue={item.paymentDue!}
                  status={item.status!}
                  total={item.total!}
                />
              ))}
            </>
          ) : (
            <EmptyInvoice />
          )}
        </>
      )}
    </div>
  );
}
