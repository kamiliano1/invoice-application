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
        className="mr-4 size-8 rounded-full lg:hidden"
        width={32}
        height={32}
      />
      <Image
        src={userAvatar || navAvatar}
        alt="user avatar"
        className="mb-6 hidden size-10 rounded-full lg:block"
        width={40}
        height={40}
      />
    </Link>
  );
}
