import SortElement from "@/components/Sort/SortElement";
import PopoverWrapper from "@/components/ui/PopoverWrapper";
export default function SortInvoicesPopover() {
  return (
    <PopoverWrapper
      buttonTriggerMobile="Sort invoices"
      className="ml-6 h-[240px] w-[200px]"
    >
      <div className="flex w-full flex-col gap-3 divide-y">
        <SortElement label="Invoice Id" />
        <SortElement label="Payment Due" className="pt-3" />
        <SortElement label="Name" className="pt-3" />
        <SortElement label="Price" className="pt-3" />
        <SortElement label="Status" className="pt-3" />
      </div>
    </PopoverWrapper>
  );
}
