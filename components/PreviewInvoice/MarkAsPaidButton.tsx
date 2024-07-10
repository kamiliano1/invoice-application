"use client";
import { switchInvoiceToPaid } from "@/actions/switchInvoiceToPaid";
import { Button } from "@/components/ui/button";
import { invoiceData } from "@/data/data";
import { cn } from "@/lib/utils";
import { InvoiceSchema } from "@/schemas";
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
      if (id) {
        const validatedFields = InvoiceSchema.safeParse(invoiceData);
        if (validatedFields.success) switchInvoiceToPaid(id);
      }
    });
  };
  return (
    <Button
      variant="violet"
      disabled={isPending}
      onClick={switchToPaid}
      className={cn(className)}
    >
      Mark as Paid
    </Button>
  );
}
