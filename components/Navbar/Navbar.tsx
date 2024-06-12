import NavLink from "@/components/Navbar/NavLink";
import ToggleThemeButton from "@/components/Navbar/ToggleThemeButton";
import navLogo from "@/public/assets/logo.svg";
import Image from "next/image";

export default function Navbar() {
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
      <ToggleThemeButton />
      <span className="w-[1px] h-[72px] sm:h-20 bg-[#494E6E] mx-6 lg:h-[1px] lg:w-full lg:mt-8 lg:mb-6"></span>
      <NavLink />
    </nav>
  );
}
