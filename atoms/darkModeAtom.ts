import { atom, selector } from "recoil";
export type DarkModeAppState = {
  isDarkMode: boolean;
};

const DarkModeAppState: DarkModeAppState = {
  isDarkMode: true,
};

export const darkModeState = selector({
  key: "darkModeSelector",
  get: ({ get }) => {
    const darkModeState = get(darkModeAppState);
    const isDarkMode = darkModeState.isDarkMode;
    return isDarkMode;
  },
});

export const darkModeAppState = atom<DarkModeAppState>({
  key: "darkModeState",
  default: DarkModeAppState,
});
