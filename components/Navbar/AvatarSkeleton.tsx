import { Skeleton } from "../ui/skeleton";

export default function AvatarSkeleton() {
  return (
    <>
      <Skeleton className="mr-4 size-8 rounded-full lg:hidden dark:bg-slate-400" />
      <Skeleton className="mb-6 hidden size-10 rounded-full lg:block dark:bg-slate-400" />
    </>
  );
}
