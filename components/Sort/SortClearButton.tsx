"use client";
import { userFilters } from "@/atoms/activeFilterAtom";
import useWindowWith from "@/hooks/useWindowWidth";
import { MdOutlineClear } from "react-icons/md";
import { useRecoilState } from "recoil";
export default function SortClearButton() {
  const [userFilterState, setUserFilterState] = useRecoilState(userFilters);
  const windowWidth = useWindowWith();
  if (windowWidth < 640)
    return (
      <span
        onClick={() => {
          setUserFilterState((prev) => ({
            ...prev,
            label: "",
            status: "",
            filters: ["draft", "paid", "pending"],
          }));
        }}
        className="flex cursor-pointer items-center text-headingS text-08 dark:text-white"
      >
        Clear
        <MdOutlineClear className="ml-5 cursor-pointer text-headingSVariant text-01" />
      </span>
    );
  return (
    <MdOutlineClear
      onClick={() => {
        setUserFilterState((prev) => ({
          ...prev,
          label: "",
          status: "",
          filters: ["draft", "paid", "pending"],
        }));
      }}
      className="hover:text-0 hidden cursor-pointer text-headingSVariant text-01 sm:ml-5 sm:block sm:justify-self-end"
    />
  );
}
