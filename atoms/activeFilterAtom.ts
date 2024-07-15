import { SortLabelTypes, SortStatusTypes } from "@/types";
import { InvoiceStatus } from "@prisma/client";
import { atom } from "recoil";

export type ActivatedFilter = {
  label: SortLabelTypes;
  status: SortStatusTypes;
  filters: InvoiceStatus[];
};

const defaultActivatedFilter: ActivatedFilter = {
  label: "",
  status: "",
  filters: ["draft", "paid", "pending"],
};
export const userFilters = atom<ActivatedFilter>({
  key: "userFilters",
  default: defaultActivatedFilter,
});
