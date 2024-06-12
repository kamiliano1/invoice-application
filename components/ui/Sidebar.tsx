import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import InvoiceForm from "../InvoiceForm/InvoiceForm";
import { InvoiceSchema } from "@/schemas";
import { z } from "zod";
import UserSettings from "../Auth/UserSettings";
export default function Sidebar({
  invoiceData,
  invoiceId,
}: {
  invoiceData?: z.infer<typeof InvoiceSchema>;
  invoiceId?: string;
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
        <InvoiceForm invoiceData={invoiceData} invoiceId={invoiceId} />
      )}
      {isUserSettings && <UserSettings invoiceId={invoiceId} />}
    </div>
  );
}
