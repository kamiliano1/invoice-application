import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import InvoiceFilterPopover from "@/components/InvoicesList/InvoiceFilterPopover";
import InvoiceItemSkeleton from "@/components/InvoicesList/InvoiceItemSkeleton";
import InvoicesCount from "@/components/InvoicesList/InvoicesCount";
import NewInvoiceButton from "@/components/InvoicesList/NewInvoiceButton";
import InvoiceSuspense from "@/components/InvoicesList/InvoiceSuspense";

export default function InvoicesList() {
  return (
    <div className="p-6 sm:p-10 w-full flex flex-col gap-y-4 max-w-[778px] mx-auto lg:mt-20 z-[1]">
      <div className="font-bold flex items-center text-08 dark:text-white my-4 sm:mb-7">
        <div className="mr-auto">
          <h1 className="text-headingM sm:text-headingL mb-1">Invoices</h1>
          <Suspense fallback={<Skeleton className="h-[18px] w-30" />}>
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
