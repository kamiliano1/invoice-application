import { darkModeState } from "@/atoms/darkModeAtom";
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
import { LegacyRef, RefAttributes, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
export default function DeleteModalWrapper({
  className,
  buttonTriggerLabel,
  modalTitle,
  modalDescription,
  deleteModalAction,
  loading,
  disabled,
  deleteModalRef,
}: {
  className?: string;
  buttonTriggerLabel: string;
  modalTitle: string;
  modalDescription: string;
  deleteModalAction: () => void;
  loading: boolean;
  disabled?: boolean;
  deleteModalRef?: LegacyRef<HTMLButtonElement>;
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
        ref={deleteModalRef}
        onClick={() => setIsModalOpen(true)}
        className={cn(className)}
        variant="red"
        disabled={disabled}
      >
        {buttonTriggerLabel}
      </Button>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-[600] bg-12/40 data-[state=open]:animate-overlayShow" />
        <DialogContent className="fixed left-[50%] top-[50%] z-[700] max-h-[85vh] w-[87vw] max-w-[480px] translate-x-[-50%] translate-y-[-50%] gap-5 rounded-lg border-none bg-white p-8 data-[state=open]:animate-contentShow dark:bg-03">
          <DialogTitle className="text-08 dark:text-white">
            {modalTitle}
          </DialogTitle>
          <DialogDescription className="leading-[22px] text-06">
            {modalDescription}
          </DialogDescription>
          <div className="flex justify-end gap-3">
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
              onClick={deleteModalAction}
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
