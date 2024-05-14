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
        "flex items-center text-headingS font-bold text-08 dark:text-white sm:px-10 sm:pt-14",
        className
      )}
      href={backLink}
    >
      <MdKeyboardArrowLeft className="text-headingM text-01 mr-5" /> Go back
    </Link>
  );
}
