import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "text" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-label font-bold tracking-wider uppercase transition-all duration-150 select-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none";

    const sizeStyles = {
      sm: "px-3 py-1.5 text-xs min-h-[36px]",
      md: "px-5 py-3 text-sm min-h-[44px]",
      lg: "px-7 py-4 text-base min-h-[52px]",
    };

    const variantStyles = {
      primary:
        "bg-white text-black hover:bg-black hover:text-white border-2 border-white hover:shadow-brutal-sm active:translate-x-[2px] active:translate-y-[2px]",
      secondary:
        "bg-black text-white border border-[#888888] hover:border-white hover:bg-[#181818] active:translate-x-[1px] active:translate-y-[1px]",
      outline:
        "bg-[#111111] text-white border border-[#333333] hover:border-white hover:bg-[#181818]",
      text:
        "bg-transparent text-white border-b border-transparent hover:border-white px-0 py-1 min-h-0",
      danger:
        "bg-black text-[#FFB4AB] border border-[#FFB4AB] hover:bg-[#FFB4AB] hover:text-black",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
