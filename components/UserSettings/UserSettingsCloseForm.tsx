"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function UserSettingsCloseForm({
  trigger,
}: {
  trigger: string | undefined;
}) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className={cn("hidden h-full delay-200 duration-500 sm:block", {
        "bg-black/35": trigger,
      })}
    ></div>
  );
}
