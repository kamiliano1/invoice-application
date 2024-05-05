import { userInvoicesState } from "@/atoms/settingsAppAtom";
import useWindowWith from "@/hooks/useWindowWidth";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import InvoiceItem from "@/components/InvoicesList/InvoiceItem";
import InvoiceFilterPopover from "@/components/InvoicesList/InvoiceFilterPopover";
import EmptyInvoice from "./EmptyInvoice";
export default function InvoicesList() {
  const windowWidth = useWindowWith();
  const { totalInvoicesCount, filteredUserInvoices } =
    useRecoilValue(userInvoicesState);
  const router = useRouter();
  const createNewInvoice = () => {
    router.push("/?invoiceEdit=true");
  };
  return (
    <div className="p-6 w-full flex flex-col gap-y-4 max-w-[778px] mx-auto lg:mt-20 z-[1]">
      <div className="font-bold flex items-center text-08 dark:text-white">
        <div className="mr-auto">
          <h1 className="text-headingM sm:text-headingL mb-1">Invoices</h1>
          <p className="text-body">
            {totalInvoicesCount} invoice
            {totalInvoicesCount !== 1 && "s"}
          </p>
        </div>
        <InvoiceFilterPopover />
        <Button variant="violetWithPlusIcon" onClick={createNewInvoice}>
          {windowWidth < 640 ? "New" : "New Invoice"}
        </Button>
      </div>
      {filteredUserInvoices.length ? (
        filteredUserInvoices.map((item) => (
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
