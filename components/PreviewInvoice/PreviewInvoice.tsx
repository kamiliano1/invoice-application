import {
  darkModeState,
  settingsAppState,
  userInvoicesState,
} from "@/atoms/settingsAppAtom";
import { StatusInvoiceType } from "@/schemas";
import { useRecoilState, useRecoilValue } from "recoil";
import StatusInvoice from "@/components/ui/StatusInvoice";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import PreviewSummary from "@/components/PreviewInvoice/PreviewSummary";
import DeleteModal from "@/components/PreviewInvoice/DeleteModal";
import { dateToString } from "@/lib/utils";
import BackButton from "@/components/ui/BackButton";
export default function PreviewInvoice({
  activeInvoiceId,
}: {
  activeInvoiceId: string;
}) {
  const { userInvoices } = useRecoilValue(userInvoicesState);
  const isDarkMode = useRecoilValue(darkModeState);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInvoiceEdit = !!searchParams.get("invoiceEdit");
  const [settingsState, setSettingsState] = useRecoilState(settingsAppState);
  const activeInvoice = userInvoices.filter(
    (item) => item.invoiceId === activeInvoiceId
  )[0];
  const {
    status,
    description,
    invoiceId,
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
        item.invoiceId === activeInvoiceId
          ? { ...item, status: "paid" as StatusInvoiceType }
          : item
      );
      return { ...prev, userInvoices: updatedInvoices };
    });
  };
  if (activeInvoice)
    return (
      <div className="max-w-[778px] mx-auto w-full">
        <BackButton
          className="pt-6 px-6"
          backLink={isInvoiceEdit ? `/${activeInvoiceId}/preview` : "../"}
        />
        <div className="p-6 sm:px-10">
          <div className="p-6 flex items-center justify-between sm:justify-normal rounded-lg bg-white dark:bg-03">
            <p className="text-body sm:mr-4 text-[#858BB2] dark:text-05">
              Status
            </p>
            <StatusInvoice status={status!} />
            <div className="justify-between hidden sm:flex sm:ml-auto gap-3">
              <Button
                variant={isDarkMode ? "lightDarkMode" : "light"}
                className="px-6"
                onClick={editActivatedInvoice}
              >
                Edit
              </Button>
              <DeleteModal id={invoiceId!} className="px-6" />
              <Button variant="violet" onClick={switchToPaid} className="px-5">
                Mark as Paid
              </Button>
            </div>
          </div>
          <div className="p-6 flex flex-col rounded-lg mt-6 sm:grid sm:grid-cols-[repeat(3,_minmax(0,_1fr)),max-content] ssm:grid-cols-[193px,min-content,_min-content,_max-content] bg-white dark:bg-03">
            <div className="sm:row-start-1 sm:col-start-1">
              <p className="text-headingS sm:mb-2 text-08 dark:text-white">
                <span className="text-07">#</span>
                {invoiceId}
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
                    {dateToString(createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-body mb-2 mt-6 text-07 dark:text-05">
                    Payment Due
                  </p>
                  <p className="font-bold text-headingS text-08 dark:text-white">
                    {paymentDue ? dateToString(paymentDue) : ""}
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
        <div className="p-6 flex items-center justify-between sm:justify-normal sm:hidden gap-3 bg-white dark:bg-03">
          <Button
            variant="light"
            className="px-7 w-[23%]"
            onClick={editActivatedInvoice}
          >
            Edit
          </Button>
          <DeleteModal id={invoiceId!} className="px-4 w-[51%] sm:w-auto" />
          <Button variant="violet" className="w-full" onClick={switchToPaid}>
            Mark as Paid
          </Button>
        </div>
      </div>
    );

  return <h2>Something went wrong</h2>;
}
