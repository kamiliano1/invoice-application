import { atom } from "recoil";

export type ActiveFormStatus = {
  success: string | undefined;
  error: string | undefined;
};

const defaultActiveFormStatus: ActiveFormStatus = {
  success: "",
  error: "",
};

export const userSettingsFormStatus = atom<ActiveFormStatus>({
  key: "userSettingsFormStatus",
  default: defaultActiveFormStatus,
});
