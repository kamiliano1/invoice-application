import { SortLabelTypes, SortTypes } from "@/types";
import {
  TiArrowUnsorted,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
export default function SortIcon({
  label,
  sortStatus,
}: {
  label: SortLabelTypes;
  sortStatus: SortTypes;
}) {
  if (sortStatus.label === label) {
    if (sortStatus.status === "asc")
      return <TiArrowSortedDown className="ml-2" />;
    else if (sortStatus.status === "desc")
      return <TiArrowSortedUp className="ml-2" />;
    return <TiArrowUnsorted className="ml-2" />;
  }
  return <TiArrowUnsorted className="ml-2" />;
}
