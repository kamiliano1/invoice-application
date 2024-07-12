import { useEffect, useState } from "react";
import { userInvoicesState } from "@/atoms/settingsAppAtom";
import { useRecoilValue } from "recoil";
import useWindowWith from "./useWindowWidth";
export default function useCurrentInvoicesStatus() {
  const windowWidth = useWindowWith();
  const [countInvoiceInfo, setCountInvoiceInfo] = useState("");
  const { totalInvoicesCount } = useRecoilValue(userInvoicesState);
  useEffect(() => {
    if (totalInvoicesCount === 0) {
      setCountInvoiceInfo("No invoices");
      return;
    }
    totalInvoicesCount !== 1
      ? setCountInvoiceInfo(`${totalInvoicesCount} invoices`)
      : setCountInvoiceInfo(`${totalInvoicesCount} invoice`);
    if (windowWidth > 640) {
      totalInvoicesCount !== 1
        ? setCountInvoiceInfo(`There are ${totalInvoicesCount} total invoices`)
        : setCountInvoiceInfo(`There is ${totalInvoicesCount} total invoice`);
    }
  }, [totalInvoicesCount, windowWidth]);
  return countInvoiceInfo;
}
