import { UserSingleInvoiceSchema } from "@/schemas";
import { atom } from "recoil";
import { z } from "zod";
export type FilterType = "draft" | "paid" | "pending";

export type SettingsAppState = {
  isDarkMode: boolean;
  isLoaded: boolean;
  filtersActivated: {
    name: string;
    isActive: boolean;
  }[];
  filtersArray: string[];
  userInvoices: z.infer<typeof UserSingleInvoiceSchema>[];
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

export const settingsAppState = atom<SettingsAppState>({
  key: "settingsAppState",
  default: defaultSettingsAppState,
});
