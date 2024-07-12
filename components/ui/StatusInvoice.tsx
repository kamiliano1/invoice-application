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
        "font-bold text-headingS items-center py-2 w-[104px] justify-center rounded-md first-letter:uppercase flex row-start-2 col-start-2 row-span-2 sm:row-start-1 sm:col-start-5 sm:row-span-1",
        {
          "text-[#33D69F] bg-[#33D69F] bg-opacity-10": status === "paid",
          "text-[#FF8F00] bg-[#FF8F00] bg-opacity-10": status === "pending",
          "text-[#373B53] bg-[#373B53] bg-opacity-10": status === "draft",
        }
      )}
    >
      <span
        className={cn("w-2 rounded aspect-square block mr-2 ", {
          "bg-[#33D69F]": status === "paid",
          "bg-[#FF8F00]": status === "pending",
          "bg-[#373B53]": status === "draft",
        })}
      ></span>
      {uppercaseFirstLetter(status)}
    </p>
  );
}
