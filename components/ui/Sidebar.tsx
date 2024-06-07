import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import InvoiceForm from "../InvoiceForm/InvoiceForm";
import { InvoiceSchema } from "@/schemas";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import UserSettings from "../Auth/UserSettings";
export default function Sidebar({
  invoiceData,
  invoiceId,
  setGetInvoices,
}: {
  invoiceData?: z.infer<typeof InvoiceSchema>;
  invoiceId?: string;
  setGetInvoices: Dispatch<SetStateAction<boolean>>;
}) {
  const searchParams = useSearchParams();
  const isInvoiceEdit = !!searchParams.get("invoiceEdit");
  const isUserSettings = !!searchParams.get("userSetting");
  return (
    <div
      className={cn(
        "duration-500 w-full sm:absolute sm:top-0 sm:-translate-x-full grid sm:grid-cols-[minmax(0,_616px)_auto] lg:grid-cols-[minmax(0,_719px)_auto] overflow-y-scroll z-[5] min-h-full",
        {
          "sm:translate-x-0": isInvoiceEdit || isUserSettings,
        }
      )}
    >
      {isInvoiceEdit && (
        <InvoiceForm
          setGetInvoices={setGetInvoices}
          invoiceData={invoiceData}
        />
      )}
      {isUserSettings && <UserSettings invoiceId={invoiceId} />}
    </div>
  );
}
