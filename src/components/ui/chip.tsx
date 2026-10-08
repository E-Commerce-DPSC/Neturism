import * as React from "react";
import { cn } from "@/lib/utils";

export interface ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  outOfStock?: boolean;
}

export function Chip({
  className,
  selected = false,
  outOfStock = false,
  disabled,
  children,
  ...props
}: ChipProps) {
  return (
    <button
      type="button"
      disabled={disabled || outOfStock}
      className={cn(
        "inline-flex items-center justify-center px-3 py-2 text-xs font-label uppercase tracking-wider border transition-colors select-none min-h-[38px] min-w-[42px]",
        selected
          ? "bg-white text-black border-white font-bold"
          : "bg-[#111111] text-[#AAAAAA] border-[#333333] hover:border-white hover:text-white",
        outOfStock &&
          "bg-[#0a0a0a] text-[#555555] border-[#222222] line-through cursor-not-allowed hover:border-[#222222] hover:text-[#555555]",
        disabled && !outOfStock && "opacity-40 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
