// "use client";
import { auth } from "@/auth";
import { getUserInvoicesCountById } from "@/data/invoices";
// import useCurrentInvoicesStatus from "@/hooks/useCurrentInvoicesStatus";

export default async function InvoicesCount() {
  const session = await auth();
  const userCount = await getUserInvoicesCountById(session?.user?.id);
  return <CountText userCount={userCount} />;
}

const CountText = ({ userCount }: { userCount: number | null }) => {
  if (userCount === 0) {
    return <p className="text-body">No invoices</p>;
  }
  return userCount !== 1 ? (
    <>
      <p className="text-body sm:hidden">{userCount} invoices</p>
      <p className="text-body hidden sm:block">
        There are {userCount} total invoices
      </p>
    </>
  ) : (
    <>
      <p className="text-body sm:hidden">{userCount} invoice</p>
      <p className="text-body hidden sm:block">
        There are {userCount} total invoice
      </p>
    </>
  );
};
