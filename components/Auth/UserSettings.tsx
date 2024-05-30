import { logout } from "@/actions/logout";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

export default function UserSettings() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isInvoiceEdit = !!searchParams.get("userSetting");
  const logoutUser = () => {
    logout();
    router.push("/login");
  };
  return (
    <div
      className={cn(
        "duration-500 w-full sm:absolute sm:top-0 sm:-translate-x-full grid sm:grid-cols-[minmax(0,_616px)_auto] lg:grid-cols-[minmax(0,_719px)_auto] overflow-y-scroll z-[5] min-h-full",
        {
          "sm:translate-x-0": isInvoiceEdit,
        }
      )}
    >
      <div className="max-w-[616px] sm:w-[616px] lg:ml-[103px] sm:min-h-[calc(100vh_-_80px)] lg:h-fit flex flex-col rounded-tr-[20px] dark:bg-12 bg-white">
        <h2 className="text-[5rem]">Ustawienia</h2>
        <button onClick={logoutUser}>Logout</button>
      </div>
      <div
        onClick={() => router.back()}
        className={cn("delay-200 duration-500 h-full", {
          "bg-12/50": isInvoiceEdit,
        })}
      ></div>
    </div>
  );
}
