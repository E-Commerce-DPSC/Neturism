"use client";

import * as React from "react";
import { Drawer } from "@/components/ui/drawer";
import { Check } from "lucide-react";

export type SortOption = "latest" | "price-asc" | "price-desc" | "popular";

interface SortSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentSort: SortOption;
  onSelectSort: (sort: SortOption) => void;
}

const SORT_OPTIONS: { id: SortOption; label: string; code: string }[] = [
  { id: "latest", label: "TERBARU", code: "LATEST DROP" },
  { id: "popular", label: "PALING BANYAK DICARI", code: "SIGNATURE ARCHIVE" },
  { id: "price-asc", label: "HARGA: TERENDAH KE TERTINGGI", code: "LOW → HIGH" },
  { id: "price-desc", label: "HARGA: TERTINGGI KE TERENDAH", code: "HIGH → LOW" },
];

export function SortSheet({
  isOpen,
  onClose,
  currentSort,
  onSelectSort,
}: SortSheetProps) {
  const handleSelect = (sort: SortOption) => {
    onSelectSort(sort);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} position="bottom" title="SORT CATALOG">
      <div className="flex flex-col divide-y divide-[#1f1f1f] py-2">
        {SORT_OPTIONS.map((opt) => {
          const isSelected = currentSort === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelect(opt.id)}
              className="py-4 px-2 flex items-center justify-between text-left group hover:bg-[#181818] transition-colors"
            >
              <div className="flex flex-col gap-0.5">
                <span
                  className={`text-xs font-label uppercase tracking-wider ${
                    isSelected ? "text-white font-bold" : "text-[#AAAAAA] group-hover:text-white"
                  }`}
                >
                  {opt.label}
                </span>
                <span className="text-[10px] font-label text-[#555555]">
                  [{opt.code}]
                </span>
              </div>

              {isSelected && (
                <span className="p-1 bg-white text-black font-bold">
                  <Check size={14} strokeWidth={3} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </Drawer>
  );
}
