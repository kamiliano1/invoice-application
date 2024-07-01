import InvoicesListWrapper from "@/components/InvoicesList/InvoicesListWrapper";
import { SearchParamsType } from "@/types";
export default function HomePage({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  return <InvoicesListWrapper searchParams={searchParams} />;
}
