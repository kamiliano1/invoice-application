// "use client";
// import { cn } from "@/lib/utils";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useState, useTransition } from "react";
// import { clearUserInvoices } from "@/actions/clearUserInvoices";
// import { importDefaultInvoices } from "@/actions/importDefaultInvoices";
// import { settingsAppState } from "@/atoms/settingsAppAtom";
// import FormError from "@/components/Auth/FormError";
// import FormSuccess from "@/components/Auth/FormSuccess";
import NewEmailForm from "@/components/Auth/NewEmailForm";
// import NewPasswordForm from "@/components/Auth/NewPasswordForm";
// import UploadAvatarForm from "@/components/Auth/UploadAvatarForm";
// import DeleteAccountForm from "@/components/Auth/DeleteAccountForm";
import BackButton from "@/components/ui/BackButton";
// import DeleteModalWrapper from "@/components/ui/DeleteModalWrapper";
// import { Button } from "@/components/ui/button";
// import useCurrentUser from "@/hooks/useCurrentUser";
// import { signOut } from "next-auth/react";
// import { useRecoilState } from "recoil";
// import { getUserInvoicesById } from "@/data/invoices";
// import { InvoicesSchema } from "@/schemas";
// import { z } from "zod";
import { SearchParamsType } from "@/types";
import { getActivePathname } from "@/data/invoices";
export default async function UserSettings({
  invoiceId,
  searchParams,
}: {
  invoiceId: string | undefined;
  searchParams: SearchParamsType;
}) {
  const pathname = await getActivePathname();
  // const pathname = usePathname();
  // const userId = useCurrentUser();
  // // const searchParams = useSearchParams();
  // const router = useRouter();
  // const [error, setError] = useState<string | undefined>("");
  // const [success, setSuccess] = useState<string | undefined>("");
  // const [settingsState, setSettingsState] = useRecoilState(settingsAppState);
  // const [isPending, setTransition] = useTransition();
  const isUserSettings = searchParams.userSetting;
  // const logoutUser = () => {
  //   // logout();
  //   signOut();
  //   router.push("/login");
  // };

  // const importInvoices = () => {
  //   setTransition(() => {
  //     if (userId) {
  //       importDefaultInvoices(userId)
  //         .then((res) => {
  //           setSuccess(res?.success);
  //           setError(res?.error);
  //           if (res.success) {
  //             getUserInvoicesById(userId).then((response) => {
  //               if (response) {
  //                 const validatedFields = InvoicesSchema.safeParse(
  //                   response.filter((item) => item.status !== "draft")
  //                 );
  //                 if (validatedFields.success) {
  //                   setSettingsState((prev) => ({
  //                     ...prev,
  //                     userInvoices: response as z.infer<typeof InvoicesSchema>,
  //                   }));
  //                 }
  //               }
  //             });
  //           }
  //         })
  //         .catch(() => setError("Something went wrong"));
  //     }
  //   });
  // };
  // const deleteAllInvoices = () => {
  //   setTransition(() => {
  //     if (userId) {
  //       clearUserInvoices(userId)
  //         .then((res) => {
  //           setSuccess(res?.success);
  //           setError(res?.error);
  //           if (res.success)
  //             setSettingsState((prev) => ({ ...prev, userInvoices: [] }));
  //         })
  //         .catch(() => setError("Something went wrong"));
  //     }
  //   });
  // };

  return (
    <>
      <div className="max-w-[616px] sm:w-[616px] lg:ml-[103px] sm:min-h-[calc(100vh_-_80px)] lg:h-fit flex flex-col rounded-tr-[20px] dark:bg-12 bg-white px-6 pb-6 sm:p-14 gap-10">
        {pathname}
        <BackButton
          className="py-6 sm:hidden"
          backLink={
            isUserSettings && pathname && pathname.length > 1
              ? `/${invoiceId}/preview`
              : "/"
          }
        />
        <h2 className="text-headingM text-08 dark:text-white">User settings</h2>
        <NewEmailForm />
        {/* <NewPasswordForm />
        <UploadAvatarForm />
        <DeleteAccountForm /> */}
        {/* <div className="flex gap-5">
          <DeleteModalWrapper
            buttonTriggerLabel="Delete all invoices"
            modalDescription="Are you sure you want to delete all invoices? This action cannot be undone."
            modalTitle="Confirm Deletion"
            deleteModalAction={deleteAllInvoices}
            className="w-full"
            loading={isPending}
          />{" "}
          <Button
            onClick={importInvoices}
            variant="violet"
            className="mt-auto py-3 text-headingS"
            size="full"
            loading={isPending}
          >
            Import default invoices
          </Button>
        </div> */}
        {/* <FormSuccess message={success} />
        <FormError message={error} />
        <Button
          onClick={logoutUser}
          variant="red"
          className="mt-auto py-3"
          size="full"
        >
          Logout
        </Button> */}
      </div>
      {/* <div
        onClick={() => router.back()}
        className={cn("hidden delay-200 duration-500 sm:block h-full", {
          "bg-black/35": isUserSettings,
        })}
      ></div> */}
    </>
  );
}
