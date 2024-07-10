import { dateToString } from "@/lib/utils";
import PreviewSummary from "@/components/PreviewInvoice/PreviewSummary";
import { getUserActiveInvoiceByInvoiceId } from "@/data/invoices";
import Nowy from "./Nowy";

export default async function InvoiceDetails({ id }: { id: string }) {
  const invoiceData = await getUserActiveInvoiceByInvoiceId(id);
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
    <Nowy invoiceData={invoiceData} />
    // <div className="p-6 flex flex-col rounded-lg mt-6 sm:grid sm:grid-cols-[repeat(3,_minmax(0,_1fr)),max-content] bg-white dark:bg-03">
    //   <div className="sm:row-start-1 sm:col-start-1">
    //     <p className="text-headingS sm:mb-2 text-08 dark:text-white">
    //       <span className="text-07">#</span>
    //       {invoiceId}
    //     </p>
    //     <p className="text-body text-07 dark:text-05">{description}</p>
    //   </div>
    //   <div className="row-start-1 col-start-4 sm:text-end">
    //     <p className="text-body mt-7 sm:mt-0 text-07 dark:text-05">
    //       {senderAddress?.street}
    //     </p>
    //     <p className="text-body text-07 dark:text-05">{senderAddress?.city}</p>
    //     <p className="text-body text-07 dark:text-05">
    //       {senderAddress?.postCode}
    //     </p>

    //     <p className="text-body mb-7 text-07 dark:text-05">
    //       {senderAddress?.country}
    //     </p>
    //   </div>
    //   <div className="flex col-start-1 col-span-2 row-start-2 row-span-2">
    //     <div className="w-[100%]">
    //       <div>
    //         <p className="text-body mb-2 text-07 dark:text-05 ">Invoice Date</p>
    //         <p className="font-bold text-headingS dark:text-white text-08">
    //           {dateToString(createdAt as Date)}
    //         </p>
    //       </div>
    //       <div>
    //         <p className="text-body mb-2 mt-6 text-07 dark:text-05">
    //           Payment Due
    //         </p>
    //         <p className="font-bold text-headingS text-08 dark:text-white">
    //           {paymentDue ? dateToString(paymentDue) : ""}
    //         </p>
    //       </div>
    //     </div>
    //     <div className="w-[100%]">
    //       <p className="text-body mb-2 text-07 dark:text-05">Bill To</p>
    //       <p className="font-bold text-headingS text-08 dark:text-white">
    //         {clientName}
    //       </p>
    //       <p className="text-body mt-2 text-07 dark:text-05">
    //         {clientAddress?.street}
    //       </p>
    //       <p className="text-body text-07 dark:text-05">
    //         {clientAddress?.city}
    //       </p>
    //       <p className="text-body text-07 dark:text-05">
    //         {clientAddress?.postCode}
    //       </p>
    //       <p className="text-body mb-7 text-07 dark:text-05">
    //         {clientAddress?.country}
    //       </p>
    //     </div>
    //   </div>
    //   <div className="sm:row-start-2 sm:col-start-3 sm:row-span-2">
    //     <p className="text-body mb-2 text-07 dark:text-05">Sent to</p>
    //     <p className="font-bold text-headingS mb-6 text-08 dark:text-white">
    //       {clientEmail}
    //     </p>
    //   </div>
    //   <PreviewSummary items={items ? items : []} total={total!} />
    // </div>
  );
}
