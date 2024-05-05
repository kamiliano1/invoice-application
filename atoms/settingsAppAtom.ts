import { invoiceData } from "@/data/data";
import { InvoiceSchema } from "@/schemas";
import { atom, selector } from "recoil";
import { z } from "zod";

export type SettingsAppState = {
  isDarkMode: boolean;
  isLoaded: boolean;
  filtersActivated: {
    name: string;
    isActive: boolean;
  }[];
  filtersArray: string[];
  userInvoices: z.infer<typeof InvoiceSchema>[];
};

const defaultSettingsAppState: SettingsAppState = {
  isDarkMode: true,
  isLoaded: false,
  filtersActivated: [
    {
      name: "draft",
      isActive: true,
    },
    {
      name: "pending",
      isActive: true,
    },
    {
      name: "paid",
      isActive: true,
    },
  ],
  filtersArray: ["paid", "pending", "draft"],
  userInvoices: invoiceData,
};

export const userInvoicesState = selector({
  key: "userInvoicesSelector",
  get: ({ get }) => {
    const settingsState = get(settingsAppState);
    const filteredUserInvoices = settingsState.userInvoices.filter((item) =>
      settingsState.filtersArray.includes(item.status)
    );
    const totalInvoicesCount = filteredUserInvoices.length;
    const userInvoices = settingsState.userInvoices;
    return { totalInvoicesCount, filteredUserInvoices, userInvoices };
  },
});
export const darkModeState = selector({
  key: "darkModeSelector",
  get: ({ get }) => {
    const settingsState = get(settingsAppState);
    const isDarkMode = settingsState.isDarkMode;
    return isDarkMode;
  },
});

export const settingsAppState = atom<SettingsAppState>({
  key: "settingsAppState",
  default: defaultSettingsAppState,
});
