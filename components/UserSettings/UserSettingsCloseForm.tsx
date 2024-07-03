"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function UserSettingsCloseForm({
  trigger,
  closeForm,
}: {
  trigger: string | undefined;
  closeForm?: () => void;
}) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className={cn("hidden delay-200 duration-500 sm:block h-full", {
        "bg-black/35": trigger,
      })}
    ></div>
  );
}
