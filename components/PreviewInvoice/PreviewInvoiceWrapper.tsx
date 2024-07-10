// "use client";
// import { userInvoicesState } from "@/atoms/settingsAppAtom";
// import PreviewInvoiceSkeleton from "@/components/PreviewInvoice/PreviewInvoiceSkeleton";
// import useData from "@/hooks/useData";
// import useWindowWith from "@/hooks/useWindowWidth";
// import { useSearchParams } from "next/navigation";
// import { useRecoilValue } from "recoil";
import { SearchParamsType } from "@/types";
import Sidebar from "@/components/ui/Sidebar";
import PreviewInvoice from "@/components/PreviewInvoice/PreviewInvoice";

export default function PreviewInvoiceWrapper({
  searchParams,
  id,
}: {
  searchParams: SearchParamsType;
  id: string;
}) {
  // const { isLoaded, activeInvoice } = useRecoilValue(userInvoicesState);
  // const invoiceId = params.invoiceId;
  // const searchParams = useSearchParams();
  // const isInvoiceEdit = !!searchParams.get("invoiceEdit");
  // const windowWidth = useWindowWith();
  // const isUserEdit = !!searchParams.get("userSetting");

  // useData();
  return (
    <main className="flex flex-col lg:px-0 bg-11 dark:bg-12">
      <PreviewInvoice
        id={id}
        // invoiceData={activeInvoice(invoiceId)}
        // activeInvoiceId={invoiceId}
      />
      <Sidebar searchParams={searchParams} />
    </main>
    // <main className="flex flex-col lg:px-0 bg-11 dark:bg-12">
    //   {!isLoaded ? (
    //     <PreviewInvoiceSkeleton />
    //   ) : (
    //     <>
    //       {windowWidth < 640 ? (
    //         <>
    //           {isInvoiceEdit || isUserEdit ? (
    //             <Sidebar
    //               invoiceData={activeInvoice(invoiceId)}
    //               invoiceId={invoiceId}
    //             />
    //           ) : (
    //             <>
    //               <PreviewInvoice
    //                 invoiceData={activeInvoice(invoiceId)}
    //                 activeInvoiceId={invoiceId}
    //               />
    //             </>
    //           )}
    //         </>
    //       ) : (
    //         <>
    //           <Sidebar
    //             invoiceData={activeInvoice(invoiceId)}
    //             invoiceId={invoiceId}
    //           />
    //           <PreviewInvoice
    //             invoiceData={activeInvoice(invoiceId)}
    //             activeInvoiceId={invoiceId}
    //           />
    //         </>
    //       )}
    //     </>
    //   )}
    // </main>
  );
}
