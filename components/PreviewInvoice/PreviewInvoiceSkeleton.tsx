import { Skeleton } from "@/components/ui/skeleton";

export default function PreviewInvoiceSkeleton() {
  return (
    <div className="mt-6 flex flex-col rounded-lg bg-white p-6 sm:grid sm:grid-cols-[repeat(3,_minmax(0,_1fr)),max-content] dark:bg-03">
      <div className="mb-4 space-y-2 sm:col-start-1 sm:row-start-1">
        <Skeleton className="h-[24px] w-[100px]" />
        <Skeleton className="h-[18px] w-[100px]" />
      </div>
      <div className="col-start-4 row-start-1 h-[100px] space-y-1 sm:text-end">
        <Skeleton className="h-[18px] w-[100px]" />
        <Skeleton className="h-[18px] w-[100px]" />
        <Skeleton className="h-[18px] w-[100px]" />
        <Skeleton className="h-[18px] w-[100px]" />
      </div>
      <div className="col-span-2 col-start-1 row-span-2 row-start-2 flex">
        <div className="w-[100%]">
          <div className="space-y-1">
            <p className="mb-2 text-body text-07 dark:text-05">Invoice Date</p>
            <Skeleton className="h-[18px] w-[100px]" />
            <p className="mb-2 pt-[26px] text-body text-07 dark:text-05">
              Payment Due
            </p>
            <Skeleton className="h-[18px] w-[100px]" />
          </div>
        </div>
        <div className="w-[100%] space-y-1 pl-1.5">
          <p className="mb-2 text-body text-07 dark:text-05">Bill To</p>
          <Skeleton className="h-[18px] w-[100px]" />
          <Skeleton className="h-[18px] w-[100px]" />
          <Skeleton className="h-[18px] w-[100px]" />
          <Skeleton className="h-[18px] w-[100px]" />
          <Skeleton className="h-[18px] w-[100px]" />
        </div>
      </div>
      <div className="space-y-1 pl-[9.5px] sm:col-start-3 sm:row-span-2 sm:row-start-2">
        <p className="mb-2 text-body text-07 dark:text-05">Sent to</p>
        <Skeleton className="h-[18px] w-[100px]" />
      </div>
      <div className="mt-[26px] rounded-lg bg-[#F9FEFB] sm:col-span-4 sm:col-start-1 sm:row-start-4 dark:bg-04">
        <table className="w-full">
          <thead className="hidden sm:table-row-group">
            <tr>
              <th className="p-6 py-3 text-start text-body text-07 sm:px-8 dark:text-05">
                Item Name
              </th>
              <th className="w-[66px] py-3 text-start text-body text-07 dark:text-05">
                {" "}
                QTY.
              </th>
              <th className="py-3 text-end text-body text-07 dark:text-05">
                {" "}
                Price
              </th>
              <th className="p-6 py-3 text-end text-body text-07 sm:px-8 dark:text-05">
                {" "}
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4}>
                <Skeleton className="mx-6 mt-4 h-[65px] sm:my-1 sm:h-8" />
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <Skeleton className="mx-6 my-1 mb-4 h-[65px] sm:h-8" />
              </td>
            </tr>
          </tbody>
          <tfoot className="items-center bg-[#373B53] sm:hidden dark:bg-08">
            <tr>
              <th
                colSpan={1}
                className="w-[100px] rounded-bl-lg p-6 pr-0 text-start text-body text-white sm:px-8"
              >
                Amount Due
              </th>
              <th
                colSpan={1}
                className="rounded-br-lg p-6 pl-0 text-end text-headingM text-white sm:px-8"
              >
                <Skeleton className="my-1 ml-auto h-8 w-full max-w-[180px]" />
              </th>
            </tr>
          </tfoot>
          <tfoot className="hidden h-[70px] items-center bg-[#373B53] sm:table-row-group dark:bg-08">
            <tr>
              <th
                colSpan={2}
                className="rounded-bl-lg pr-0 text-start text-body text-white sm:px-8"
              >
                Amount Due
              </th>
              <th
                colSpan={2}
                className="rounded-br-lg pl-0 text-end text-headingM text-white sm:px-8"
              >
                <Skeleton className="my-1 h-8" />
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
