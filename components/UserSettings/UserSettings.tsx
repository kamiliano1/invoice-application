import { SearchParamsType } from "@/types";
import NewEmailForm from "@/components/UserSettings/NewEmailForm";
import NewPasswordForm from "@/components/UserSettings/NewPasswordForm";
import UploadAvatarForm from "@/components/UserSettings/UploadAvatarForm";
import DeleteAccountForm from "@/components/UserSettings/DeleteAccountForm";
import UserSettingsBackButton from "@/components/UserSettings/UserSettingsBackButton";
import UserSettingsFormMessage from "@/components/UserSettings/UserSettingsFormMessage";
import UserSettingsDeleteModal from "@/components/UserSettings/UserSettingsDeleteModal";
import ImportDefaultInvoicesButton from "@/components/UserSettings/ImportDefaultInvoicesButton";
import UserSettingsCloseForm from "@/components/UserSettings/UserSettingsCloseForm";
import UserSettingsLogoutButton from "@/components/UserSettings/UserSettingsLogoutButton";
import { getUserAvatar } from "@/data/user";
import { auth } from "@/auth";
export default async function UserSettings({
  invoiceId,
  searchParams,
}: {
  invoiceId: string | undefined;
  searchParams: SearchParamsType;
}) {
  const isUserSettings = searchParams.userSetting;
  const session = await auth();
  const userAvatar = await getUserAvatar(session?.user?.id);

  return (
    <>
      <div className="flex max-w-[616px] flex-col gap-6 rounded-tr-[20px] bg-white px-6 pb-6 sm:min-h-[calc(100vh_-_80px)] sm:w-[616px] sm:gap-10 sm:p-14 lg:ml-[103px] lg:h-full dark:bg-12">
        <UserSettingsBackButton
          isUserSettings={isUserSettings}
          invoiceId={invoiceId}
        />
        <h2 className="text-headingM text-08 dark:text-white">User settings</h2>
        <NewEmailForm userEmail={session?.user?.email} />
        <NewPasswordForm userId={session?.user?.id} />
        <UploadAvatarForm userId={session?.user?.id} userAvatar={userAvatar} />
        <DeleteAccountForm userId={session?.user?.id} />
        <div className="flex gap-5">
          <UserSettingsDeleteModal userId={session?.user?.id} />
          <ImportDefaultInvoicesButton userId={session?.user?.id} />
        </div>
        <UserSettingsFormMessage />
        <UserSettingsLogoutButton />
      </div>
      <UserSettingsCloseForm trigger={isUserSettings} />
    </>
  );
}
