"use client";

import { useRecoilValue } from "recoil";
import FormSuccess from "@/components/Auth/FormSuccess";
import FormError from "@/components/Auth/FormError";
import { userSettingsFormStatus } from "@/atoms/formStatusAtom";

export default function UserSettingsFormMessage() {
  const userSettingsFormStatusState = useRecoilValue(userSettingsFormStatus);
  return (
    <>
      <FormSuccess message={userSettingsFormStatusState.success} />

      <FormError message={userSettingsFormStatusState.error} />
    </>
  );
}
