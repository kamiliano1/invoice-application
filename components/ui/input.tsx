import * as React from "react";

import { cn } from "@/lib/utils";
import clsx from "clsx";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={clsx(
          "text-headingS py-3 px-3 border-[1px] rounded focus:border-01  focus:border-[1px] outline-none caret-01 w-full mb-3 sm:mb-0 peer-hover:border-01 hover:border-01 text-black bg-05 dark:text-white dark:bg-03 border-transparent",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
