"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  position?: "bottom" | "left" | "right";
  size?: "sm" | "md" | "lg" | "full" | "auto";
  children: React.ReactNode;
}

export function Drawer({
  isOpen,
  onClose,
  title,
  position = "bottom",
  size = "md",
  children,
}: DrawerProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const positionStyles = {
    bottom: "bottom-0 left-0 right-0 max-h-[88vh] border-t border-white",
    right: "top-0 right-0 bottom-0 h-full w-full max-w-md border-l border-white",
    left: "top-0 left-0 bottom-0 h-full w-full max-w-xs border-r border-white",
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div
        className={cn(
          "fixed bg-[#111111] z-50 flex flex-col shadow-2xl transition-transform duration-200",
          positionStyles[position]
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#222222] bg-[#141414]">
          <h3 className="font-label text-sm uppercase tracking-wider text-white font-bold">
            {title ? `[${title}]` : ""}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#AAAAAA] hover:text-white hover:bg-[#222222] transition-colors"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  );
}
