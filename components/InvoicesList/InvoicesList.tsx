import { userInvoicesState } from "@/atoms/settingsAppAtom";
import useWindowWith from "@/hooks/useWindowWidth";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import InvoiceItem from "@/components/InvoicesList/InvoiceItem";
import InvoiceFilterPopover from "@/components/InvoicesList/InvoiceFilterPopover";
import EmptyInvoice from "./EmptyInvoice";
import { useEffect, useState, useTransition } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { z } from "zod";
import { InvoiceSchema, InvoicesSchema } from "@/schemas";
import { useSession } from "next-auth/react";
import { getUserInvoicesById } from "@/data/invoices";
import { Skeleton } from "@/components/ui/skeleton";
import InvoiceItemSkeleton from "@/components/InvoicesList/InvoiceItemSkeleton";
export default function InvoicesList({
  getInvoices,
}: {
  getInvoices: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const userId = useCurrentUser();
  const [invoicesData, setInvoicesData] =
    useState<z.infer<typeof InvoicesSchema>>();
  const windowWidth = useWindowWith();
  const [countInvoiceInfo, setCountInvoiceInfo] = useState("");
  const {
    totalInvoicesCount,
    filteredUserInvoices,
    filteredUserInvoicesPrisma,
  } = useRecoilValue(userInvoicesState);
  const router = useRouter();
  const createNewInvoice = () => {
    router.push("/?invoiceEdit=true");
  };
  useEffect(() => {
    if (invoicesData?.length === 0) {
      setCountInvoiceInfo("No invoices");
      return;
    }
    invoicesData?.length !== 1
      ? setCountInvoiceInfo(`${invoicesData?.length} invoices`)
      : setCountInvoiceInfo(`${invoicesData?.length} invoice`);
    if (windowWidth > 640) {
      invoicesData?.length !== 1
        ? setCountInvoiceInfo(
            `There are ${invoicesData?.length} total invoices`
          )
        : setCountInvoiceInfo(`There is ${invoicesData?.length} total invoice`);
    }
  }, [invoicesData?.length, windowWidth]);
  useEffect(() => {
    const fetchData = async () => {
      startTransition(() => {
        getUserInvoicesById(userId, filteredUserInvoicesPrisma).then((res) => {
          if (res) {
            const validatedData = InvoicesSchema.safeParse(
              res.filter((item) => item.status !== "draft")
            );
            if (validatedData.success) {
              setInvoicesData(res as z.infer<typeof InvoicesSchema>);
            }
          }
        });
      });
    };
    fetchData();
  }, [filteredUserInvoicesPrisma, userId, getInvoices]);

  return (
    <div className="p-6 sm:p-10 w-full flex flex-col gap-y-4 max-w-[778px] mx-auto lg:mt-20 z-[1]">
      <div className="font-bold flex items-center text-08 dark:text-white my-4 sm:mb-7">
        <div className="mr-auto">
          <h1 className="text-headingS mb-1">Hi {userId}</h1>
          <h1 className="text-headingM sm:text-headingL mb-1">Invoices</h1>
          {isPending ? (
            <Skeleton className="h-[18px] w-30" />
          ) : (
            <p className="text-body">{countInvoiceInfo}</p>
          )}
        </div>
        <InvoiceFilterPopover />
        <Button
          variant="violetWithPlusIcon"
          onClick={createNewInvoice}
          size={windowWidth < 640 ? "small" : "default"}
          className="text-headingS text-white"
        >
          {windowWidth < 640 ? "New" : "New Invoice"}
        </Button>
      </div>
      {isPending ? (
        <InvoiceItemSkeleton />
      ) : (
        <>
          {invoicesData?.length ? (
            invoicesData.map((item) => (
              <InvoiceItem
                key={item.invoiceId}
                invoiceId={item.invoiceId!}
                clientName={item.clientName}
                paymentDue={item.paymentDue!}
                status={item.status!}
                total={item.total!}
              />
            ))
          ) : (
            <EmptyInvoice />
          )}
        </>
      )}
    </div>
  );
}
