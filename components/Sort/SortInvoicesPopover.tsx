"use client";
import { Dispatch, SetStateAction } from "react";
import SortElement from "@/components/Sort/SortElement";
import { SortTypes } from "@/types";
import PopoverWrapper from "@/components/ui/PopoverWrapper";
export default function SortInvoicesPopover({
  actualSortStatus,
  setActualSortStatus,
}: {
  actualSortStatus: SortTypes;
  setActualSortStatus: Dispatch<SetStateAction<SortTypes>>;
}) {
  return (
    <>
      <PopoverWrapper
        buttonTriggerMobile="Sort invoices"
        className="w-[200px] h-[240px] ml-6"
      >
        <div className="flex flex-col gap-3 w-full divide-y">
          <SortElement
            label="Invoice Id"
            actualSortStatus={actualSortStatus}
            setActualSortStatus={setActualSortStatus}
          />
          <SortElement
            className="pt-3"
            label="Payment Due"
            actualSortStatus={actualSortStatus}
            setActualSortStatus={setActualSortStatus}
          />
          <SortElement
            label="Name"
            className="pt-3"
            actualSortStatus={actualSortStatus}
            setActualSortStatus={setActualSortStatus}
          />
          <SortElement
            label="Price"
            className="pt-3"
            actualSortStatus={actualSortStatus}
            setActualSortStatus={setActualSortStatus}
          />
          <SortElement
            label="Status"
            className="pt-3"
            actualSortStatus={actualSortStatus}
            setActualSortStatus={setActualSortStatus}
          />
        </div>
      </PopoverWrapper>
    </>
  );
}
