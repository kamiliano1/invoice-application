import { dateToString } from "@/lib/utils";
import PreviewSummary from "@/components/PreviewInvoice/PreviewSummary";
import { getUserActiveInvoiceByInvoiceId } from "@/data/invoices";
import { auth } from "@/auth";

export default async function InvoiceDetails({ id }: { id: string }) {
  const session = await auth();
  const invoiceData = await getUserActiveInvoiceByInvoiceId(
    id,
    session?.user?.id,
  );
  const {
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
  } = invoiceData || {};
  return (
    <div className="mt-6 flex flex-col rounded-lg bg-white p-6 sm:grid sm:grid-cols-[repeat(3,_minmax(0,_1fr)),max-content] dark:bg-03">
      <div className="sm:col-start-1 sm:row-start-1">
        <p className="text-headingS text-08 sm:mb-2 dark:text-white">
          <span className="text-07">#</span>
          {invoiceId}
        </p>
        <p className="text-body text-07 dark:text-05">{description}</p>
      </div>
      <div className="col-start-4 row-start-1 sm:text-end">
        <p className="mt-7 text-body text-07 sm:mt-0 dark:text-05">
          {senderAddress?.street}
        </p>
        <p className="text-body text-07 dark:text-05">{senderAddress?.city}</p>
        <p className="text-body text-07 dark:text-05">
          {senderAddress?.postCode}
        </p>

        <p className="mb-7 text-body text-07 dark:text-05">
          {senderAddress?.country}
        </p>
      </div>
      <div className="col-span-2 col-start-1 row-span-2 row-start-2 flex">
        <div className="w-[100%]">
          <div>
            <p className="mb-2 text-body text-07 dark:text-05">Invoice Date</p>
            <p className="text-headingS font-bold text-08 dark:text-white">
              {dateToString(createdAt as Date)}
            </p>
          </div>
          <div>
            <p className="mb-2 mt-6 text-body text-07 dark:text-05">
              Payment Due
            </p>
            <p className="text-headingS font-bold text-08 dark:text-white">
              {paymentDue ? dateToString(paymentDue) : ""}
            </p>
          </div>
        </div>
        <div className="w-[100%]">
          <p className="mb-2 text-body text-07 dark:text-05">Bill To</p>
          <p className="text-headingS font-bold text-08 dark:text-white">
            {clientName}
          </p>
          <p className="mt-2 text-body text-07 dark:text-05">
            {clientAddress?.street}
          </p>
          <p className="text-body text-07 dark:text-05">
            {clientAddress?.city}
          </p>
          <p className="text-body text-07 dark:text-05">
            {clientAddress?.postCode}
          </p>
          <p className="mb-7 text-body text-07 dark:text-05">
            {clientAddress?.country}
          </p>
        </div>
      </div>
      <div className="sm:col-start-3 sm:row-span-2 sm:row-start-2">
        <p className="mb-2 text-body text-07 dark:text-05">Sent to</p>
        <p className="mb-6 text-headingS font-bold text-08 dark:text-white">
          {clientEmail}
        </p>
      </div>
      <PreviewSummary items={items ? items : []} total={total!} />
    </div>
  );
}
