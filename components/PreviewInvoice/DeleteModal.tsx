import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogOverlay,
  DialogPortal,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useState, useTransition } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { darkModeState, settingsAppState } from "@/atoms/settingsAppAtom";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { deleteInvoice } from "@/actions/deleteInvoice";

export default function DeleteModal({
  invoiceId,
  className,
}: {
  invoiceId: string;
  className?: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, setTransition] = useTransition();
  const isDarkMode = useRecoilValue(darkModeState);
  const router = useRouter();
  const [settingsState, setSettingsState] = useRecoilState(settingsAppState);
  const deleteUserInvoice = () => {
    setSettingsState((prev) => {
      const updatedInvoices = prev.userInvoices.filter(
        (item) => item.invoiceId !== invoiceId
      );
      return { ...prev, userInvoices: updatedInvoices };
    });
    setTransition(() => {
      deleteInvoice(invoiceId);
      router.back();
    });
  };
  return (
    <Dialog onOpenChange={setIsModalOpen} open={isModalOpen} modal={true}>
      <Button
        onClick={() => setIsModalOpen(true)}
        className={cn(className)}
        variant="red"
        loading={isPending}
      >
        Delete
      </Button>
      <DialogPortal>
        <DialogOverlay className="bg-12/40 data-[state=open]:animate-overlayShow fixed inset-0 z-[600]" />
        <DialogContent
          className={clsx(
            "data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[87vw] max-w-[480px] translate-x-[-50%] translate-y-[-50%] rounded-lg p-8 z-[700] border-none gap-5",
            {
              "bg-03": isDarkMode,
              "bg-white": !isDarkMode,
            }
          )}
        >
          <DialogTitle
            className={clsx({
              "text-white": isDarkMode,
              "text-08": !isDarkMode,
            })}
          >
            Confirm Deletion
          </DialogTitle>
          <DialogDescription className="text-06 leading-[22px]">
            Are you sure you want to delete invoice {invoiceId}? This action
            cannot be undone.
          </DialogDescription>
          <div className="flex gap-3 justify-end">
            <DialogClose asChild>
              <Button
                className="px-[1.375rem]"
                variant={isDarkMode ? "lightDarkMode" : "light"}
              >
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant="red"
                className="px-5"
                onClick={deleteUserInvoice}
              >
                Delete
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
