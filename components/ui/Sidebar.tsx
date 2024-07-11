import { cn } from "@/lib/utils";
import InvoiceForm from "@/components/InvoiceForm/InvoiceForm";
import { InvoiceSchema } from "@/schemas";
import { z } from "zod";
import UserSettings from "@/components/UserSettings/UserSettings";
import { SearchParamsType } from "@/types";
import { getUserActiveInvoiceByInvoiceId } from "@/data/invoices";
export default async function Sidebar({
  invoiceId,
  searchParams,
  id,
}: {
  invoiceId?: string;
  searchParams: SearchParamsType;
  id?: string;
}) {
  const isInvoiceEdit = searchParams.invoiceEdit;
  const isUserSettings = searchParams.userSetting;
  const activeInvoice = (await getUserActiveInvoiceByInvoiceId(id)) as z.infer<
    typeof InvoiceSchema
  >;
  return (
    <div
      className={cn(
        "top-[72px] duration-500 w-full absolute sm:top-0 -translate-x-full grid grid-cols-[minmax(0,_616px)_auto] lg:grid-cols-[minmax(0,_719px)_auto] overflow-y-scroll z-[5] min-h-[calc(100vh_-72px)] sm:min-h-full",
        {
          "translate-x-0": isInvoiceEdit || isUserSettings,
        }
      )}
    >
      {isInvoiceEdit && (
        <InvoiceForm invoiceData={activeInvoice} invoiceId={id} />
      )}
      {isUserSettings && (
        <UserSettings invoiceId={invoiceId} searchParams={searchParams} />
      )}
    </div>
  );
}
