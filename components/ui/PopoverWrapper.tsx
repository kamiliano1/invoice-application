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
        <span className="flex cursor-pointer items-center text-headingS text-08 dark:text-white">
          {buttonTriggerMobile}{" "}
          {buttonTriggerDesktop && (
            <span className="ml-1 hidden sm:block">{buttonTriggerDesktop}</span>
          )}
          <MdKeyboardArrowDown
            className={cn("ml-2 mr-5 text-01 duration-300", {
              "rotate-180": isPopoverOpen,
            })}
          />
        </span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={cn(
            "z-50 flex h-[128px] w-[192px] items-center rounded-lg bg-white px-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade dark:bg-04",
            className,
          )}
          sideOffset={5}
        >
          {children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
