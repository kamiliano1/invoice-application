import { settingsAppState } from "@/atoms/settingsAppAtom";
import { Checkbox } from "@/components/ui/checkbox";
import { useRecoilState } from "recoil";
type FilterType = "draft" | "pending" | "paid";
export function FilterCheckbox({ label }: { label: FilterType }) {
  const [settingsState, setSettingsState] = useRecoilState(settingsAppState);
  const toggleCheckbox = () => {
    if (settingsState.filtersArray.find((item) => item === label)) {
      setSettingsState((prev) => ({
        ...prev,
        filtersArray: prev.filtersArray.filter((item) => item !== label),
      }));
      return;
    }
    setSettingsState((prev) => ({
      ...prev,
      filtersArray: [...prev.filtersArray, label],
    }));
  };
  return (
    <label className="flex items-center cursor-pointer peer" htmlFor={label}>
      <Checkbox
        id={label}
        onCheckedChange={toggleCheckbox}
        checked={
          settingsState.filtersArray.filter((item) => item === label).length
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
