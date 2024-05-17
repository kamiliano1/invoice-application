import { auth, signOut } from "@/auth";

export default async function SessionPage() {
  const session = await auth();
  return (
    <div className=" bg-10 p-[140px]">
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}
