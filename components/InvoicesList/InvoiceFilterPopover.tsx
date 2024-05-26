"use client";
import { darkModeState } from "@/atoms/settingsAppAtom";
import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { FilterCheckbox } from "@/components/InvoicesList/CheckboxFilters";
export default function InvoiceFilterPopover() {
  const isDarkMode = useRecoilValue(darkModeState);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Popover.Root onOpenChange={(event) => setIsPopoverOpen(event)}>
      <Popover.Trigger asChild>
        <span className="flex items-center text-headingS cursor-pointer">
          Filter <span className="hidden sm:block ml-1">by status</span>
          <MdKeyboardArrowDown
            className={clsx("ml-2 mr-5 duration-300 text-01", {
              "rotate-180": isPopoverOpen,
            })}
          />
        </span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={clsx(
            "z-50 rounded-lg px-5 w-[192px] h-[128px] flex items-center shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade",
            {
              "bg-04 dark": isDarkMode,
              "bg-white": !isDarkMode,
            }
          )}
          sideOffset={5}
        >
          <div className="flex flex-col gap-4">
            <FilterCheckbox label="draft" />
            <FilterCheckbox label="paid" />
            <FilterCheckbox label="pending" />
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
