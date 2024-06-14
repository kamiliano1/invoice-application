"use client";
import { userInvoicesState } from "@/atoms/settingsAppAtom";
import navAvatar from "@/public/assets/image-avatar.jpg";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRecoilValue } from "recoil";
export default function NavLink() {
  const { status } = useSession();
  const { userAvatar } = useRecoilValue(userInvoicesState);
  return (
    <Link href={status !== "authenticated" ? "/login" : "?userSetting=true"}>
      <Image
        src={userAvatar || navAvatar}
        alt="user avatar"
        className="rounded-full mr-4 lg:hidden size-8"
        width={32}
        height={32}
      />
      <Image
        src={userAvatar || navAvatar}
        alt="user avatar"
        className="hidden rounded-full lg:block mb-6 size-10"
        width={40}
        height={40}
      />
    </Link>
  );
}
