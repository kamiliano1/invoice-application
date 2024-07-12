import { userFilters } from "@/atoms/settingsAppAtom";
import { filterOptions, sortByStatus } from "@/lib/utils";
import { InvoicesSchema } from "@/schemas";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { z } from "zod";

export const useFilterInvoices = (invoices: z.infer<typeof InvoicesSchema>) => {
  const userFilterState = useRecoilValue(userFilters);
  const [filteredInvoices, setFilteredInvoices] =
    useState<z.infer<typeof InvoicesSchema>>();
  useEffect(() => {
    const filterFunction = () => {
      if (!invoices.length) return;

      const activatedFilter = Object.keys(filterOptions)[
        Object.values(filterOptions).indexOf(userFilterState.label)
      ] as "invoiceId" | "paymentDue" | "clientName" | "total" | "status";
      const filteredUserInvoices = invoices.filter((item) =>
        userFilterState.filters.includes(item.status)
      );
      if (userFilterState.status === "") return filteredUserInvoices;
      return filteredUserInvoices.sort((a, b) => {
        if (userFilterState.status === "asc" && activatedFilter) {
          return sortByStatus({
            activatedFilter,
            firstElement: a,
            secondElement: b,
          });
        }
        return sortByStatus({
          activatedFilter,
          firstElement: b,
          secondElement: a,
        });
      });
    };
    setFilteredInvoices(filterFunction());
  }, [
    invoices,
    userFilterState.filters,
    userFilterState.label,
    userFilterState.status,
  ]);

  return filteredInvoices;
};
