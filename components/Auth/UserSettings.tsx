import { logout } from "@/actions/logout";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import navAvatar from "@/public/assets/image-avatar.jpg";
import uploadAvatar from "@/actions/uploadAvatar";
import { RxAvatar } from "react-icons/rx";
import NewEmailForm from "./NewEmailForm";
import NewPasswordForm from "./NewPasswordForm";
import { Button } from "../ui/button";
import DeleteModalWrapper from "../ui/DeleteModalWrapper";
import { clearUserInvoices } from "@/actions/clearUserInvoices";
import useCurrentUser from "@/hooks/useCurrentUser";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { importDefaultInvoices } from "@/actions/importDefaultInvoices";
import BackButton from "../ui/BackButton";
export default function UserSettings({
  invoiceId,
}: {
  invoiceId: string | undefined;
}) {
  const pathname = usePathname();
  const userId = useCurrentUser();
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [uploadImageError, setUploadImageError] = useState<string>("");
  const [pictureURL, setPictureURL] = useState<string>("");
  const [isPending, setTransition] = useTransition();
  const isUserSettings = !!searchParams.get("userSetting");
  const logoutUser = () => {
    logout();
    router.push("/login");
  };
  const onSelectAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadImageError("");
    const reader = new FileReader();

    if (e.target.files?.[0]) {
      if (e.target.files[0].size / 512 > 512) {
        setUploadImageError("Too big image size");
        return;
      }
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setPictureURL(readerEvent.target.result as string);
        uploadAvatar(readerEvent.target.result as string);
      }
    };
  };
  const importInvoices = () => {
    setTransition(() => {
      if (userId) {
        importDefaultInvoices(userId)
          .then((res) => {
            setSuccess(res?.success);
            setError(res?.error);
          })
          .catch(() => setError("Something went wrong"));
      }
    });
  };
  const deleteAllInvoices = () => {
    setTransition(() => {
      if (userId) {
        clearUserInvoices(userId)
          .then((res) => {
            setSuccess(res?.success);
            setError(res?.error);
          })
          .catch(() => setError("Something went wrong"));
      }
    });
  };

  return (
    <>
      <div className="max-w-[616px] sm:w-[616px] lg:ml-[103px] sm:min-h-[calc(100vh_-_80px)] lg:h-fit flex flex-col rounded-tr-[20px] dark:bg-12 bg-white px-6 sm:p-14 gap-10">
        <BackButton
          className="py-6 sm:hidden"
          backLink={
            isUserSettings && pathname.length > 1
              ? `/${invoiceId}/preview`
              : "../"
          }
        />
        <h2 className="text-headingM text-08 dark:text-white">User settings</h2>
        <NewEmailForm />
        <NewPasswordForm />
        {/* <div
          style={{
            backgroundImage: `url(${pictureURL})`,
          }}
          className={cn(
            "text-slate-700 bg-slate-100 mb-6 sm:mb-0 flex flex-col items-center text-headingS bg-cover bg-no-repeat w-min px-10 py-[3.75rem] cursor-pointer relative rounded-xl sm:w-[193px]",
            {
              "hover:text-white hover:bg-zinc-500 bg-blend-multiply":
                pictureURL,
            }
          )}
          onClick={() => selectedFileRef.current?.click()}
        >
          <p className="w-[116px]">+ Upload Image</p>
          <input
            ref={selectedFileRef}
            hidden
            type="file"
            onChange={onSelectAvatar}
          />
            </div> */}
        {/* <Image
            fill
            src={pictureURL || navAvatar}
            alt="avatar"
            className="peer hover:opacity-70"
          /> */}
        <div className="flex gap-5">
          <DeleteModalWrapper
            buttonTriggerLabel="Delete all invoices"
            modalDescription="Are you sure you want to delete all invoices? This action cannot be undone."
            modalTitle="Confirm Deletion"
            removeInvoice={deleteAllInvoices}
            className="w-full"
            loading={isPending}
          />{" "}
          <Button
            onClick={importInvoices}
            variant="violet"
            className="mt-auto py-3"
            size="full"
            loading={isPending}
          >
            Import default invoices
          </Button>
        </div>
        <FormSuccess message={success} />
        <FormError message={error} />
        <Button
          onClick={logoutUser}
          variant="red"
          className="mt-auto py-3"
          size="full"
        >
          Logout
        </Button>
      </div>
      <div
        onClick={() => router.back()}
        className={cn("delay-200 duration-500 h-full", {
          "bg-black/35": isUserSettings,
        })}
      ></div>
    </>
  );
}
{
  /* </div> */
}
