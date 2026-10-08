"use client";

import * as React from "react";
import { Drawer } from "@/components/ui/drawer";
import { Chip } from "@/components/ui/chip";
import { Button } from "@/components/ui/button";

export interface FilterState {
  category: string;
  size: string;
  priceRange: string;
  inStockOnly: boolean;
}

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onUpdateFilters: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  filteredCount: number;
}

const SIZES = ["17 cm", "19 cm", "21 cm", "US 7", "US 8", "US 9", "US 10", "One Size"];

const PRICE_RANGES = [
  { id: "all", label: "SEMUA HARGA" },
  { id: "under-500", label: "< RP 500.000" },
  { id: "500-750", label: "RP 500.000 - 750.000" },
  { id: "above-750", label: "> RP 750.000" },
];

export function FilterSheet({
  isOpen,
  onClose,
  filters,
  onUpdateFilters,
  onResetFilters,
  filteredCount,
}: FilterSheetProps) {
  const [draft, setDraft] = React.useState<FilterState>(filters);

  React.useEffect(() => {
    setDraft(filters);
  }, [filters]);

  const handleApply = () => {
    onUpdateFilters(draft);
    onClose();
  };

  const handleReset = () => {
    onResetFilters();
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} position="bottom" title="CATALOG FILTERS">
      <div className="flex flex-col gap-8 pb-16">
        {/* Reset Action in top right */}
        <div className="flex justify-end -mt-2">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-label uppercase text-[#888888] hover:text-white underline underline-offset-4"
          >
            [RESET ALL]
          </button>
        </div>

        {/* Section: Size / Varian Ukuran */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-label uppercase font-bold tracking-widest text-[#AAAAAA]">
            [UKURAN // SIZE]
          </span>
          <div className="flex flex-wrap gap-2">
            <Chip
              selected={draft.size === ""}
              onClick={() => setDraft((prev) => ({ ...prev, size: "" }))}
            >
              SEMUA
            </Chip>
            {SIZES.map((sz) => (
              <Chip
                key={sz}
                selected={draft.size === sz}
                onClick={() =>
                  setDraft((prev) => ({
                    ...prev,
                    size: prev.size === sz ? "" : sz,
                  }))
                }
              >
                {sz}
              </Chip>
            ))}
          </div>
        </div>

        {/* Section: Price Range */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-label uppercase font-bold tracking-widest text-[#AAAAAA]">
            [RENTANG HARGA // PRICE]
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PRICE_RANGES.map((pr) => (
              <button
                key={pr.id}
                type="button"
                onClick={() => setDraft((prev) => ({ ...prev, priceRange: pr.id }))}
                className={`px-3 py-2 text-xs font-label uppercase text-left border transition-colors ${
                  draft.priceRange === pr.id
                    ? "bg-white text-black border-white font-bold"
                    : "bg-[#141414] text-[#888888] border-[#2a2a2a] hover:border-white hover:text-white"
                }`}
              >
                {pr.label}
              </button>
            ))}
          </div>
        </div>

        {/* Section: In-Stock Toggle */}
        <div className="flex items-center justify-between p-4 bg-[#141414] border border-[#2a2a2a]">
          <div className="flex flex-col">
            <span className="text-xs font-label uppercase font-bold text-white tracking-wider">
              HANYA PRODUK TERSEDIA
            </span>
            <span className="text-[11px] text-[#666666] font-body">
              Sembunyikan produk yang stoknya habis
            </span>
          </div>
          <button
            type="button"
            onClick={() =>
              setDraft((prev) => ({ ...prev, inStockOnly: !prev.inStockOnly }))
            }
            className={`w-12 h-6 border transition-colors flex items-center p-0.5 ${
              draft.inStockOnly ? "bg-white border-white justify-end" : "bg-black border-[#444] justify-start"
            }`}
          >
            <span
              className={`w-4 h-4 block ${
                draft.inStockOnly ? "bg-black" : "bg-[#666]"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Sticky Bottom Footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#111111] border-t border-white z-20 flex gap-3">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={handleApply}
        >
          APLIKASIKAN FILTER ({filteredCount} HASIL)
        </Button>
      </div>
    </Drawer>
  );
}
