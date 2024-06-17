import { settingsAppState, userInvoicesState } from "@/atoms/settingsAppAtom";
import { getUserInvoicesById } from "@/data/invoices";
import { getUserAvatar } from "@/data/user";
import { InvoicesSchema } from "@/schemas";
import { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { z } from "zod";
import useCurrentUser from "./useCurrentUser";

export default function useData() {
  const userId = useCurrentUser();
  const [settingsState, setSettingsState] = useRecoilState(settingsAppState);
  const { isLoaded } = useRecoilValue(userInvoicesState);
  const fetchData = useCallback(async () => {
    if (!isLoaded) {
      getUserInvoicesById(userId).then((res) => {
        if (res) {
          const validatedFields = InvoicesSchema.safeParse(
            res.filter((item) => item.status !== "draft")
          );
          if (validatedFields.success) {
            getUserAvatar(userId).then((response) => {
              setSettingsState((prev) => ({
                ...prev,
                userInvoices: res as z.infer<typeof InvoicesSchema>,
                isLoaded: true,
                avatar: response as string,
              }));
            });
          }
        }
      });
    }
  }, [isLoaded, setSettingsState, userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
}
