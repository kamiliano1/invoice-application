"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import RedirectButton from "@/components/Auth/RedirectButton";
import { cn } from "@/lib/utils";

type CardWrapperType = {
  children: React.ReactNode;
  headerLabel: string;
  headerDescription: string;
  redirectButtonLabel: string;
  redirectButtonDescription: string;
  redirectLink: string;
};

export default function CardWrapper({
  children,
  headerLabel,
  headerDescription,
  redirectButtonLabel,
  redirectButtonDescription,
  redirectLink,
}: CardWrapperType) {
  return (
    <div className="flex items-center justify-center px-4 max-lg:h-[calc(100%_-80px)] max-sm:h-[calc(100%_-72px)] lg:h-full">
      <Card className="w-full max-w-[450px] rounded-xl bg-white text-black dark:bg-03">
        <CardContent className="flex flex-col space-y-4">
          <CardTitle className={cn("text-headingM text-08 dark:text-white")}>
            {headerLabel}
          </CardTitle>
          <CardDescription className="leading-[22px] text-06">
            {headerDescription}
          </CardDescription>
          {children}

          <RedirectButton
            redirectButtonDescription={redirectButtonDescription}
            redirectButtonLabel={redirectButtonLabel}
            redirectLink={redirectLink}
          />
        </CardContent>
      </Card>
    </div>
  );
}
