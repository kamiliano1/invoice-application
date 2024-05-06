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
  return (
    <>
      {/* <div className="rounded-lg sm:row-start-4 sm:col-start-1 sm:col-span-4 bg-[#F9FEFB] dark:bg-04">
        <div className="hidden sm:flex sm:px-8 pt-4 gap-16">
          <p className="w-[90%] text-body text-07 dark:text-05">Item Name</p>
          <p className="w-[20%] text-end text-body text-07 dark:text-05">
            QTY.
          </p>
          <p className="w-[40%] text-end text-body text-07 dark:text-05">
            Price
          </p>
          <p className="w-[30%] text-end text-body text-07 dark:text-05">
            Total
          </p>
        </div>
        {items.map((item) => (
          <PreviewSummaryItem key={item.name} items={item} />
        ))}
        <div className="p-6 sm:px-8 flex justify-between items-center rounded-b-lg bg-[#373B53] dark:bg-08">
          <p className="text-body text-white">Amount Due</p>
          <p className="text-white text-headingM">£ {total.toFixed(2)}</p>
        </div>
      </div> */}
      <table className="rounded-lg sm:row-start-4 sm:col-start-1 sm:col-span-4 bg-[#F9FEFB] dark:bg-04">
        {/* <thead className="hidden sm:table-row-group">
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
        </thead> */}
        <tbody className="p-5">
          {items.map((item) => (
            <PreviewSummaryItem key={item.name} items={item} />
          ))}
        </tbody>
        <tfoot className="items-center rounded-b-lg bg-[#373B53] dark:bg-08">
          <tr className="">
            <th
              colSpan={windowWidth > 640 ? 2 : 1}
              className="text-start text-body text-white p-6 sm:px-8"
            >
              Amount Due
            </th>
            <th
              colSpan={windowWidth > 640 ? 2 : 1}
              className="text-white text-end text-headingM p-6 sm:px-8"
            >
              £ {total.toFixed(2)}
            </th>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

function PreviewSummaryItem({ items }: PreviewSummaryItemType) {
  const { name, quantity, price, total } = items;
  return (
    <>
      <tr className="first:rounded-t-lg bg-[#F9FEFB] dark:bg-04">
        {/* <td className="font-bold text-headingS text-08 dark:text-white py-3 p-6 sm:px-8">
        {" "}
        {name}
      </td>
      <td className="font-bold text-headingS text-07 dark:text-05 py-3 text-end">
        {" "}
        {quantity}
      </td>
      <td className="font-bold text-headingS text-07 dark:text-05 py-3 text-end">
        {" "}
        £{price.toFixed(2)}
      </td>
      <td className="font-bold text-headingS col-start-2 text-08 dark:text-white py-3 p-6 sm:px-8 text-end">
        {" "}
        £ {total.toFixed(2)}
      </td> */}
        <td className="font-bold text-headingS text-08 dark:text-white px-6">
          {" "}
          {name}
        </td>

        <td
          rowSpan={2}
          className="font-bold text-headingS text-07 dark:text-06"
        >
          £ {total.toFixed(2)}
        </td>
      </tr>
      <tr className="">
        <td className="font-bold text-headingS text-07 dark:text-06 px-6 ">
          {quantity} x £ {price}
        </td>
      </tr>
    </>
  );
}
