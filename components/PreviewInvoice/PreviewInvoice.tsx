import { settingsAppState, userInvoicesState } from "@/atoms/settingsAppAtom";
import { StatusInvoiceType } from "@/schemas";
import { useRecoilState, useRecoilValue } from "recoil";
import StatusInvoice from "@/components/ui/StatusInvoice";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import PreviewSummary from "@/components/PreviewInvoice/PreviewSummary";
import DeleteModal from "./DeleteModal";
export default function PreviewInvoice({ invoiceId }: { invoiceId: string }) {
  const { userInvoices } = useRecoilValue(userInvoicesState);
  const router = useRouter();
  const [settingsState, setSettingsState] = useRecoilState(settingsAppState);
  const activeInvoice = userInvoices.filter((item) => item.id === invoiceId)[0];
  const {
    status,
    description,
    id,
    senderAddress,
    createdAt,
    paymentDue,
    clientName,
    clientAddress,
    clientEmail,
    items,
    total,
  } = activeInvoice || {};
  const editActivatedInvoice = () => {
    router.push("?invoiceEdit=true");
  };
  const switchToPaid = () => {
    setSettingsState((prev) => {
      const updatedInvoices = prev.userInvoices.map((item) =>
        item.id === invoiceId
          ? { ...item, status: "paid" as StatusInvoiceType }
          : item
      );
      return { ...prev, userInvoices: updatedInvoices };
    });
  };
  if (activeInvoice)
    return (
      <>
        <div className="p-6 sm:p-12 lg:px-0 lg:w-[730px] max-w-[730px] mx-auto">
          <div className="p-6 flex items-center justify-between sm:justify-normal rounded-lg bg-white dark:bg-03">
            <p className="text-body sm:mr-4 text-[#858BB2] dark:text-05">
              Status
            </p>
            <StatusInvoice status={status!} />
            <div className="justify-between hidden sm:flex sm:ml-auto gap-3">
              <Button variant="light" onClick={editActivatedInvoice}>
                Edit
              </Button>
              <DeleteModal id={id!} />
              <Button variant="violet" onClick={switchToPaid}>
                Mark as Paid
              </Button>
            </div>
          </div>
          <div className="p-6 flex flex-col rounded-lg mt-6 sm:grid sm:grid-cols-[repeat(3,_minmax(0,_1fr)),max-content] ssm:grid-cols-[193px,min-content,_min-content,_max-content] bg-white dark:bg-03">
            <div className="sm:row-start-1 sm:col-start-1">
              <p className="text-headingS sm:mb-2 text-08 dark:text-white">
                <span className="text-07">#</span>
                {id}
              </p>
              <p className="text-body text-07 dark:text-05">{description}</p>
            </div>
            <div className="row-start-1 col-start-4 sm:text-end">
              <p className="text-body mt-7 sm:mt-0 text-07 dark:text-05">
                {senderAddress.street}
              </p>
              <p className="text-body text-07 dark:text-05">
                {senderAddress.city}
              </p>
              <p className="text-body text-07 dark:text-05">
                {senderAddress.postCode}
              </p>

              <p className="text-body mb-7 text-07 dark:text-05">
                {senderAddress.country}
              </p>
            </div>
            <div className="flex col-start-1 col-span-2 row-start-2 row-span-2">
              <div className="w-[100%]">
                <div>
                  <p className="text-body mb-2 text-07 dark:text-05 ">
                    Invoice Date
                  </p>
                  <p className="font-bold text-headingS dark:text-white text-08">
                    {createdAt.toDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-body mb-2 mt-6 text-07 dark:text-05">
                    Payment Due
                  </p>
                  <p className="font-bold text-headingS text-08 dark:text-white">
                    {paymentDue?.toDateString()}
                  </p>
                </div>
              </div>
              <div className="w-[100%]">
                <p className="text-body mb-2 text-07 dark:text-05">Bill To</p>
                <p className="font-bold text-headingS text-08 dark:text-white">
                  {clientName}
                </p>
                <p className="text-body mt-2 text-07 dark:text-05">
                  {clientAddress.street}
                </p>
                <p className="text-body text-07 dark:text-05">
                  {clientAddress.city}
                </p>
                <p className="text-body text-07 dark:text-05">
                  {clientAddress.postCode}
                </p>
                <p className="text-body mb-7 text-07 dark:text-05">
                  {clientAddress.country}
                </p>
              </div>
            </div>
            <div className="sm:row-start-2 sm:col-start-3 sm:row-span-2">
              <p className="text-body mb-2 text-07 dark:text-05">Sent to</p>
              <p className="font-bold text-headingS mb-6 text-08 dark:text-white">
                {clientEmail}
              </p>
            </div>
            <PreviewSummary items={items} total={total!} />
          </div>
        </div>
        <div className="p-6 flex items-center justify-between sm:justify-normal sm:hidden ml-auto gap-3 bg-white dark:bg-03">
          <Button
            variant="light"
            className="w-full"
            onClick={editActivatedInvoice}
          >
            Edit
          </Button>
          <DeleteModal id={id!} />
          <Button
            variant="violet"
            className="w-full px-4"
            onClick={switchToPaid}
          >
            Mark as Paid
          </Button>
        </div>
      </>
    );

  return <h2>Someting went wrong</h2>;
}
