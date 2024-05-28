import { Skeleton } from "@/components/ui/skeleton";

export default function InvoiceItemSkeleton() {
  return (
    <>
      {[0, 1, 2, 3].map((item) => (
        <Skeleton key={item} className="w-full h-[89.33px]" />
      ))}
    </>
  );
}
