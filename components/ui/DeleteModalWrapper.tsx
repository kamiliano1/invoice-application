import { darkModeState } from "@/atoms/settingsAppAtom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
export default function DeleteModalWrapper({
  className,
  buttonTriggerLabel,
  modalTitle,
  modalDescription,
  removeInvoice,
  loading,
}: {
  className?: string;
  buttonTriggerLabel: string;
  modalTitle: string;
  modalDescription: string;
  removeInvoice: () => void;
  loading: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDarkMode = useRecoilValue(darkModeState);
  useEffect(() => {
    if (!loading) {
      setIsModalOpen(false);
    }
  }, [loading]);

  return (
    <Dialog onOpenChange={setIsModalOpen} open={isModalOpen} modal={true}>
      <Button
        onClick={() => setIsModalOpen(true)}
        className={cn(className)}
        variant="red"
      >
        {buttonTriggerLabel}
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
            {modalTitle}
          </DialogTitle>
          <DialogDescription className="text-06 leading-[22px]">
            {modalDescription}
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
            <Button
              variant="red"
              className="w-[83px]"
              onClick={removeInvoice}
              loading={loading}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
