"use client";
import { useState } from "react";
import { IoMdMoon } from "react-icons/io";
import { IoSunnySharp } from "react-icons/io5";
export default function ToggleThemeButton() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const toggleDarkMode = () => {
    document.body.dataset.theme = "dark";
    document.getElementById("bodyPage")?.classList.add("dark");
    setIsDarkMode(true);
  };
  const toggleLightMode = () => {
    document.body.dataset.theme = "light";
    document.getElementById("bodyPage")?.classList.remove("dark");
    setIsDarkMode(false);
  };
  return (
    <>
      {isDarkMode ? (
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
