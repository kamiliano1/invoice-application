import SortElement from "@/components/Sort/SortElement";
import PopoverWrapper from "@/components/ui/PopoverWrapper";
export default function SortInvoicesPopover() {
  return (
    <>
      <PopoverWrapper
        buttonTriggerMobile="Sort invoices"
        className="w-[200px] h-[240px] ml-6"
      >
        <div className="flex flex-col gap-3 w-full divide-y">
          <SortElement label="Invoice Id" />
          <SortElement label="Payment Due" className="pt-3" />
          <SortElement label="Name" className="pt-3" />
          <SortElement label="Price" className="pt-3" />
          <SortElement label="Status" className="pt-3" />
        </div>
      </PopoverWrapper>
    </>
  );
}
