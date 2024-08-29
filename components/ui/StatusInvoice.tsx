import { cn, uppercaseFirstLetter } from "@/lib/utils";

export default function StatusInvoice({
  status,
}: {
  id?: string;
  status?: string | undefined;
}) {
  return (
    <p
      className={cn(
        "col-start-2 row-span-2 row-start-2 flex w-[104px] items-center justify-center rounded-md py-2 text-headingS font-bold first-letter:uppercase sm:col-start-5 sm:row-span-1 sm:row-start-1",
        {
          "bg-[#33D69F] bg-opacity-10 text-[#33D69F]": status === "paid",
          "bg-[#FF8F00] bg-opacity-10 text-[#FF8F00]": status === "pending",
          "bg-[#373B53] bg-opacity-10 text-[#373B53]": status === "draft",
        },
      )}
    >
      <span
        className={cn("mr-2 block aspect-square w-2 rounded", {
          "bg-[#33D69F]": status === "paid",
          "bg-[#FF8F00]": status === "pending",
          "bg-[#373B53]": status === "draft",
        })}
      ></span>
      {uppercaseFirstLetter(status)}
    </p>
  );
}
