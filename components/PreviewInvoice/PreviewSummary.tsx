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
  return (
    <div className="rounded-lg sm:row-start-4 sm:col-start-1 sm:col-span-4 bg-[#F9FEFB] dark:bg-04">
      <div className="hidden sm:flex sm:px-8 pt-4 gap-16">
        <p className="w-[90%] text-body text-07 dark:text-05">Item Name</p>
        <p className="w-[20%] text-end text-body text-07 dark:text-05">QTY.</p>
        <p className="w-[40%] text-end text-body text-07 dark:text-05">Price</p>
        <p className="w-[30%] text-end text-body text-07 dark:text-05">Total</p>
      </div>
      {items.map((item) => (
        <PreviewSummaryItem key={item.name} items={item} />
      ))}
      <div className="p-6 sm:px-8 flex justify-between items-center rounded-b-lg bg-[#373B53] dark:bg-08">
        <p className="text-body">Amount Due</p>
        <p className="text-white text-headingM">£ {total.toFixed(2)}</p>
      </div>
    </div>
  );
}

function PreviewSummaryItem({ items }: PreviewSummaryItemType) {
  const { name, quantity, price, total } = items;
  return (
    <div className="first:rounded-t-lg bg-[#F9FEFB] dark:bg-04">
      <div className="grid items-center p-4 sm:px-8 sm:py-3 sm:flex sm:gap-16">
        <p className="font-bold text-headingS sm:w-[90%] text-08 dark:text-white">
          {name}
        </p>
        <p className="font-bold text-headingS row-start-2 sm:hidden text-07 dark:text-06">
          {quantity} x £ {price}
        </p>
        <p className="font-bold text-headingS row-start-2 hidden sm:block w-[20%] text-07 dark:text-05">
          {quantity}
        </p>
        <p className="font-bold text-headingS row-start-2 hidden sm:block w-[40%]text-end text-07 dark:text-05">
          £{price.toFixed(2)}
        </p>
        <p className="font-bold text-headingS col-start-2 row-span-2 ml-auto sm:w-[30%] sm:text-end text-08 dark:text-white">
          £ {total.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
