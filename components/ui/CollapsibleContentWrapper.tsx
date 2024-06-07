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
      <CollapsibleTrigger className="flex justify-between w-full">
        <h3 className="text-headingS text-08 dark:text-white mb-4">
          {buttonTriggerLabel}
        </h3>
        <IoIosArrowDown className="text-01 group-data-[state=open]:rotate-180 duration-300" />
      </CollapsibleTrigger>
      <CollapsibleContent className="CollapsibleContent">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
