"use client";
import navAvatar from "@/public/assets/image-avatar.jpg";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
export default function NavLink() {
  const { status } = useSession();
  return (
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
  );
}
