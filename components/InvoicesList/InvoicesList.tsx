import { settingsAppState } from "@/atoms/settingsAppAtom";
import useWindowWith from "@/hooks/useWindowWidth";
// import Button from "@/layout/Button/Button";
// import FilterPopover from "@/layout/FilterPopover/FilterPopover";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
// import InvoiceItem from "./InvoiceItem";
// import EmptyInvoice from "./EmptyInvoice";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import InvoiceItem from "@/components/InvoicesList/InvoiceItem";
import InvoiceFilterPopover from "@/components/InvoicesList/InvoiceFilterPopover";
import EmptyInvoice from "./EmptyInvoice";
export default function InvoicesList() {
  const windowWidth = useWindowWith();
  const [settingsState, setSettingsState] = useRecoilState(settingsAppState);
  const [filteredInvoices, setFilteredInvoices] = useState(
    settingsState.userInvoices
  );
  const router = useRouter();
  const createNewInvoice = () => {
    router.push("/?newInvoice=true");
  };
  useEffect(() => {
    const filteredArray = settingsState.filtersActivated
      .filter((item) => item.isActive)
      .map((item) => item.name);
    setFilteredInvoices(
      settingsState.userInvoices.filter((item) =>
        filteredArray.includes(item.status!)
      )
    );
  }, [settingsState.filtersActivated, settingsState.userInvoices]);
  return (
    <div className="p-6 w-full flex flex-col gap-y-4 max-w-[778px] mx-auto lg:mt-20 z-[1]">
      <div className="font-bold flex items-center text-08 dark:text-white">
        <div className="mr-auto">
          <h1 className="text-headingM sm:text-headingL mb-1">Invoices</h1>
          <p className="text-body">
            {filteredInvoices.length} invoice
            {filteredInvoices.length !== 1 && "s"}
          </p>
        </div>
        <InvoiceFilterPopover />
        <Button variant="violetWithPlusIcon" onClick={createNewInvoice}>
          {windowWidth < 640 ? "New" : "New Invoice"}
        </Button>
      </div>
      {filteredInvoices.length ? (
        filteredInvoices.map((item) => (
          <InvoiceItem
            key={item.id}
            id={item.id!}
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
