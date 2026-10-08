"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CategoryPillsProps {
  categories: { id: string; label: string }[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export function CategoryPills({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryPillsProps) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-3 px-4 sm:px-6 lg:px-8 border-b border-[#1c1c1c] bg-black">
      <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-2.5 min-w-max">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                "px-3.5 py-1.5 text-xs font-label uppercase tracking-wider border transition-all duration-150 select-none whitespace-nowrap min-h-[36px]",
                isSelected
                  ? "bg-white text-black border-white font-bold"
                  : "bg-[#111111] text-[#888888] border-[#222222] hover:border-[#888888] hover:text-white"
              )}
            >
              [{cat.label}]
            </button>
          );
        })}
      </div>
    </div>
  );
}
