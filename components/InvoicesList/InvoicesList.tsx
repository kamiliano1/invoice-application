// "use client";
import { userInvoicesState } from "@/atoms/settingsAppAtom";
import EmptyInvoice from "@/components/InvoicesList/EmptyInvoice";
import InvoiceFilterPopover from "@/components/InvoicesList/InvoiceFilterPopover";
import InvoiceItem from "@/components/InvoicesList/InvoiceItem";
import InvoiceItemSkeleton from "@/components/InvoicesList/InvoiceItemSkeleton";
import InvoicesCount from "@/components/InvoicesList/InvoicesCount";
import SortSection from "@/components/Sort/SortSection";
import { Skeleton } from "@/components/ui/skeleton";
import useData from "@/hooks/useData";
import { SortTypes } from "@/types";
import { Suspense, useState } from "react";
import { useRecoilValue } from "recoil";
import NewInvoiceButton from "./NewInvoiceButton";
import { InvoicesSchema } from "@/schemas";
import { getUserInvoicesById } from "@/data/invoices";
import { auth } from "@/auth";
import InvoiceSuspense from "./InvoiceSuspense";

export default function InvoicesList() {
  return (
    <div className="p-6 sm:p-10 w-full flex flex-col gap-y-4 max-w-[778px] mx-auto lg:mt-20 z-[1]">
      <div className="font-bold flex items-center text-08 dark:text-white my-4 sm:mb-7">
        <div className="mr-auto">
          <h1 className="text-headingM sm:text-headingL mb-1">Invoices</h1>
          {/* {!isLoaded ? ( */}
          {/* <Skeleton className="h-[18px] w-30" /> */}
          {/* ) : ( */}
          <InvoicesCount />
          {/* )} */}
        </div>
        <InvoiceFilterPopover />
        <NewInvoiceButton />
      </div>
      <Suspense fallback={<InvoiceItemSkeleton />}>
        <InvoiceSuspense />
      </Suspense>
      {/* <Suspense fallback={<InvoiceItemSkeleton />}>
        {invoices?.map((item) => (
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
      </Suspense> */}

      {/* {!isLoaded ? ( */}
      {/* <InvoiceItemSkeleton /> */}
      {/* ) : ( */}
      <>
        {/* {filteringInvoices({
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
        )} */}
      </>
      {/* )} */}
    </div>
  );
}
