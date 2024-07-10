import { darkModeState, settingsAppState } from "@/atoms/settingsAppAtom";
import { InvoiceSchema } from "@/schemas";
import { useRecoilState, useRecoilValue } from "recoil";
import StatusInvoice from "@/components/ui/StatusInvoice";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import PreviewSummary from "@/components/PreviewInvoice/PreviewSummary";
import { dateToString } from "@/lib/utils";
import BackButton from "@/components/ui/BackButton";
import { z } from "zod";
import DeleteModalWrapper from "@/components/ui/DeleteModalWrapper";
import { deleteInvoice } from "@/actions/deleteInvoice";
import { Suspense, useTransition } from "react";
import { switchInvoiceToPaid } from "@/actions/switchInvoiceToPaid";
import EditActivatedInvoiceButton from "./EditActivatedInvoiceButton";
import MarkAsPaidButton from "./MarkAsPaidButton";
import UserInvoiceDeleteModal from "./UserInvoiceDeleteModal";
import { Skeleton } from "../ui/skeleton";
import InvoiceDetails from "./InvoiceDetails";
import PreviewInvoiceSkeleton from "./PreviewInvoiceSkeleton";
export default async function PreviewInvoice({
  invoiceData,
  id,
}: {
  invoiceData?: z.infer<typeof InvoiceSchema>;
  id: string;
}) {
  // const isDarkMode = useRecoilValue(darkModeState);
  // const [settingsState, setSettingsState] = useRecoilState(settingsAppState);
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const isInvoiceEdit = !!searchParams.get("invoiceEdit");
  // const [isPending, startTransition] = useTransition();
  // const inv = await
  const {
    status,
    description,
    invoiceId,
    senderAddress,
    createdAt,
    paymentDue,
    clientName,
    clientAddress,
    clientEmail,
    items,
    total,
    // id,
  } = invoiceData || {};
  return (
    <div className="max-w-[778px] mx-auto w-full">
      {/* <BackButton
        className="pt-6 px-6"
        backLink={isInvoiceEdit ? `/${activeInvoiceId}/preview` : "../"}
      /> */}
      <div className="p-6 sm:px-10">
        <div className="p-6 flex items-center justify-between sm:justify-normal rounded-lg bg-white dark:bg-03">
          <p className="text-body sm:mr-4 text-[#858BB2] dark:text-05">
            Status
          </p>
          <Suspense
            fallback={
              <Skeleton className="w-[104px] h-[40px] my-2 rounded-md " />
            }
          >
            <StatusInvoice id={id} />
          </Suspense>
          <div className="justify-between hidden sm:flex sm:ml-auto gap-3">
            <EditActivatedInvoiceButton />
            <UserInvoiceDeleteModal
              id={id}
              invoiceId={invoiceId}
              className="px-6"
            />

            <MarkAsPaidButton id={id} className="px-5" />
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
