import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RedirectButton({
  redirectButtonLabel,
  redirectButtonDescription,
  redirectLink,
}: {
  redirectButtonLabel: string;
  redirectButtonDescription: string;
  redirectLink: string;
}) {
  return (
    <span className="flex text-06">
      {redirectButtonDescription}
      <Link href={redirectLink} className="text-01">
        <span className="ml-2">{redirectButtonLabel}</span>
      </Link>
    </span>
  );
}
