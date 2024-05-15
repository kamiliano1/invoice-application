"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RedirectButton from "./RedirectButton";
import { useRecoilValue } from "recoil";
import { darkModeState } from "@/atoms/settingsAppAtom";
import clsx from "clsx";
import Link from "next/link";

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
  const isDarkMode = useRecoilValue(darkModeState);
  return (
    <div
      className={clsx("h-full flex justify-center items-center", {
        dark: isDarkMode,
      })}
    >
      <Card
        className={clsx("max-w-[450px] w-[70vw] rounded-xl text-black", {
          "bg-03": isDarkMode,
          "bg-white": !isDarkMode,
        })}
      >
        <CardContent className="flex flex-col space-y-4">
          <CardTitle
            className={clsx(
              {
                "text-white": isDarkMode,
                "text-08": !isDarkMode,
              },
              "text-headingM"
            )}
          >
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
        <CardFooter>
          <Link className="text-06" href="../">
            Back to main Page
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
