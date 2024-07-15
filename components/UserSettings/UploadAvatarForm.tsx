"use client";
import { useRef, useState } from "react";
import { uploadAvatar } from "@/actions/uploadAvatar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import navAvatar from "@/public/assets/image-avatar.jpg";
import { RiImageCircleFill } from "react-icons/ri";
import { useTransition } from "react";
import FormSuccess from "@/components/Auth/FormSuccess";
import FormError from "@/components/Auth/FormError";
import CollapsibleContentWrapper from "@/components/ui/CollapsibleContentWrapper";
import { Button } from "@/components/ui/button";
export default function UploadAvatarForm({
  userAvatar,
  userId,
}: {
  userAvatar?: string | null | undefined;
  userId: string | undefined;
}) {
  const [isPending, startTransition] = useTransition();
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [pictureURL, setPictureURL] = useState<string>("");

  const onSelectAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setSuccess("");
    const reader = new FileReader();
    if (e.target.files?.[0]) {
      if (e.target.files[0].size / 512 > 512) {
        setError("Too big image size");
        return;
      }
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setPictureURL(readerEvent.target?.result as string);
      }
    };
  };
  const sentAvatar = () => {
    if (!pictureURL) {
      setError("Sent avatar first");
      return;
    }
    startTransition(() => {
      if (userId) {
        uploadAvatar(userId, pictureURL).then((res) => {
          if (res.success) {
            setSuccess(res.success);
          } else {
            setError(res.error);
          }
        });
      }
    });
  };
  return (
    <CollapsibleContentWrapper buttonTriggerLabel="Change Avatar">
      <div className="space-y-5">
        <div className="flex gap-5 items-center">
          <div
            className={cn(
              "text-slate-700 bg-slate-100 mb-6 sm:mb-0 flex flex-col items-center text-headingS bg-cover bg-no-repeat w-min px-10 py-[3.75rem] cursor-pointer relative rounded-xl sm:size-[193px] border-[2px] dark:border-white border-black",
              {
                "hover:text-white hover:bg-black bg-blend-multiply": pictureURL,
              }
            )}
            onClick={() => selectedFileRef.current?.click()}
          >
            <RiImageCircleFill className="text-[2rem]" />
            <p className="text-headingS">Upload Avatar</p>
            <input
              ref={selectedFileRef}
              hidden
              type="file"
              onChange={onSelectAvatar}
            />
            <Image
              fill
              src={pictureURL || userAvatar || navAvatar}
              alt="avatar"
              className="peer hover:opacity-50 rounded-xl"
            />
          </div>
          <h2 className="text-08 dark:text-white">
            Image must be below 512x512px.
          </h2>
        </div>
        <FormSuccess message={success} />
        <FormError message={error} />
        <Button
          onClick={sentAvatar}
          loading={isPending}
          disabled={isPending}
          variant="violet"
          size="full"
          className="py-3"
        >
          Update
        </Button>
      </div>
    </CollapsibleContentWrapper>
  );
}
