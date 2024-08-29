"use client";
import { MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { dateToString } from "@/lib/utils";
import { z } from "zod";
import { PreviewInvoiceSchema } from "@/schemas";
import InvoiceListStatus from "./InvoiceListStatus";

export default function InvoiceItem({
  invoiceId,
  clientName,
  paymentDue,
  status,
  total,
  id,
}: z.infer<typeof PreviewInvoiceSchema>) {
  return (
    <Link
      href={`${id}/preview`}
      className="grid w-full grid-cols-[max-content,_max-content] grid-rows-[repeat(3,min-content)] items-center justify-between gap-x-[3rem] rounded-lg border-[1px] border-transparent bg-white p-6 hover:border-01 sm:grid-cols-[repeat(4,_minmax(0,_1fr))_104px_min-content] sm:grid-rows-1 sm:gap-0 dark:bg-03"
    >
      <h2 className="col-start-1 row-start-1 mb-4 text-headingS text-07 sm:mb-0">
        #<span className="font-bold text-08 dark:text-white">{invoiceId}</span>
      </h2>
      <p className="col-start-1 row-start-2 mb-1 text-body text-07 sm:col-start-2 sm:row-start-1 sm:mb-0 dark:text-05">
        Due {dateToString(paymentDue)}
      </p>
      <p className="col-start-2 row-start-1 self-start text-end text-body text-[#858BB2] sm:col-start-3 sm:self-auto sm:text-start dark:text-white">
        {clientName}
      </p>
      <p className="col-start-1 row-start-3 text-headingS text-08 sm:col-start-4 sm:row-start-1 dark:text-white">
        £ {total.toFixed(2)}
      </p>
      <InvoiceListStatus status={status} />
      <MdKeyboardArrowRight className="hidden text-01 sm:ml-5 sm:block sm:justify-self-end" />
    </Link>
  );
}
