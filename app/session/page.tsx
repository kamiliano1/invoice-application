import { auth } from "@/auth";

export default async function SessionPage() {
  const session = await auth();
  return <div className="ml-20">{JSON.stringify(session)}</div>;
}
