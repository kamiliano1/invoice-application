import { cn } from "@/lib/utils";
import InvoiceForm from "@/components/InvoiceForm/InvoiceForm";
import { InvoiceSchema } from "@/schemas";
import { z } from "zod";
import UserSettings from "@/components/UserSettings/UserSettings";
import { SearchParamsType } from "@/types";
import { getUserActiveInvoiceByInvoiceId } from "@/data/invoices";
import { auth } from "@/auth";
export default async function Sidebar({
  searchParams,
  id,
}: {
  searchParams: SearchParamsType;
  id?: string;
}) {
  const isInvoiceEdit = searchParams.invoiceEdit;
  const isUserSettings = searchParams.userSetting;
  const session = await auth();
  const activeInvoice = (await getUserActiveInvoiceByInvoiceId(
    id,
    session?.user?.id,
  )) as z.infer<typeof InvoiceSchema>;
  return (
    <div
      className={cn(
        "absolute top-[72px] z-[5] grid min-h-[calc(100vh_-72px)] w-full -translate-x-full grid-cols-[minmax(0,_616px)_auto] overflow-y-scroll duration-500 sm:top-0 sm:min-h-full lg:grid-cols-[minmax(0,_719px)_auto]",
        {
          "translate-x-0": isInvoiceEdit || isUserSettings,
        },
      )}
    >
      {isInvoiceEdit && (
        <InvoiceForm
          invoiceData={activeInvoice}
          invoiceId={id}
          userId={session?.user?.id}
        />
      )}
      {isUserSettings && (
        <UserSettings invoiceId={id} searchParams={searchParams} />
      )}
    </div>
  );
}
