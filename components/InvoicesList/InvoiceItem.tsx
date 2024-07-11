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
      className="w-full p-6 grid grid-rows-[repeat(3,min-content)] grid-cols-[max-content,_max-content] gap-x-[3rem] sm:gap-0 sm:grid-rows-1 sm:grid-cols-[repeat(4,_minmax(0,_1fr))_104px_min-content] items-center rounded-lg justify-between border-[1px] border-transparent hover:border-01 bg-white dark:bg-03"
    >
      <h2 className="text-07 row-start-1 col-start-1 mb-4 sm:mb-0 text-headingS">
        #<span className="font-bold text-08 dark:text-white">{invoiceId}</span>
      </h2>
      <p className="row-start-2 col-start-1 sm:row-start-1 sm:col-start-2 text-body mb-1 sm:mb-0 text-07 dark:text-05">
        Due {dateToString(paymentDue)}
      </p>
      <p className="row-start-1 col-start-2 sm:col-start-3 text-body text-end sm:text-start self-start sm:self-auto text-[#858BB2] dark:text-white">
        {clientName}
      </p>
      <p className="row-start-3 col-start-1 sm:row-start-1 sm:col-start-4 text-headingS text-08 dark:text-white">
        £ {total.toFixed(2)}
      </p>
      <InvoiceListStatus status={status} />
      <MdKeyboardArrowRight className="hidden sm:block text-01 sm:justify-self-end sm:ml-5" />
    </Link>
  );
}
