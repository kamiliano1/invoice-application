import { PreviewSummaryItemType, PreviewSummaryType } from "@/types";

export default function PreviewSummary({ items, total }: PreviewSummaryType) {
  if (!items || !total) return undefined;
  return (
    <div className="rounded-lg bg-[#F9FEFB] sm:col-span-4 sm:col-start-1 sm:row-start-4 dark:bg-04">
      <table className="w-full">
        <thead className="hidden sm:table-row-group">
          <tr>
            <th className="p-6 py-3 text-start text-body text-07 sm:px-8 dark:text-05">
              Item Name
            </th>
            <th className="py-3 text-end text-body text-07 dark:text-05">
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
          {items.map((item, id) => (
            <PreviewSummaryItem key={id} items={item} />
          ))}
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
              £ {total.toFixed(2)}
            </th>
          </tr>
        </tfoot>
        <tfoot className="hidden items-center bg-[#373B53] sm:table-row-group dark:bg-08">
          <tr>
            <th
              colSpan={2}
              className="rounded-bl-lg p-6 pr-0 text-start text-body text-white sm:px-8"
            >
              Amount Due
            </th>
            <th
              colSpan={2}
              className="rounded-br-lg p-6 pl-0 text-end text-headingM text-white sm:px-8"
            >
              £ {total.toFixed(2)}
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

function PreviewSummaryItem({ items }: PreviewSummaryItemType) {
  const { name, quantity, price, total } = items;
  return (
    <>
      <tr className="first:rounded-t-lg">
        <td className="pl-6 pt-3 text-headingS font-bold text-08 sm:px-8 sm:pt-0 dark:text-white">
          {" "}
          {name}
        </td>
        <td className="hidden py-3 text-end text-headingS font-bold text-07 sm:table-cell dark:text-05">
          {" "}
          {quantity}
        </td>
        <td className="hidden py-3 text-end text-headingS font-bold text-07 sm:table-cell dark:text-05">
          {" "}
          £{price.toFixed(2)}
        </td>
        <td className="col-start-2 hidden py-3 text-end text-headingS font-bold text-08 sm:table-cell sm:px-8 dark:text-white">
          {" "}
          £ {total.toFixed(2)}
        </td>

        <td
          rowSpan={2}
          className="pl-0 pr-6 text-end text-headingS font-bold text-07 sm:hidden dark:text-06"
        >
          £ {total.toFixed(2)}
        </td>
      </tr>
      <tr className="">
        <td className="h-[30px] pl-6 text-headingS font-bold text-07 sm:hidden dark:text-06">
          {quantity} x £ {price.toFixed(2)}
        </td>
      </tr>
    </>
  );
}
