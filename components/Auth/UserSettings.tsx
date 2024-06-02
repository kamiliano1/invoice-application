import { logout } from "@/actions/logout";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import Image from "next/image";
import navAvatar from "@/public/assets/image-avatar.jpg";
import uploadAvatar from "@/actions/uploadAvatar";
import { RxAvatar } from "react-icons/rx";
import NewEmailForm from "./NewEmailForm";
import NewPasswordForm from "./NewPasswordForm";
export default function UserSettings() {
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [uploadImageError, setUploadImageError] = useState<string>("");
  const [pictureURL, setPictureURL] = useState<string>("");
  const isInvoiceEdit = !!searchParams.get("userSetting");
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
  return (
    <div
      className={cn(
        "duration-500 w-full sm:absolute sm:top-0 sm:-translate-x-full grid sm:grid-cols-[minmax(0,_616px)_auto] lg:grid-cols-[minmax(0,_719px)_auto] overflow-y-scroll z-[5] min-h-full text-white",
        {
          "sm:translate-x-0": isInvoiceEdit,
        }
      )}
    >
      <div className="max-w-[616px] sm:w-[616px] lg:ml-[103px] sm:min-h-[calc(100vh_-_80px)] lg:h-fit flex flex-col rounded-tr-[20px] dark:bg-12 bg-white px-6 sm:p-14  gap-5">
        <h2 className="text-[5rem]">Ustawienia</h2>
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

        <button onClick={logoutUser}>Logout</button>
      </div>
      <div
        onClick={() => router.back()}
        className={cn("delay-200 duration-500 h-full", {
          "bg-black/35": isInvoiceEdit,
        })}
      ></div>
    </div>
  );
}
