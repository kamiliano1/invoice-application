import SortElement from "@/components/Sort/SortElement";
import SortInvoicesPopover from "@/components/Sort/SortInvoicesPopover";
import SortClearButton from "@/components/Sort/SortClearButton";

export default function SortSection() {
  return (
    <>
      <div className="hidden w-full items-center justify-between rounded-lg border-[1px] border-transparent bg-white px-6 py-3 text-body sm:grid sm:grid-cols-[repeat(4,_minmax(0,_1fr))_104px_min-content] sm:grid-rows-1 sm:gap-0 dark:bg-03">
        <SortElement label="Invoice Id" />
        <SortElement
          label="Payment Due"
          className="mb-1 sm:col-start-2 sm:row-start-1 sm:mb-0"
        />
        <SortElement
          label="Name"
          className="text-end sm:col-start-3 sm:self-auto sm:text-start"
        />
        <SortElement label="Price" className="sm:col-start-4 sm:row-start-1" />
        <SortElement label="Status" className="w-[104px]" />
        <SortClearButton />
      </div>
      <div className="flex items-center justify-between bg-white px-6 py-3 sm:hidden dark:bg-03">
        <SortInvoicesPopover />
        <SortClearButton />
      </div>
    </>
  );
}
