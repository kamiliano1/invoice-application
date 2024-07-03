"use client";
import DeleteModalWrapper from "@/components/ui/DeleteModalWrapper";
import { clearUserInvoices } from "@/actions/clearUserInvoices";
import { useTransition } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRecoilState } from "recoil";
import { userSettingsFormStatus } from "@/atoms/settingsAppAtom";
export default function UserSettingsDeleteModal() {
  const userId = useCurrentUser();
  const [userSettingsFormStatusState, setUserSettingsFormStatusState] =
    useRecoilState(userSettingsFormStatus);
  const [isPending, setTransition] = useTransition();
  const deleteAllInvoices = () => {
    setTransition(() => {
      if (userId) {
        clearUserInvoices(userId)
          .then((res) => {
            setUserSettingsFormStatusState({
              success: res.success,
              error: res.error,
            });
          })
          .catch(() =>
            setUserSettingsFormStatusState((prev) => ({
              ...prev,
              error: "Something went wrong",
            }))
          );
      }
    });
  };
  return (
    <DeleteModalWrapper
      buttonTriggerLabel="Delete all invoices"
      modalDescription="Are you sure you want to delete all invoices? This action cannot be undone."
      modalTitle="Confirm Deletion"
      deleteModalAction={deleteAllInvoices}
      className="w-full"
      loading={isPending}
    />
  );
}
