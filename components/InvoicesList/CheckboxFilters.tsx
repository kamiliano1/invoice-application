"use client";
import { userFilters } from "@/atoms/activeFilterAtom";
import { Checkbox } from "@/components/ui/checkbox";
import { InvoiceStatus } from "@prisma/client";
import { useRecoilState } from "recoil";
export function FilterCheckbox({ label }: { label: InvoiceStatus }) {
  const [userFilterState, setUserFilterState] = useRecoilState(userFilters);
  const toggleCheckbox = async () => {
    if (userFilterState.filters.find((item) => item === label)) {
      setUserFilterState((prev) => ({
        ...prev,
        filters: prev.filters.filter((item) => item !== label),
      }));
      return;
    }
    setUserFilterState((prev) => ({
      ...prev,
      filters: [...prev.filters, label],
    }));
  };
  return (
    <label className="flex items-center cursor-pointer peer" htmlFor={label}>
      <Checkbox
        id={label}
        onCheckedChange={toggleCheckbox}
        checked={
          userFilterState.filters.filter((item) => item === label).length
            ? true
            : false
        }
      />
      <p className="text-headingS first-letter:uppercase text-08 dark:text-white ml-3">
        {label}
      </p>
    </label>
  );
}
