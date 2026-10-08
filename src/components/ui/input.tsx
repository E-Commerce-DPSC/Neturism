import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, label, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-label uppercase text-[#AAAAAA] tracking-wider"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={cn(
            "w-full px-4 py-3 bg-[#111111] text-white text-sm font-body border border-[#333333] placeholder-[#888888] transition-colors focus:outline-none focus:border-white focus:bg-[#161616] disabled:opacity-40 disabled:cursor-not-allowed",
            error && "border-[#FFB4AB] focus:border-[#FFB4AB]",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs font-label text-[#FFB4AB] tracking-wide">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
