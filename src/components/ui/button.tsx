import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-300 ease-out-expo focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#fafafa] text-[#050505] rounded-button hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(255,255,255,0.12)]",
        secondary:
          "bg-transparent border border-[rgba(255,255,255,0.08)] text-[#888] rounded-button hover:border-[rgba(255,255,255,0.16)] hover:text-white hover:-translate-y-0.5",
        ghost:
          "bg-transparent text-[#888] hover:text-white",
        accent:
          "bg-accent text-[#050505] rounded-button hover:-translate-y-0.5 hover:shadow-[0_0_60px_rgba(74,222,128,0.15)]",
      },
      size: {
        default: "px-7 sm:px-[42px] py-[14px] sm:py-[17px] text-[14px] sm:text-[15px] tracking-[0.5px]",
        sm: "px-6 py-2.5 text-[13px]",
        lg: "px-12 py-5 text-[15px] tracking-[0.5px]",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
