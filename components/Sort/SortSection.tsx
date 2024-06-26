import { SortTypes } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { MdOutlineClear } from "react-icons/md";
import SortElement from "@/components/Sort/SortElement";

export default function SortSection({
  actualSortStatus,
  setActualSortStatus,
}: {
  actualSortStatus: SortTypes;
  setActualSortStatus: Dispatch<SetStateAction<SortTypes>>;
}) {
  return (
    <div className="w-full py-3 px-6 grid grid-rows-[repeat(3,min-content)] grid-cols-[max-content,_max-content] gap-x-[3rem] sm:gap-0 sm:grid-rows-1 sm:grid-cols-[repeat(4,_minmax(0,_1fr))_104px_min-content] items-center rounded-lg justify-between border-[1px] border-transparent bg-white dark:bg-03 text-body">
      <SortElement
        className="row-start-1 col-start-1 mb-4 sm:mb-0"
        label="Invoice Id"
        actualSortStatus={actualSortStatus}
        setActualSortStatus={setActualSortStatus}
      />
      <SortElement
        className="row-start-2 col-start-1 sm:row-start-1 sm:col-start-2 mb-1 sm:mb-0"
        label="Payment Due"
        actualSortStatus={actualSortStatus}
        setActualSortStatus={setActualSortStatus}
      />
      <SortElement
        className="row-start-1 col-start-2 sm:col-start-3 text-end sm:text-start self-start sm:self-auto"
        label="Name"
        actualSortStatus={actualSortStatus}
        setActualSortStatus={setActualSortStatus}
      />
      <SortElement
        className="row-start-3 col-start-1 sm:row-start-1 sm:col-start-4"
        label="Price"
        actualSortStatus={actualSortStatus}
        setActualSortStatus={setActualSortStatus}
      />
      <SortElement
        className="w-[104px]"
        label="Status"
        actualSortStatus={actualSortStatus}
        setActualSortStatus={setActualSortStatus}
      />
      <MdOutlineClear
        onClick={() => {
          setActualSortStatus({ label: "", status: "" });
        }}
        className="cursor-pointer hidden text-headingSVariant sm:block text-01 hover:text-0 sm:justify-self-end sm:ml-5"
      />
    </div>
  );
}
