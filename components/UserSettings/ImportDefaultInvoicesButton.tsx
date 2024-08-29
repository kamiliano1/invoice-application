"use client";
import { useTransition } from "react";
import { useRecoilState } from "recoil";
import { Button } from "@/components/ui/button";
import { importDefaultInvoices } from "@/actions/importDefaultInvoices";
import { userSettingsFormStatus } from "@/atoms/formStatusAtom";
export default function ImportDefaultInvoicesButton({
  userId,
}: {
  userId: string | undefined;
}) {
  const [userSettingsFormStatusState, setUserSettingsFormStatusState] =
    useRecoilState(userSettingsFormStatus);
  const [isPending, setTransition] = useTransition();
  const importUserInvoices = () => {
    setTransition(() => {
      if (userId) {
        importDefaultInvoices(userId)
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
            })),
          );
      }
    });
  };
  return (
    <Button
      onClick={importUserInvoices}
      variant="violet"
      className="mt-auto py-3 text-headingS"
      size="full"
      loading={isPending}
    >
      Import default invoices
    </Button>
  );
}
