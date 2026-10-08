"use client";

import * as React from "react";
import { SlidersHorizontal, ArrowUpDown, Grid2X2, Square } from "lucide-react";
import { cn } from "@/lib/utils";

interface UtilityBarProps {
  totalCount: number;
  onOpenFilter: () => void;
  onOpenSort: () => void;
  activeFilterCount: number;
  currentSortLabel: string;
  viewMode: "grid" | "feed";
  onToggleViewMode: (mode: "grid" | "feed") => void;
}

export function UtilityBar({
  totalCount,
  onOpenFilter,
  onOpenSort,
  activeFilterCount,
  currentSortLabel,
  viewMode,
  onToggleViewMode,
}: UtilityBarProps) {
  return (
    <div className="sticky top-16 md:top-20 z-30 w-full bg-black/95 backdrop-blur-md border-b border-[#222222] py-2.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Pieces Counter */}
        <div className="flex items-center gap-2">
          <span className="font-label text-xs uppercase tracking-wider text-[#AAAAAA] font-bold">
            [{totalCount} PIECES // ACTIVE ARCHIVE]
          </span>
        </div>

        {/* Right: Actions (Sort, Filter, View Mode Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* View mode toggle (Mobile & Desktop) */}
          <div className="hidden sm:flex items-center border border-[#333333] p-0.5">
            <button
              type="button"
              onClick={() => onToggleViewMode("grid")}
              className={cn(
                "p-1.5 transition-colors",
                viewMode === "grid" ? "bg-white text-black" : "text-[#888888] hover:text-white"
              )}
              aria-label="Tampilan grid 2 kolom"
            >
              <Grid2X2 size={14} />
            </button>
            <button
              type="button"
              onClick={() => onToggleViewMode("feed")}
              className={cn(
                "p-1.5 transition-colors",
                viewMode === "feed" ? "bg-white text-black" : "text-[#888888] hover:text-white"
              )}
              aria-label="Tampilan feed 1 kolom"
            >
              <Square size={14} />
            </button>
          </div>

          {/* Sort Button */}
          <button
            type="button"
            onClick={onOpenSort}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] border border-[#333333] hover:border-white text-xs font-label uppercase text-white transition-colors"
          >
            <ArrowUpDown size={13} className="text-[#888888]" />
            <span className="hidden sm:inline">URUTKAN:</span>
            <span className="font-bold">{currentSortLabel}</span>
          </button>

          {/* Filter Button */}
          <button
            type="button"
            onClick={onOpenFilter}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 border text-xs font-label uppercase transition-colors relative",
              activeFilterCount > 0
                ? "bg-white text-black border-white font-bold"
                : "bg-[#141414] text-white border-[#333333] hover:border-white"
            )}
          >
            <SlidersHorizontal size={13} />
            <span>FILTER</span>
            {activeFilterCount > 0 && (
              <span className="ml-1 px-1 bg-black text-white text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
