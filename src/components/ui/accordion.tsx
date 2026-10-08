"use client";

import * as React from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="border-b border-[#222222]">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full py-4 flex items-center justify-between text-left group hover:text-white transition-colors"
      >
        <span className="font-label text-xs uppercase font-bold tracking-wider text-[#AAAAAA] group-hover:text-white">
          [{title}]
        </span>
        <span className="text-[#888888] group-hover:text-white">
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>

      {isOpen && (
        <div className="pb-5 pt-1 text-xs text-[#AAAAAA] font-body leading-relaxed space-y-2 animate-in fade-in duration-150">
          {children}
        </div>
      )}
    </div>
  );
}

export function Accordion({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("border-t border-[#222222]", className)}>{children}</div>;
}
