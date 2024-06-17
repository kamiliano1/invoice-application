import { InvoiceSchema } from "@/schemas";
import { InvoiceStatus } from "@prisma/client";
import { atom, selector } from "recoil";
import { z } from "zod";
export type SettingsAppState = {
  isDarkMode: boolean;
  isLoaded: boolean;
  filtersArray: InvoiceStatus[];
  avatar: string;
  userInvoices: z.infer<typeof InvoiceSchema>[];
};

const defaultSettingsAppState: SettingsAppState = {
  isDarkMode: true,
  isLoaded: false,
  avatar: "",
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
    const isLoaded = settingsState.isLoaded;
    const userAvatar = settingsState.avatar;
    const activeInvoice = (invoiceId: string) => {
      return settingsState.userInvoices.filter(
        (item) => item.id === invoiceId
      )[0];
    };
    return {
      totalInvoicesCount,
      filteredUserInvoices,
      isLoaded,
      userAvatar,
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
