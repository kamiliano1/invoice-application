"use client";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { Button } from "@/components/ui/button";
import { darkModeState } from "@/atoms/darkModeAtom";

export default function EditActivatedInvoiceButton() {
  const isDarkMode = useRecoilValue(darkModeState);
  const router = useRouter();
  const editActivatedInvoice = () => {
    router.push("?invoiceEdit=true");
  };
  return (
    <Button
      variant={isDarkMode ? "lightDarkMode" : "light"}
      className="px-6"
      onClick={editActivatedInvoice}
    >
      Edit
    </Button>
  );
}
