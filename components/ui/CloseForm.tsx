"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function CloseForm({
  trigger,
  closeForm,
}: {
  trigger: string | undefined;
  closeForm?: () => void;
}) {
  const router = useRouter();
  const closeActiveForm = () => {
    if (closeForm) {
      closeForm();
      return;
    }
    router.back();
  };
  return (
    <div
      onClick={closeActiveForm}
      className={cn("hidden delay-200 duration-500 sm:block h-full", {
        "bg-black/35": trigger,
      })}
    ></div>
  );
}
