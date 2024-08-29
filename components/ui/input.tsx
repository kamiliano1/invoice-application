import * as React from "react";

import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "mb-3 w-full rounded border-[1px] bg-05 px-3 py-3 text-headingS text-black caret-01 outline-none hover:border-01 focus:border-[1px] focus:border-01 peer-hover:border-01 sm:mb-0 dark:bg-03 dark:text-white",
          className,
          { "border-09": error, "border-transparent": !error },
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
