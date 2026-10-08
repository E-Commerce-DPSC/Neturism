import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "solid" | "outline" | "error" | "muted";
  size?: "sm" | "md" | "lg";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const sizeStyles = {
    sm: "px-1.5 py-0.2 text-[10px]",
    md: "px-2 py-0.5 text-[11px]",
    lg: "px-2.5 py-1 text-xs",
  };

  const baseStyles =
    "inline-flex items-center font-label font-bold uppercase tracking-wider border select-none";

  const variantStyles = {
    default: "bg-[#111111] text-[#AAAAAA] border-[#333333]",
    solid: "bg-white text-black border-white",
    outline: "bg-transparent text-white border-[#888888]",
    error: "bg-[#220000] text-[#FFB4AB] border-[#FFB4AB]",
    muted: "bg-[#181818] text-[#888888] border-[#222222]",
  };

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}
