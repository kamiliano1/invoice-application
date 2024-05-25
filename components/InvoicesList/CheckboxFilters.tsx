import { filterInvoices } from "@/actions/filterInvoices";
import { settingsAppState } from "@/atoms/settingsAppAtom";
import { Checkbox } from "@/components/ui/checkbox";
import useCurrentUser from "@/hooks/useCurrentUser";
import { StatusInvoiceType } from "@/schemas";
import { useRecoilState } from "recoil";
export function FilterCheckbox({ label }: { label: StatusInvoiceType }) {
  const userId = useCurrentUser();

  const [settingsState, setSettingsState] = useRecoilState(settingsAppState);
  const toggleCheckbox = async () => {
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
    filterInvoices(userId, settingsState.filtersArray);
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
