"use client";
import { settingsAppState, userInvoicesState } from "@/atoms/settingsAppAtom";
import InvoiceFilterPopover from "@/components/InvoicesList/InvoiceFilterPopover";
import InvoiceItem from "@/components/InvoicesList/InvoiceItem";
import InvoiceItemSkeleton from "@/components/InvoicesList/InvoiceItemSkeleton";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useCurrentUser from "@/hooks/useCurrentUser";
import { MdKeyboardArrowRight } from "react-icons/md";
import useData from "@/hooks/useData";
import useWindowWith from "@/hooks/useWindowWidth";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import EmptyInvoice from "./EmptyInvoice";
import {
  TiArrowUnsorted,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { IconType } from "react-icons/lib";
import { cn } from "@/lib/utils";
type ActualSortStatusType = {
  name: "" | "Invoice Id" | "Payment Due" | "Name" | "Price" | "Status";
  status: "" | "asc" | "desc";
};
export default function InvoicesList() {
  useData();
  const [settingsState, setSettingsState] = useRecoilState(settingsAppState);
  const windowWidth = useWindowWith();
  const [actualSortStatus, setActualSortStatus] =
    useState<ActualSortStatusType>({ name: "", status: "" });
  const [countInvoiceInfo, setCountInvoiceInfo] = useState("");
  const {
    isLoaded,
    sortByDate,
    sortByInvoiceId,
    totalInvoicesCount,
    filteredUserInvoices,
    sortByName,
    sortByStatus,
    sortByTotalValue,
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
  }, [totalInvoicesCount, windowWidth]);

  return (
    <div className="p-6 sm:p-10 w-full flex flex-col gap-y-4 max-w-[778px] mx-auto lg:mt-20 z-[1]">
      <div className="font-bold flex items-center text-08 dark:text-white my-4 sm:mb-7">
        <div className="mr-auto">
          <h1 className="text-headingM sm:text-headingL mb-1">Invoices</h1>
          {!isLoaded ? (
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

      {!isLoaded ? (
        <InvoiceItemSkeleton />
      ) : (
        <>
          <div className="w-full py-3 px-6 grid grid-rows-[repeat(3,min-content)] grid-cols-[max-content,_max-content] gap-x-[3rem] sm:gap-0 sm:grid-rows-1 sm:grid-cols-[repeat(4,_minmax(0,_1fr))_104px_min-content] items-center rounded-lg justify-between border-[1px] border-transparent hover:border-01 bg-white dark:bg-03 text-body">
            <SortElement
              className="text-08 dark:text-white row-start-1 col-start-1 mb-4 sm:mb-0 flex items-center"
              label="Invoice Id"
              actualSortStatus={actualSortStatus}
              setActualSortStatus={setActualSortStatus}
            />
            <SortElement
              className="row-start-2 col-start-1 sm:row-start-1 sm:col-start-2 mb-1 sm:mb-0 text-07 dark:text-05 flex items-center"
              label="Payment Due"
              actualSortStatus={actualSortStatus}
              setActualSortStatus={setActualSortStatus}
            />
            <SortElement
              className="row-start-1 col-start-2 sm:col-start-3  text-end sm:text-start self-start sm:self-auto text-[#858BB2] dark:text-white flex items-center"
              label="Name"
              actualSortStatus={actualSortStatus}
              setActualSortStatus={setActualSortStatus}
            />
            <SortElement
              className="row-start-3 col-start-1 sm:row-start-1 sm:col-start-4 text-08 dark:text-white flex items-center"
              label="Price"
              actualSortStatus={actualSortStatus}
              setActualSortStatus={setActualSortStatus}
            />
            <SortElement
              className="w-[104px] text-08 dark:text-white flex items-center"
              label="Status"
              actualSortStatus={actualSortStatus}
              setActualSortStatus={setActualSortStatus}
            />

            <p className="w-[36px]"></p>
          </div>
          {filteredUserInvoices?.length ? (
            filteredUserInvoices?.map((item) => (
              <InvoiceItem
                id={item.id}
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

const SortElement = ({
  className,
  label,
  actualSortStatus,
  setActualSortStatus,
}: {
  className: string;
  label: "" | "Invoice Id" | "Payment Due" | "Name" | "Price" | "Status";
  actualSortStatus: ActualSortStatusType;
  setActualSortStatus: Dispatch<SetStateAction<ActualSortStatusType>>;
}) => {
  const sortInvoices = () => {
    if (actualSortStatus.name === label) {
      if (actualSortStatus.status === "asc") {
        setActualSortStatus((prev) => ({ ...prev, status: "desc" }));
        return;
      }
      if (actualSortStatus.status === "desc") {
        setActualSortStatus((prev) => ({ ...prev, status: "" }));
        return;
      }
      if (actualSortStatus.status === "") {
        setActualSortStatus((prev) => ({ ...prev, status: "asc" }));
        return;
      }
    }
    setActualSortStatus({ name: label, status: "asc" });
  };
  return (
    <p
      className={cn(
        "cursor-pointer select-none hover:text-opacity-75",
        className,
        {
          "text-01 dark:text-01":
            actualSortStatus.name === label && actualSortStatus.status !== "",
        }
      )}
      onClick={sortInvoices}
    >
      {label}
      <SortIcon name={label} actualSortStatus={actualSortStatus} />
    </p>
  );
};

const SortIcon = ({
  name,
  actualSortStatus,
}: {
  name: "" | "Invoice Id" | "Payment Due" | "Name" | "Price" | "Status";
  actualSortStatus: ActualSortStatusType;
}) => {
  if (actualSortStatus.name === name) {
    if (actualSortStatus.status === "asc")
      return <TiArrowSortedDown className="ml-2" />;
    else if (actualSortStatus.status === "desc")
      return <TiArrowSortedUp className="ml-2" />;
    return <TiArrowUnsorted className="ml-2" />;
  }
  return <TiArrowUnsorted className="ml-2" />;
};
