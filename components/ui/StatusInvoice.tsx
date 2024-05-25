import { cn } from "@/lib/utils";
import { StatusInvoiceType } from "@/schemas";

const uppercaseFirstLetter = (word: string) => {
  if (!word) return undefined;
  return `${word[0].toUpperCase()}${word.slice(1)}`;
};
export default function StatusInvoice({
  status,
}: {
  status: StatusInvoiceType;
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
