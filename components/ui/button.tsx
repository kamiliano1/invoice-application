import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import Spinner from "@/components/ui/Spinner";

const buttonVariants = cva(
  "rounded-3xl text-headingS font-bold flex items-center justify-center",
  {
    variants: {
      variant: {
        violetWithPlusIcon: "text-white bg-01 hover:bg-02 pr-4 pl-1",
        violet: "text-white bg-01 hover:bg-02 px-3",
        light:
          "text-07 bg-[#F9FAFE] hover:bg-[#DFE3FA] px-3 dark:text-05 dark:bg-04 dark:hover:bg-05 dark:hover:bg-white",
        dark: "text-06 bg-[#373B53] hover:bg-08 px-3 dark:text-05 dark:bg-[#373B53] dark:hover:bg-03",
        red: "text-white bg-09 hover:bg-10 px-3",
        grey: "text-07 bg-[#F9FAFE] hover:bg-[#DFE3FA] hover:bg-opacity-55",
      },
      size: {
        default: "h-[48px] px-3 sm:px-6",
        full: "w-full",
      },
    },
    defaultVariants: {
      variant: "violet",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, loading, children, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            {variant === "violetWithPlusIcon" && (
              <span className="bg-11 text-01 text-[1.3rem] pt-1 leading-1 flex rounded-full justify-center items-center h-[32px] aspect-square mr-5">
                +
              </span>
            )}
            {children}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
