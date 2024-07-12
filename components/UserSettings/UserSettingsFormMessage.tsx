"use client";

import { userSettingsFormStatus } from "@/atoms/settingsAppAtom";
import { useRecoilValue } from "recoil";
import FormSuccess from "@/components/Auth/FormSuccess";
import FormError from "@/components/Auth/FormError";

export default function UserSettingsFormMessage() {
  const userSettingsFormStatusState = useRecoilValue(userSettingsFormStatus);
  return (
    <>
      <FormSuccess message={userSettingsFormStatusState.success} />

      <FormError message={userSettingsFormStatusState.error} />
    </>
  );
}
