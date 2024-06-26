export type SortLabelTypes =
  | ""
  | "Invoice Id"
  | "Payment Due"
  | "Name"
  | "Price"
  | "Status";
export type SortStatusTypes = "" | "asc" | "desc";

export type SortTypes = {
  label: SortLabelTypes;
  status: SortStatusTypes;
};
