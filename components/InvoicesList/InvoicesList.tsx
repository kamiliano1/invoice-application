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
// import useUserInvoices from "@/hooks/useUserInvoices";
import { useSession } from "next-auth/react";
import { getUserInvoicesById } from "@/data/invoices";

export default function InvoicesList() {
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
  }, [windowWidth, totalInvoicesCount]);
  const fetchData = async () => {
    startTransition(() => {
      getUserInvoicesById(userId, filteredUserInvoicesPrisma).then((res) => {
        if (res) {
          const validatedData = InvoicesSchema.safeParse(res);
          if (validatedData.success) setInvoicesData(validatedData.data);
        }
      });
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      startTransition(() => {
        getUserInvoicesById(userId, filteredUserInvoicesPrisma).then((res) => {
          if (res) {
            const validatedData = InvoicesSchema.safeParse(res);
            if (validatedData.success) setInvoicesData(validatedData.data);
          }
        });
      });
    };
    fetchData();
  }, [filteredUserInvoicesPrisma, userId]);
  if (isPending) return <h2 className="text-[10rem]">Loading BRO</h2>;
  return (
    <div className="p-6 sm:p-10 w-full flex flex-col gap-y-4 max-w-[778px] mx-auto lg:mt-20 z-[1]">
      <div className="font-bold flex items-center text-08 dark:text-white my-4 sm:mb-7">
        <div className="mr-auto">
          <h1 className="text-headingM sm:text-headingL mb-1">Invoices</h1>
          <button onClick={fetchData}>Fetch Data</button>
          <h1 className="text-headingM sm:text-headingL mb-1">
            {isPending ? "true" : "false"}
          </h1>
          <p className="text-body">{countInvoiceInfo}</p>
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
      {/* {filteredUserInvoices.length ? (
        filteredUserInvoices.map((item) => (
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
      )} */}
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
    </div>
  );
}
