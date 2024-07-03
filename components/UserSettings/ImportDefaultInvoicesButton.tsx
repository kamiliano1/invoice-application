"use client";
import { userSettingsFormStatus } from "@/atoms/settingsAppAtom";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useTransition } from "react";
import { useRecoilState } from "recoil";
import { Button } from "@/components/ui/button";
import { importDefaultInvoices } from "@/actions/importDefaultInvoices";
export default function ImportDefaultInvoicesButton() {
  const [userSettingsFormStatusState, setUserSettingsFormStatusState] =
    useRecoilState(userSettingsFormStatus);
  const userId = useCurrentUser();
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

            // if (res.success) {
            //   getUserInvoicesById(userId).then((response) => {
            //     if (response) {
            //       const validatedFields = InvoicesSchema.safeParse(
            //         response.filter((item) => item.status !== "draft")
            //       );
            //       if (validatedFields.success) {
            //         setSettingsState((prev) => ({
            //           ...prev,
            //           userInvoices: response as z.infer<typeof InvoicesSchema>,
            //         }));
            //       }
            //     }
            //   });
            // }
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
