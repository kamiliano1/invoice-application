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
    <label className="peer flex cursor-pointer items-center" htmlFor={label}>
      <Checkbox
        id={label}
        onCheckedChange={toggleCheckbox}
        checked={
          userFilterState.filters.filter((item) => item === label).length
            ? true
            : false
        }
      />
      <p className="ml-3 text-headingS text-08 first-letter:uppercase dark:text-white">
        {label}
      </p>
    </label>
  );
}
