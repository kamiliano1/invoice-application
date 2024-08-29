import { cn } from "@/lib/utils";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function BackButton({
  className,
  backLink,
}: {
  className?: string;
  backLink: string;
}) {
  return (
    <Link
      className={cn(
        "flex items-center text-headingS font-bold text-08 sm:px-10 sm:pt-14 dark:text-white",
        className,
      )}
      href={backLink}
    >
      <MdKeyboardArrowLeft className="mr-5 text-headingM text-01" /> Go back
    </Link>
  );
}
