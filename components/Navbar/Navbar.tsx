"use client";
import { IoMdMoon } from "react-icons/io";
import { IoSunnySharp } from "react-icons/io5";
import { useRecoilState, useRecoilValue } from "recoil";
import navLogo from "@/public/assets/logo.svg";
import navAvatar from "@/public/assets/image-avatar.jpg";
import Image from "next/image";
import { darkModeState, settingsAppState } from "@/atoms/settingsAppAtom";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [settingsState, setSettingsState] = useRecoilState(settingsAppState);
  const { status } = useSession();
  const isDarkMode = useRecoilValue(darkModeState);
  const toggleDarkMode = () => {
    document.body.dataset.theme = "dark";
    setSettingsState((prev) => ({
      ...prev,
      isDarkMode: !prev.isDarkMode,
    }));
  };
  const toggleLightMode = () => {
    document.body.dataset.theme = "light";
    setSettingsState((prev) => ({
      ...prev,
      isDarkMode: !prev.isDarkMode,
    }));
  };
  // useEffect(() => {
  //   const fetchAvatar = async () => {
  //     getUserAvatar("aa").then((res) => {
  //       if (res) setUserAvatar(res);
  //     });
  //   };
  //   fetchAvatar();
  // }, []);
  return (
    <nav className="bg-03 flex items-center lg:fixed lg:h-[100vh] lg:flex-col lg:rounded-r-[20px] z-[500]">
      <div className="w-[72px] sm:w-20 lg:w-[103px] aspect-square bg-01 rounded-r-[20px] flex items-center justify-center relative">
        <div className="w-[28px] h-[26px] sm:w-[31px] sm:h-[31px] lg:w-10 lg:h-10 relative">
          <Image src={navLogo} alt="web logo" className="z-[5]" fill />
        </div>
        <span
          className="w-[72px] sm:w-20 lg:w-[103px] h-[36px] sm:h-10 
        lg:h-[51.5px] absolute bg-02 bottom-0 rounded-br-[20px] rounded-tl-[20px]"
        ></span>
      </div>
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
      <span className="w-[1px] h-[72px] sm:h-20 bg-[#494E6E] mx-6 lg:h-[1px] lg:w-full lg:mt-8 lg:mb-6"></span>
      <Link href={status !== "authenticated" ? "/login" : "?userSetting=true"}>
        <Image
          src={navAvatar}
          alt="user avatar"
          className="rounded-full mr-4 lg:hidden"
          width={32}
          height={32}
        />
        <Image
          src={navAvatar}
          alt="user avatar"
          className="hidden rounded-full lg:block mb-6"
          width={40}
          height={40}
        />
      </Link>
    </nav>
  );
}
