import NavLink from "@/components/Navbar/NavLink";
import ToggleThemeButton from "@/components/Navbar/ToggleThemeButton";
import navLogo from "@/public/assets/logo.svg";
import Image from "next/image";
import { Suspense } from "react";
import AvatarSkeleton from "@/components/Navbar/AvatarSkeleton";
export default function Navbar() {
  return (
    <nav className="z-[500] flex items-center bg-03 lg:fixed lg:h-[100vh] lg:flex-col lg:rounded-r-[20px]">
      <div className="relative flex aspect-square w-[72px] items-center justify-center rounded-r-[20px] bg-01 sm:w-20 lg:w-[103px]">
        <div className="relative h-[26px] w-[28px] sm:h-[31px] sm:w-[31px] lg:h-10 lg:w-10">
          <Image src={navLogo} alt="web logo" className="z-[5]" fill />
        </div>
        <span className="absolute bottom-0 h-[36px] w-[72px] rounded-br-[20px] rounded-tl-[20px] bg-02 sm:h-10 sm:w-20 lg:h-[51.5px] lg:w-[103px]"></span>
      </div>
      <ToggleThemeButton />
      <span className="mx-6 h-[72px] w-[1px] bg-[#494E6E] sm:h-20 lg:mb-6 lg:mt-8 lg:h-[1px] lg:w-full"></span>
      <Suspense fallback={<AvatarSkeleton />}>
        <NavLink />
      </Suspense>
    </nav>
  );
}
