import { useSession } from "next-auth/react";

export default function useCurrentUser() {
  const { data } = useSession();
  const userId = data?.user?.id;
  return userId;
}
