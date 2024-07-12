import { FilterCheckbox } from "@/components/InvoicesList/CheckboxFilters";
import PopoverWrapper from "@/components/ui/PopoverWrapper";
export default function InvoiceFilterPopover() {
  return (
    <PopoverWrapper
      buttonTriggerMobile="Filter"
      buttonTriggerDesktop="by status"
    >
      <div className="flex flex-col gap-4">
        <FilterCheckbox label="draft" />
        <FilterCheckbox label="paid" />
        <FilterCheckbox label="pending" />
      </div>
    </PopoverWrapper>
  );
}
