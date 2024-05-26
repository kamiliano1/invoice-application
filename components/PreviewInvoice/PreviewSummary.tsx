import useWindowWith from "@/hooks/useWindowWidth";

type PreviewSummaryItemType = {
  items: {
    name: string;
    quantity: number;
    price: number;
    total: number;
  };
};

type PreviewSummaryType = {
  total: number;
  items: {
    name: string;
    quantity: number;
    price: number;
    total: number;
  }[];
};

export default function PreviewSummary({ items, total }: PreviewSummaryType) {
  const windowWidth = useWindowWith();
  if (!items || !total) return undefined;
  return (
    <div className=" sm:row-start-4 sm:col-start-1 sm:col-span-4 rounded-lg bg-[#F9FEFB] dark:bg-04">
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
        <tbody className="">
          {items.map((item, id) => (
            <PreviewSummaryItem key={id} items={item} />
          ))}
        </tbody>
        <tfoot className="items-center  bg-[#373B53] dark:bg-08 ">
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
      <tr className="first:rounded-t-lg ">
        <td className="font-bold text-headingS text-08 dark:text-white pl-6 pt-3 sm:px-8 sm:pt-0 ">
          {" "}
          {name}
        </td>
        <td className="font-bold text-headingS text-07 dark:text-05 py-3 text-end hidden sm:table-cell">
          {" "}
          {quantity}
        </td>
        <td className="font-bold text-headingS text-07 dark:text-05 py-3 text-end hidden sm:table-cell">
          {" "}
          £{price.toFixed(2)}
        </td>
        <td className="font-bold text-headingS col-start-2 text-08 dark:text-white py-3 sm:px-8 text-end hidden sm:table-cell">
          {" "}
          £ {total.toFixed(2)}
        </td>

        <td
          rowSpan={2}
          className="font-bold text-headingS text-07 dark:text-06 text-end pr-6 pl-0 sm:hidden"
        >
          £ {total.toFixed(2)}
        </td>
      </tr>
      <tr className="">
        <td className="font-bold text-headingS text-07 dark:text-06 pl-6 h-[30px] sm:hidden">
          {quantity} x £ {price.toFixed(2)}
        </td>
      </tr>
    </>
  );
}
