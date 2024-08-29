import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import EditActivatedInvoiceButton from "@/components/PreviewInvoice/EditActivatedInvoiceButton";
import InvoiceDetails from "@/components/PreviewInvoice/InvoiceDetails";
import MarkAsPaidButton from "@/components/PreviewInvoice/MarkAsPaidButton";
import PreviewInvoiceSkeleton from "@/components/PreviewInvoice/PreviewInvoiceSkeleton";
import UserInvoiceDeleteModal from "@/components/PreviewInvoice/UserInvoiceDeleteModal";
import PreviewInvoiceStatus from "@/components/PreviewInvoice/PreviewInvoiceStatus";
import BackButton from "@/components/ui/BackButton";
import { SearchParamsType } from "@/types";
import { InvoiceSchema } from "@/schemas";
import { z } from "zod";
export default async function PreviewInvoice({
  id,
  searchParams,
  activeInvoice,
}: {
  id: string;
  searchParams: SearchParamsType;
  activeInvoice: z.infer<typeof InvoiceSchema>;
}) {
  const isInvoiceEdit = !!searchParams.invoiceEdit;

  return (
    <div className="mx-auto w-full max-w-[778px]">
      <BackButton
        className="px-6 pt-6"
        backLink={isInvoiceEdit ? `/${id}/preview` : "../"}
      />
      <div className="p-6 sm:px-10">
        <div className="flex items-center justify-between rounded-lg bg-white p-6 sm:justify-normal dark:bg-03">
          <p className="text-body text-[#858BB2] sm:mr-4 dark:text-05">
            Status
          </p>
          <Suspense
            fallback={
              <Skeleton className="my-2 h-[40px] w-[104px] rounded-md" />
            }
          >
            <PreviewInvoiceStatus id={id} />
          </Suspense>
          <div className="hidden justify-between gap-3 sm:ml-auto sm:flex">
            <EditActivatedInvoiceButton />
            <UserInvoiceDeleteModal
              id={id}
              invoiceId={activeInvoice.invoiceId}
              className="px-6"
            />
            <MarkAsPaidButton id={id} className="min-w-[122.84px] px-5" />
          </div>
        </div>
        <Suspense fallback={<PreviewInvoiceSkeleton />}>
          <InvoiceDetails id={id} />
        </Suspense>
      </div>
      <div className="flex items-center justify-between gap-3 bg-white p-6 sm:hidden sm:justify-normal dark:bg-03">
        <EditActivatedInvoiceButton />
        <UserInvoiceDeleteModal
          id={id}
          invoiceId={activeInvoice.invoiceId}
          className="w-[51%] px-4 sm:w-auto"
        />
        <MarkAsPaidButton id={id} className="w-full" />
      </div>
    </div>
  );
}
