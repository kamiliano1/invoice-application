"use client";
import { userFilters } from "@/atoms/settingsAppAtom";
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
        className="flex items-center text-headingS cursor-pointer text-08 dark:text-white"
      >
        Clear
        <MdOutlineClear className="cursor-pointer text-headingSVariant text-01 ml-5" />
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
      className="cursor-pointer hidden text-headingSVariant sm:block text-01 hover:text-0 sm:justify-self-end sm:ml-5"
    />
  );
}
