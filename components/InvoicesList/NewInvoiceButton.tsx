"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import useWindowWith from "@/hooks/useWindowWidth";
export default function NewInvoiceButton() {
  const windowWidth = useWindowWith();
  const router = useRouter();
  const createNewInvoice = () => {
    router.push("/?invoiceEdit=true");
  };
  return (
    <Button
      variant="violetWithPlusIcon"
      onClick={createNewInvoice}
      size={windowWidth < 640 ? "small" : "default"}
      className="text-headingS text-white"
    >
      {windowWidth < 640 ? "New" : "New Invoice"}
    </Button>
  );
}
