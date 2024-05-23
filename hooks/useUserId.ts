import { useSession } from "next-auth/react";

export default function useUserId() {
  const { data } = useSession();
  const userId = data?.user?.id;
  return userId;
}
