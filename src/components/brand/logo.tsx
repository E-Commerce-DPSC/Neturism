import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  href?: string | null;
}

export function NeturismEmblem({
  className,
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block shrink-0", className)}
    >
      {/* Central Crucifix */}
      <rect x="22" y="4" width="4" height="40" fill="#FFFFFF" />
      <rect x="10" y="14" width="28" height="4" fill="#FFFFFF" />

      {/* Barbed Gothic Wing Details Left */}
      <path
        d="M22 10L14 6L16 12L8 10L12 16L4 16L10 20L4 24L12 24L6 30L16 28L12 36L22 30V10Z"
        fill="#FFFFFF"
        fillOpacity="0.85"
      />

      {/* Barbed Gothic Wing Details Right */}
      <path
        d="M26 10L34 6L32 12L40 10L36 16L44 16L38 20L44 24L36 24L42 30L32 28L36 36L26 30V10Z"
        fill="#FFFFFF"
        fillOpacity="0.85"
      />

      {/* Central diamond core */}
      <polygon points="24,12 28,16 24,20 20,16" fill="#000000" />
      <polygon points="24,14 26,16 24,18 22,16" fill="#FFFFFF" />
    </svg>
  );
}

export function Logo({
  className,
  size = "md",
  showText = true,
  href = "/",
}: LogoProps) {
  const emblemSizes = {
    sm: 22,
    md: 28,
    lg: 38,
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base tracking-[0.25em]",
    lg: "text-xl tracking-[0.3em]",
  };

  const content = (
    <>
      <NeturismEmblem size={emblemSizes[size]} />
      {showText && (
        <span
          className={cn(
            "font-headline font-bold uppercase text-white tracking-widest",
            textSizes[size]
          )}
        >
          NETURISM
        </span>
      )}
    </>
  );

  const containerClasses = cn(
    "inline-flex items-center gap-3 group select-none transition-opacity hover:opacity-90",
    className
  );

  if (href === null) {
    return <div className={containerClasses}>{content}</div>;
  }

  return (
    <Link href={href} className={containerClasses}>
      {content}
    </Link>
  );
}
