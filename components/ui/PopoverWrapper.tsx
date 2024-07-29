"use client";
import { cn } from "@/lib/utils";
import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
export default function PopoverWrapper({
  buttonTriggerMobile,
  buttonTriggerDesktop,
  className,
  children,
}: {
  buttonTriggerMobile: string;
  buttonTriggerDesktop?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <Popover.Root onOpenChange={(event) => setIsPopoverOpen(event)}>
      <Popover.Trigger asChild>
        <span className="flex items-center text-headingS cursor-pointer text-08 dark:text-white">
          {buttonTriggerMobile}{" "}
          {buttonTriggerDesktop && (
            <span className="hidden sm:block ml-1">{buttonTriggerDesktop}</span>
          )}
          <MdKeyboardArrowDown
            className={cn("ml-2 mr-5 duration-300 text-01", {
              "rotate-180": isPopoverOpen,
            })}
          />
        </span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={cn(
            "z-50 rounded-lg px-5 w-[192px] h-[128px] flex items-center shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade bg-white dark:bg-04",
            className
          )}
          sideOffset={5}
        >
          {children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
