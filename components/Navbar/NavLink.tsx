import { auth } from "@/auth";
import { getUserAvatar } from "@/data/user";
import navAvatar from "@/public/assets/image-avatar.jpg";
import Image from "next/image";
import Link from "next/link";
export default async function NavLink() {
  const session = await auth();
  const userAvatar = await getUserAvatar(session?.user?.id);
  return (
    <Link href={!session?.user ? "/login" : "?userSetting=true"}>
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
