"use client";
import { settingsAppState } from "@/atoms/settingsAppAtom";
import { useState } from "react";
import { IoMdMoon } from "react-icons/io";
import { IoSunnySharp } from "react-icons/io5";
import { useRecoilState } from "recoil";
export default function ToggleThemeButton() {
  const [settingsState, setSettingsState] = useRecoilState(settingsAppState);
  const toggleDarkMode = () => {
    document.body.dataset.theme = "dark";
    document.getElementById("bodyPage")?.classList.add("dark");
    setSettingsState((prev) => ({ ...prev, isDarkMode: true }));
  };
  const toggleLightMode = () => {
    document.body.dataset.theme = "light";
    document.getElementById("bodyPage")?.classList.remove("dark");
    setSettingsState((prev) => ({ ...prev, isDarkMode: false }));
  };
  return (
    <>
      {settingsState.isDarkMode ? (
        <IoMdMoon
          onClick={toggleLightMode}
          className="text-headingM text-07 ml-auto lg:ml-0 cursor-pointer lg:mt-auto"
        />
      ) : (
        <IoSunnySharp
          onClick={toggleDarkMode}
          className="text-headingM text-07 ml-auto lg:ml-0 cursor-pointer lg:mt-auto"
        />
      )}
    </>
  );
}
