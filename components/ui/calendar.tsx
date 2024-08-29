"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DateFormatter, DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const formatCaption: DateFormatter = (month) => {
  return <>{format(month, "MMM yyyy")}</>;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      formatters={{ formatCaption }}
      showOutsideDays={showOutsideDays}
      className={cn("rounded-xl bg-white p-3 dark:bg-04", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: "",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "hidden",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative text-08 dark:text-05 font-bold",
        day: "h-9 w-9 rounded-full p-0 font-normal aria-selected:opacity-100 hover:text-01",
        day_range_end: "day-range-end",
        day_selected: "text-01/70",
        day_today:
          "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50",
        day_outside: "text-08/20 dark:text-05/20",
        day_disabled: "text-slate-500 opacity-50 dark:text-slate-400",
        day_range_middle:
          "aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <>
            <ChevronLeft className="h-4 w-4 text-01" />
          </>
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight className="h-4 w-4 text-01" />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
