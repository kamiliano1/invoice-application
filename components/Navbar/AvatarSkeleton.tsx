import { Skeleton } from "../ui/skeleton";

export default function AvatarSkeleton() {
  return (
    <>
      <Skeleton className="rounded-full mr-4 lg:hidden size-8 dark:bg-slate-400" />
      <Skeleton className="hidden rounded-full lg:block mb-6 size-10 dark:bg-slate-400" />
    </>
  );
}
