import { InvoiceSchema } from "@/schemas";
import { InvoiceStatus } from "@prisma/client";
import { atom, selector } from "recoil";
import { z } from "zod";
export type SettingsAppState = {
  isDarkMode: boolean;
  isLoaded: boolean;
  filtersActivated: {
    name: string;
    isActive: boolean;
  }[];
  filtersArray: InvoiceStatus[];
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
  userInvoices: [],
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
    const filteredUserInvoicesPrisma = settingsState.filtersArray;
    const isLoaded = settingsState.isLoaded;
    const activeInvoice = (invoiceId: string) => {
      return settingsState.userInvoices.filter(
        (item) => item.invoiceId === invoiceId
      )[0];
    };
    return {
      totalInvoicesCount,
      filteredUserInvoices,
      userInvoices,
      filteredUserInvoicesPrisma,
      isLoaded,
      activeInvoice,
    };
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
