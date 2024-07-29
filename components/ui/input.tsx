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
          "text-headingS py-3 px-3 border-[1px] rounded focus:border-01  focus:border-[1px] outline-none caret-01 w-full mb-3 sm:mb-0 peer-hover:border-01 hover:border-01 text-black bg-05 dark:text-white dark:bg-03",
          className,
          { "border-09": error, "border-transparent": !error }
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
