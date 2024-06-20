"use client";
import InvoicesListWrapper from "@/components/InvoicesList/InvoicesListWrapper";
import { Button } from "@/components/ui/button";
import { getSession, signOut, useSession } from "next-auth/react";
export default function HomePage() {
  const wylogownie = () => {
    signOut();
  };
  const { update, data } = useSession();
  // return <InvoicesListWrapper />;
  async function myFunction() {
    const session = await getSession();
    console.log("session", session);
    update(session);
  }
  return (
    <div className="p-[20rem]">
      {JSON.stringify(data)}
      <Button onClick={wylogownie} className="text-headingS text-white">
        Wylogouj
      </Button>
      <Button onClick={() => update()} className="text-headingS text-white">
        update
      </Button>
      <Button onClick={myFunction} className="text-headingS text-white">
        getSession
      </Button>
    </div>
  );
}
