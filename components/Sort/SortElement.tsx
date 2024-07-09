"use client";
import { cn } from "@/lib/utils";
import { SortLabelTypes } from "@/types";
import SortIcon from "@/components/Sort/SortIcon";
import { userFilters } from "@/atoms/settingsAppAtom";
import { useRecoilState } from "recoil";

export default function SortElement({
  className,
  label,
}: {
  className?: string;
  label: SortLabelTypes;
}) {
  const [userFilterState, setUserFilterState] = useRecoilState(userFilters);
  const sortInvoices = () => {
    if (userFilterState.label === label) {
      if (userFilterState.status === "asc") {
        setUserFilterState((prev) => ({ ...prev, status: "desc" }));
        return;
      }
      if (userFilterState.status === "desc") {
        setUserFilterState((prev) => ({ ...prev, status: "" }));
        return;
      }
      if (userFilterState.status === "") {
        setUserFilterState((prev) => ({ ...prev, status: "asc" }));
        return;
      }
    }
    setUserFilterState((prev) => ({ ...prev, label: label, status: "asc" }));
  };

  return (
    <p
      className={cn(
        "cursor-pointer select-none hover:text-opacity-70 flex items-center text-08 dark:text-white justify-between w-full sm:justify-start",
        className,
        {
          "text-01 dark:text-01":
            userFilterState.label === label && userFilterState.status !== "",
        }
      )}
      onClick={sortInvoices}
    >
      {label}
      <SortIcon label={label} sortStatus={userFilterState} />
    </p>
  );
}
