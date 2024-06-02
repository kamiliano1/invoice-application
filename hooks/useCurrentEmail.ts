import { useSession } from "next-auth/react";

export default function useCurrentEmail() {
  const { data } = useSession();
  const userEmail = data?.user?.email;
  return userEmail;
}
