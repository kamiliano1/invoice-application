"use client";
import { settingsAppState } from "@/atoms/settingsAppAtom";
// import { ProfileForm } from "@/components/InvoicesList/CheckboxFilters";
import InvoicesList from "@/components/InvoicesList/InvoicesList";
import { Button } from "@/components/ui/button";
import useWindowWith from "@/hooks/useWindowWidth";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRecoilState } from "recoil";

export default function Home() {
  const windowWidth = useWindowWith();
  const [isLoading, setIsLoading] = useState(false);
  const [settingsState, setSettingsState] = useRecoilState(settingsAppState);
  return (
    <main
      className={cn(
        "flex flex-col items-start min-h-[calc(100dvh_-72px)] sm:min-h-[calc(100dvh_-_80px)] lg:min-h-[100vh] bg-11 dark:bg-12",
        {
          dark: settingsState.isDarkMode,
        }
      )}
    >
      <InvoicesList />
    </main>
  );
}
