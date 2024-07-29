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
    <div className="h-full flex justify-center items-center">
      <Card
        className={cn(
          "max-w-[450px] w-[70vw] rounded-xl text-black bg-white dark:bg-03",
          {}
        )}
      >
        <CardContent className="flex flex-col space-y-4">
          <CardTitle className={cn("text-headingM text-08 dark:text-white")}>
            {headerLabel}
          </CardTitle>
          <CardDescription className="text-06 leading-[22px]">
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
