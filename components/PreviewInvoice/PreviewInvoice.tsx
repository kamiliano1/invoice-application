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
import { getUserActiveInvoiceId } from "@/data/invoices";
export default async function PreviewInvoice({
  id,
  searchParams,
}: {
  id: string;
  searchParams: SearchParamsType;
}) {
  const isInvoiceEdit = !!searchParams.invoiceEdit;
  const invoiceId = await getUserActiveInvoiceId(id);
  return (
    <div className="max-w-[778px] mx-auto w-full">
      <BackButton
        className="pt-6 px-6"
        backLink={isInvoiceEdit ? `/${id}/preview` : "../"}
      />
      <div className="p-6 sm:px-10">
        <div className="p-6 flex items-center justify-between sm:justify-normal rounded-lg bg-white dark:bg-03">
          <p className="text-body sm:mr-4 text-[#858BB2] dark:text-05">
            Status
          </p>
          <Suspense
            fallback={
              <Skeleton className="w-[104px] h-[40px] my-2 rounded-md" />
            }
          >
            <PreviewInvoiceStatus id={id} />
          </Suspense>
          <div className="justify-between hidden sm:flex sm:ml-auto gap-3">
            <EditActivatedInvoiceButton />
            <UserInvoiceDeleteModal
              id={id}
              invoiceId={invoiceId}
              className="px-6"
            />
            <MarkAsPaidButton id={id} className="px-5 min-w-[122.84px]" />
          </div>
        </div>
        <Suspense fallback={<PreviewInvoiceSkeleton />}>
          <InvoiceDetails id={id} />
        </Suspense>
      </div>
      <div className="p-6 flex items-center justify-between sm:justify-normal sm:hidden gap-3 bg-white dark:bg-03">
        <EditActivatedInvoiceButton />
        <UserInvoiceDeleteModal
          id={id}
          invoiceId={invoiceId}
          className="px-4 w-[51%] sm:w-auto"
        />
        <MarkAsPaidButton id={id} className="w-full" />
      </div>
    </div>
  );
}
