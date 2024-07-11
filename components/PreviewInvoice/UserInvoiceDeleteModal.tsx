"use client";
import { deleteInvoice } from "@/actions/deleteInvoice";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import DeleteModalWrapper from "@/components/ui/DeleteModalWrapper";
import { cn } from "@/lib/utils";
export default function UserInvoiceDeleteModal({
  id,
  invoiceId,
  className,
}: {
  id: string | undefined;
  invoiceId: string | null | undefined;
  className: string;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const deleteUserInvoice = () => {
    startTransition(() => {
      if (id) {
        deleteInvoice(id).then((res) => {
          if (res?.success) router.back();
        });
      }
    });
  };
  return (
    <DeleteModalWrapper
      buttonTriggerLabel="Delete"
      modalDescription={`Are you sure you want to delete invoice ${invoiceId}? This action cannot be undone.`}
      modalTitle="Confirm Deletion"
      deleteModalAction={deleteUserInvoice}
      className={cn(className)}
      loading={isPending}
    />
  );
}
