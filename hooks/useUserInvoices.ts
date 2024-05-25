import { useSession } from "next-auth/react";
export default function useUserInvoices() {
  const { data } = useSession();
  const userInvoices = data?.user?.invoices;

  return userInvoices;
}
