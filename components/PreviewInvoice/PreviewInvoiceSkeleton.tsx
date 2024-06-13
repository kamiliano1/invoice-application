import useWindowWith from "@/hooks/useWindowWidth";
import { Skeleton } from "@/components/ui/skeleton";

export default function PreviewInvoiceSkeleton() {
  const windowWidth = useWindowWith();
  return (
    <div className="max-w-[778px] mx-auto w-full">
      <div className="p-6 sm:px-10">
        <div className="pb-8 pt-6">
          <Skeleton className="pt-6 w-[100px]" />
        </div>
        <div className="p-6 flex items-center justify-between sm:justify-normal rounded-lg bg-white dark:bg-03">
          <p className="text-body sm:mr-4 text-[#858BB2] dark:text-05">
            Status
          </p>
          <Skeleton className="w-[104px] h-10" />
          <div className="justify-between hidden sm:flex sm:ml-auto gap-3">
            <Skeleton className="w-[75px] h-12 rounded-3xl " />
            <Skeleton className="w-[91px] h-12 rounded-3xl " />
            <Skeleton className="w-[131px] h-12 rounded-3xl " />
          </div>
        </div>
        <div className="p-6 flex flex-col rounded-lg mt-6 sm:grid sm:grid-cols-[repeat(3,_minmax(0,_1fr)),max-content] ssm:grid-cols-[193px,min-content,_min-content,_max-content] bg-white dark:bg-03">
          <div className="sm:row-start-1 sm:col-start-1 space-y-1 mb-4">
            <Skeleton className="w-[100px] h-[18px]" />
            <Skeleton className="w-[100px] h-[18px]" />
          </div>
          <div className="row-start-1 col-start-4 sm:text-end space-y-1 mb-4">
            <Skeleton className="w-[100px] h-[18px]" />
            <Skeleton className="w-[100px] h-[18px]" />
            <Skeleton className="w-[100px] h-[18px]" />
            <Skeleton className="w-[100px] h-[18px]" />
          </div>
          <div className="flex col-start-1 col-span-2 row-start-2 row-span-2">
            <div className="w-[100%]">
              <div className="space-y-1">
                <p className="text-body mb-2 text-07 dark:text-05 ">
                  Invoice Date
                </p>
                <Skeleton className="w-[100px] h-[18px]" />
                <p className="text-body mb-2 mt-6 text-07 dark:text-05">
                  Payment Due
                </p>
                <Skeleton className="w-[100px] h-[18px]" />
              </div>
            </div>
            <div className="w-[100%] space-y-1">
              <p className="text-body mb-2 text-07 dark:text-05">Bill To</p>
              <Skeleton className="w-[100px] h-[18px]" />
              <Skeleton className="w-[100px] h-[18px]" />
              <Skeleton className="w-[100px] h-[18px]" />
              <Skeleton className="w-[100px] h-[18px]" />
              <Skeleton className="w-[100px] h-[18px]" />
            </div>
          </div>
          <div className="sm:row-start-2 sm:col-start-3 sm:row-span-2 space-y-1">
            <p className="text-body mb-2 text-07 dark:text-05">Sent to</p>
            <Skeleton className="w-[100px] h-[18px]" />
          </div>
          <div className="sm:row-start-4 sm:col-start-1 sm:col-span-4 rounded-lg bg-[#F9FEFB] dark:bg-04 mt-7">
            <div className="sm:row-start-4 sm:col-start-1 sm:col-span-4 rounded-lg bg-[#F9FEFB] dark:bg-04">
              <table className="w-full">
                <thead className="hidden sm:table-row-group">
                  <tr>
                    <th className="text-body text-07 dark:text-05 py-3 text-start p-6 sm:px-8">
                      Item Name
                    </th>
                    <th className="text-body text-07 dark:text-05 py-3 text-end">
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
                      <Skeleton className="h-10 mx-6 mt-4 sm:my-1" />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4}>
                      <Skeleton className="h-10 mx-6 my-1" />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4}>
                      <Skeleton className="h-10 mx-6 my-1" />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4}>
                      <Skeleton className="h-10 mx-6 mb-4" />
                    </td>
                  </tr>
                </tbody>
                <tfoot className="items-center bg-[#373B53] dark:bg-08">
                  <tr>
                    <th
                      colSpan={windowWidth > 640 ? 2 : 1}
                      className="text-start text-body text-white p-6 pr-0 sm:px-8 rounded-bl-lg"
                    >
                      Amount Due
                    </th>
                    <th
                      colSpan={windowWidth > 640 ? 2 : 1}
                      className="text-white text-end text-headingM p-6 pl-0 sm:px-8 rounded-br-lg"
                    >
                      <Skeleton className="h-10 my-1" />
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 flex items-center justify-between sm:justify-normal sm:hidden gap-3 bg-white dark:bg-03">
        <Skeleton className="w-[33%] h-12 rounded-3xl " />
        <Skeleton className="w-[51%] h-12 rounded-3xl " />
        <Skeleton className="w-full h-12 rounded-3xl " />
      </div>
    </div>
  );
}
