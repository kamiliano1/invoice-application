"use client";
import { usePathname } from "next/navigation";
import BackButton from "@/components/ui/BackButton";

export default function UserSettingsBackButton({
  isUserSettings,
  invoiceId,
}: {
  isUserSettings: string | undefined;
  invoiceId: string | undefined;
}) {
  const pathname = usePathname();
  return (
    <BackButton
      className="py-4 sm:hidden"
      backLink={
        isUserSettings && pathname.length > 1 ? `/${invoiceId}/preview` : "/"
      }
    />
  );
}
