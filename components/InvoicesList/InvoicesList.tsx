import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import InvoiceFilterPopover from "@/components/InvoicesList/InvoiceFilterPopover";
import InvoiceItemSkeleton from "@/components/InvoicesList/InvoiceItemSkeleton";
import InvoicesCount from "@/components/InvoicesList/InvoicesCount";
import NewInvoiceButton from "@/components/InvoicesList/NewInvoiceButton";
import InvoiceSuspense from "@/components/InvoicesList/InvoiceSuspense";

export default function InvoicesList() {
  return (
    <div className="z-[1] mx-auto flex w-full max-w-[778px] flex-col gap-y-4 p-6 sm:p-10 lg:mt-20">
      <div className="my-4 flex items-center font-bold text-08 sm:mb-7 dark:text-white">
        <div className="mr-auto">
          <h1 className="mb-1 text-headingM sm:text-headingL">Invoices</h1>
          <Suspense fallback={<Skeleton className="w-30 h-[18px]" />}>
            <InvoicesCount />
          </Suspense>
        </div>
        <InvoiceFilterPopover />
        <NewInvoiceButton />
      </div>
      <Suspense fallback={<InvoiceItemSkeleton />}>
        <InvoiceSuspense />
      </Suspense>
    </div>
  );
}
