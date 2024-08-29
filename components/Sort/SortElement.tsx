"use client";
import { cn } from "@/lib/utils";
import { SortLabelTypes } from "@/types";
import SortIcon from "@/components/Sort/SortIcon";
import { useRecoilState } from "recoil";
import { userFilters } from "@/atoms/activeFilterAtom";

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
        "flex w-full cursor-pointer select-none items-center justify-between text-08 hover:text-opacity-70 sm:justify-start dark:text-white",
        className,
        {
          "text-01 dark:text-01":
            userFilterState.label === label && userFilterState.status !== "",
        },
      )}
      onClick={sortInvoices}
    >
      {label}
      <SortIcon label={label} sortStatus={userFilterState} />
    </p>
  );
}
