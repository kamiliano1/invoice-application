"use client";
import { darkModeAppState } from "@/atoms/darkModeAtom";
import { IoMdMoon } from "react-icons/io";
import { IoSunnySharp } from "react-icons/io5";
import { useRecoilState } from "recoil";
export default function ToggleThemeButton() {
  const [darkModeState, setDarkModeState] = useRecoilState(darkModeAppState);
  const toggleDarkMode = () => {
    document.body.dataset.theme = "dark";
    document.getElementById("bodyPage")?.classList.add("dark");
    setDarkModeState({ isDarkMode: true });
  };
  const toggleLightMode = () => {
    document.body.dataset.theme = "light";
    document.getElementById("bodyPage")?.classList.remove("dark");
    setDarkModeState({ isDarkMode: false });
  };
  return (
    <>
      {darkModeState.isDarkMode ? (
        <IoMdMoon
          onClick={toggleLightMode}
          className="ml-auto cursor-pointer text-headingM text-07 lg:ml-0 lg:mt-auto"
        />
      ) : (
        <IoSunnySharp
          onClick={toggleDarkMode}
          className="ml-auto cursor-pointer text-headingM text-07 lg:ml-0 lg:mt-auto"
        />
      )}
    </>
  );
}
