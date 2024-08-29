import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { IoIosArrowDown } from "react-icons/io";
export default function CollapsibleContentWrapper({
  buttonTriggerLabel,
  children,
}: {
  buttonTriggerLabel: string;
  children: React.ReactNode;
}) {
  return (
    <Collapsible className="group">
      <CollapsibleTrigger className="flex w-full justify-between">
        <h3 className="mb-4 text-headingS text-08 dark:text-white">
          {buttonTriggerLabel}
        </h3>
        <IoIosArrowDown className="text-01 duration-300 group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="CollapsibleContent">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
