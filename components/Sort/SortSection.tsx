import SortElement from "@/components/Sort/SortElement";
import SortInvoicesPopover from "@/components/Sort/SortInvoicesPopover";
import SortClearButton from "@/components/Sort/SortClearButton";

export default function SortSection() {
  return (
    <>
      <div className="w-full py-3 px-6 sm:grid sm:gap-0 sm:grid-rows-1 sm:grid-cols-[repeat(4,_minmax(0,_1fr))_104px_min-content] items-center rounded-lg justify-between border-[1px] border-transparent bg-white dark:bg-03 text-body hidden">
        <SortElement label="Invoice Id" />
        <SortElement
          label="Payment Due"
          className="sm:row-start-1 sm:col-start-2 mb-1 sm:mb-0"
        />
        <SortElement
          label="Name"
          className="sm:col-start-3 text-end sm:text-start sm:self-auto"
        />
        <SortElement label="Price" className="sm:row-start-1 sm:col-start-4" />
        <SortElement label="Status" className="w-[104px]" />
        <SortClearButton />
      </div>
      <div className="py-3 px-6 bg-white dark:bg-03 flex justify-between items-center sm:hidden">
        <SortInvoicesPopover />
        <SortClearButton />
      </div>
    </>
  );
}
