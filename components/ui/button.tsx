import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import Spinner from "@/components/ui/Spinner";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "rounded-3xl text-headingS font-bold flex items-center justify-center",
  {
    variants: {
      variant: {
        violetWithPlusIcon: "text-white bg-01 hover:bg-02 pr-4 pl-1",
        violet: "text-white bg-01 hover:bg-02 px-3",
        light: "text-07 bg-[#F9FAFE] hover:bg-[#DFE3FA] px-3",
        lightDarkMode: "bg-04 text-05 hover:bg-white px-3",
        dark: "text-06 bg-[#373B53] hover:bg-08 px-3",
        darkDarkMode: "text-05 bg-[#373B53] hover:bg-03",
        red: "text-white bg-09 hover:bg-10 px-3",
        grey: "text-07 bg-[#F9FAFE] hover:bg-[#DFE3FA] hover:bg-opacity-55",
      },
      size: {
        default: "h-[48px] px-3",
        small: "h-[40px] pl-2 pr-3.5 sm:px-6",
        full: "h-[48px] w-full",
      },
    },
    defaultVariants: {
      variant: "violet",
      size: "default",
    },
  },
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
    ref,
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
              <span className="leading-1 mr-2 flex aspect-square h-[32px] items-center justify-center rounded-full bg-11 pt-1 text-[1.3rem] text-01">
                +
              </span>
            )}
            {children}
          </>
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
