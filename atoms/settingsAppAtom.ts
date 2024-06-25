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
    const sortByName = settingsState.userInvoices
      .filter((item) => settingsState.filtersArray.includes(item.status))
      .sort((a, b) => a.clientName.localeCompare(b.clientName));
    const sortByInvoiceId = settingsState.userInvoices
      .filter((item) => settingsState.filtersArray.includes(item.status))
      .sort((a, b) => a.invoiceId!.localeCompare(b.invoiceId!));
    const sortByTotalValue = settingsState.userInvoices
      .filter((item) => settingsState.filtersArray.includes(item.status))
      .sort((a, b) => {
        if (a.total && b.total) return a.total! - b.total!;
        return 1;
      });
    const sortByStatus = settingsState.userInvoices
      .filter((item) => settingsState.filtersArray.includes(item.status))
      .sort((a, b) => a.status.localeCompare(b.status));
    const sortByDate = settingsState.userInvoices
      .filter((item) => settingsState.filtersArray.includes(item.status))
      .sort((a, b) =>
        new Date(a.paymentDue!) > new Date(b.paymentDue!) ? 1 : -1
      );
    // const sortByDate = settingsState.userInvoices
    // .filter((item) => settingsState.filtersArray.includes(item.status))
    // .sort((a, b) => {
    //   var dateA = new Date(a.createdAt);
    //   var dateB = new Date(b.createdAt);
    //   return dateA > dateB ? 1 : -1;
    // });
    const totalInvoicesCount = filteredUserInvoices.length;
    const isLoaded = settingsState.isLoaded;
    const userAvatar = settingsState.avatar;
    const activeInvoice = (invoiceId: string) => {
      return settingsState.userInvoices.filter(
        (item) => item.id === invoiceId
      )[0];
    };
    return {
      sortByName,
      sortByInvoiceId,
      sortByDate,
      sortByStatus,
      sortByTotalValue,
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
