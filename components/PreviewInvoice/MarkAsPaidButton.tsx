"use client";
import { switchInvoiceToPaid } from "@/actions/switchInvoiceToPaid";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTransition } from "react";

export default function MarkAsPaidButton({
  className,
  id,
}: {
  className: string;
  id: string | undefined;
}) {
  const [isPending, startTransition] = useTransition();
  const switchToPaid = () => {
    startTransition(() => {
      if (id) switchInvoiceToPaid(id);
    });
  };
  return (
    <Button
      variant="violet"
      disabled={isPending}
      loading={isPending}
      onClick={switchToPaid}
      className={cn(className)}
    >
      Mark as Paid
    </Button>
  );
}
