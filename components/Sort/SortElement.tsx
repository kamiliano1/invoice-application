import { cn } from "@/lib/utils";
import { SortLabelTypes, SortTypes } from "@/types";
import { Dispatch, SetStateAction } from "react";
import SortIcon from "@/components/Sort/SortIcon";

export default function SortElement({
  className,
  label,
  actualSortStatus,
  setActualSortStatus,
}: {
  className: string;
  label: SortLabelTypes;
  actualSortStatus: SortTypes;
  setActualSortStatus: Dispatch<SetStateAction<SortTypes>>;
}) {
  const sortInvoices = () => {
    if (actualSortStatus.label === label) {
      if (actualSortStatus.status === "asc") {
        setActualSortStatus((prev) => ({ ...prev, status: "desc" }));
        return;
      }
      if (actualSortStatus.status === "desc") {
        setActualSortStatus((prev) => ({ ...prev, status: "" }));
        return;
      }
      if (actualSortStatus.status === "") {
        setActualSortStatus((prev) => ({ ...prev, status: "asc" }));
        return;
      }
    }
    setActualSortStatus({ label: label, status: "asc" });
  };
  return (
    <p
      className={cn(
        "cursor-pointer select-none hover:text-opacity-70 flex items-center text-08 dark:text-white",
        className,
        {
          "text-01 dark:text-01":
            actualSortStatus.label === label && actualSortStatus.status !== "",
        }
      )}
      onClick={sortInvoices}
    >
      {label}
      <SortIcon label={label} sortStatus={actualSortStatus} />
    </p>
  );
}
