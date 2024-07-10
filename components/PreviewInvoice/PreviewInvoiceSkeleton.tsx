import { Skeleton } from "@/components/ui/skeleton";

export default function PreviewInvoiceSkeleton() {
  return (
    <div className="p-6 flex flex-col rounded-lg mt-6 sm:grid sm:grid-cols-[repeat(3,_minmax(0,_1fr)),max-content] bg-white dark:bg-03">
      <div className="sm:row-start-1 sm:col-start-1 space-y-2 mb-4">
        <Skeleton className="w-[100px] h-[24px]" />
        <Skeleton className="w-[100px] h-[18px]" />
      </div>
      <div className="row-start-1 col-start-4 sm:text-end space-y-1 h-[100px]">
        <Skeleton className="w-[100px] h-[18px]" />
        <Skeleton className="w-[100px] h-[18px]" />
        <Skeleton className="w-[100px] h-[18px]" />
        <Skeleton className="w-[100px] h-[18px]" />
      </div>
      <div className="flex col-start-1 col-span-2 row-start-2 row-span-2">
        <div className="w-[100%]">
          <div className="space-y-1">
            <p className="text-body mb-2 text-07 dark:text-05 ">Invoice Date</p>
            <Skeleton className="w-[100px] h-[18px]" />
            <p className="text-body mb-2 pt-[26px] text-07 dark:text-05">
              Payment Due
            </p>
            <Skeleton className="w-[100px] h-[18px]" />
          </div>
        </div>
        <div className="w-[100%] space-y-1 pl-1.5">
          <p className="text-body mb-2 text-07 dark:text-05">Bill To</p>
          <Skeleton className="w-[100px] h-[18px]" />
          <Skeleton className="w-[100px] h-[18px]" />
          <Skeleton className="w-[100px] h-[18px]" />
          <Skeleton className="w-[100px] h-[18px]" />
          <Skeleton className="w-[100px] h-[18px]" />
        </div>
      </div>
      <div className="sm:row-start-2 sm:col-start-3 sm:row-span-2 space-y-1 pl-[9.5px]">
        <p className="text-body mb-2 text-07 dark:text-05">Sent to</p>
        <Skeleton className="w-[100px] h-[18px]" />
      </div>
      <div className="sm:row-start-4 sm:col-start-1 sm:col-span-4 rounded-lg bg-[#F9FEFB] dark:bg-04 mt-[26px]">
        <table className="w-full">
          <thead className="hidden sm:table-row-group">
            <tr>
              <th className="text-body text-07 dark:text-05 py-3 text-start p-6 sm:px-8">
                Item Name
              </th>
              <th className="text-body text-07 dark:text-05 py-3 w-[66px] text-start">
                {" "}
                QTY.
              </th>
              <th className="text-body text-07 dark:text-05 py-3 text-end">
                {" "}
                Price
              </th>
              <th className="text-body text-07 dark:text-05 py-3 text-end p-6 sm:px-8">
                {" "}
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4}>
                <Skeleton className="h-[65px] sm:h-8 mx-6 mt-4 sm:my-1" />
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <Skeleton className="h-[65px] sm:h-8 mx-6 my-1 mb-4" />
              </td>
            </tr>
          </tbody>
          <tfoot className="items-center bg-[#373B53] dark:bg-08 sm:hidden">
            <tr>
              <th
                colSpan={1}
                className="text-start text-body text-white p-6 pr-0 sm:px-8 rounded-bl-lg w-[100px]"
              >
                Amount Due
              </th>
              <th
                colSpan={1}
                className="text-white text-end text-headingM p-6 pl-0 sm:px-8 rounded-br-lg"
              >
                <Skeleton className="h-8 my-1 w-full max-w-[180px] ml-auto" />
              </th>
            </tr>
          </tfoot>
          <tfoot className="hidden items-center bg-[#373B53] dark:bg-08 sm:table-row-group h-[70px]">
            <tr>
              <th
                colSpan={2}
                className="text-start text-body text-white pr-0 sm:px-8  rounded-bl-lg"
              >
                Amount Due
              </th>
              <th
                colSpan={2}
                className="text-white text-end text-headingM  pl-0 sm:px-8 rounded-br-lg"
              >
                <Skeleton className="h-8 my-1" />
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
