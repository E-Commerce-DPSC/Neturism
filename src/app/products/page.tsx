"use client";

import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/product/product-card";
import { UtilityBar } from "@/components/catalog/utility-bar";
import { CategoryPills } from "@/components/catalog/category-pills";
import { FilterSheet, FilterState } from "@/components/catalog/filter-sheet";
import { SortSheet, SortOption } from "@/components/catalog/sort-sheet";
import { PRODUCTS } from "@/lib/data/products";
import { Product } from "@/types/product";
import { Search, X } from "lucide-react";
import { useSearchParams } from "next/navigation";

const CATEGORIES = [
  { id: "all", label: "SEMUA KOLEKSI" },
  { id: "gelang", label: "GELANG // BRACELETS" },
  { id: "cincin", label: "CINCIN // SIGNET RINGS" },
  { id: "kalung", label: "KALUNG // CHAINS" },
  { id: "tubuh", label: "AKSESORIS TUBUH" },
  { id: "pendukung", label: "PENDUKUNG" },
];

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("kategori") || "all";

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState(initialCategory);
  const [viewMode, setViewMode] = React.useState<"grid" | "feed">("grid");

  // Filters State
  const [filters, setFilters] = React.useState<FilterState>({
    category: initialCategory,
    size: "",
    priceRange: "all",
    inStockOnly: false,
  });

  const [sortOption, setSortOption] = React.useState<SortOption>("latest");

  // Modals state
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [isSortOpen, setIsSortOpen] = React.useState(false);

  // Sync category param if url changes
  React.useEffect(() => {
    const cat = searchParams.get("kategori") || "all";
    setSelectedCategory(cat);
    setFilters((prev) => ({ ...prev, category: cat }));
  }, [searchParams]);

  const handleSelectCategoryPill = (catId: string) => {
    setSelectedCategory(catId);
    setFilters((prev) => ({ ...prev, category: catId }));
  };

  // Filter Logic
  const filteredProducts = React.useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (filters.category !== "all" && p.category !== filters.category) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesMaterial = p.material.toLowerCase().includes(query);
        const matchesSku = p.variants.some((v) => v.sku.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesMaterial && !matchesSku) {
          return false;
        }
      }

      // Size Filter
      if (filters.size && !p.variants.some((v) => v.size === filters.size && v.stock > 0)) {
        return false;
      }

      // Price Range Filter
      if (filters.priceRange === "under-500" && p.price >= 500000) return false;
      if (
        filters.priceRange === "500-750" &&
        (p.price < 500000 || p.price > 750000)
      )
        return false;
      if (filters.priceRange === "above-750" && p.price <= 750000) return false;

      // In-Stock Only
      if (filters.inStockOnly) {
        const totalStock = p.variants.reduce((acc, v) => acc + v.stock, 0);
        if (totalStock <= 0) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      if (sortOption === "popular") return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      return 0; // Default latest
    });
  }, [filters, searchQuery, sortOption]);

  // Active filter count
  const activeFilterCount =
    (filters.category !== "all" ? 1 : 0) +
    (filters.size ? 1 : 0) +
    (filters.priceRange !== "all" ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0);

  const resetAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setFilters({
      category: "all",
      size: "",
      priceRange: "all",
      inStockOnly: false,
    });
    setSortOption("latest");
  };

  const sortLabels: Record<SortOption, string> = {
    latest: "TERBARU",
    popular: "POPULER",
    "price-asc": "HARGA: RENDAH",
    "price-desc": "HARGA: TINGGI",
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="flex-1 flex flex-col">
        {/* Top Header Title & Search Input */}
        <section className="w-full bg-[#0a0a0a] border-b border-[#222222] py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-label text-xs uppercase tracking-widest text-[#888888]">
                [COLLECTION ARCHIVE // CURATED PIECES]
              </span>
              <h1 className="font-headline text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                Katalog Produk
              </h1>
            </div>

            {/* Quick Search Bar */}
            <div className="relative w-full max-w-xl mt-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama gelang, cincin, SKU, atau material..."
                className="w-full pl-11 pr-10 py-3 bg-[#111111] border border-[#333333] text-sm text-white placeholder-[#888888] font-body focus:outline-none focus:border-white transition-colors"
              />
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888888]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#888888] hover:text-white"
                  aria-label="Hapus kata kunci pencarian"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* 1. Sticky Compact Utility Bar */}
        <UtilityBar
          totalCount={filteredProducts.length}
          onOpenFilter={() => setIsFilterOpen(true)}
          onOpenSort={() => setIsSortOpen(true)}
          activeFilterCount={activeFilterCount}
          currentSortLabel={sortLabels[sortOption]}
          viewMode={viewMode}
          onToggleViewMode={setViewMode}
        />

        {/* 2. Quick Horizontal Pills (Categories) */}
        <CategoryPills
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategoryPill}
        />

        {/* 3. Active Filter Tags Bar */}
        {activeFilterCount > 0 && (
          <div className="w-full bg-[#0d0d0d] border-b border-[#222222] py-2.5 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-2 text-xs font-label">
              <span className="text-[#666666] uppercase text-[11px] mr-1">
                FILTER AKTIF:
              </span>

              {filters.category !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#1a1a1a] border border-[#333333] text-white">
                  KATEGORI: {filters.category.toUpperCase()}
                  <button
                    type="button"
                    onClick={() => handleSelectCategoryPill("all")}
                    className="hover:text-[#FFB4AB]"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {filters.size && (
                <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#1a1a1a] border border-[#333333] text-white">
                  UKURAN: {filters.size}
                  <button
                    type="button"
                    onClick={() => setFilters((prev) => ({ ...prev, size: "" }))}
                    className="hover:text-[#FFB4AB]"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {filters.priceRange !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#1a1a1a] border border-[#333333] text-white">
                  HARGA
                  <button
                    type="button"
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, priceRange: "all" }))
                    }
                    className="hover:text-[#FFB4AB]"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {filters.inStockOnly && (
                <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#1a1a1a] border border-[#333333] text-white">
                  STOK TERSEDIA
                  <button
                    type="button"
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, inStockOnly: false }))
                    }
                    className="hover:text-[#FFB4AB]"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={resetAllFilters}
                className="text-[#888888] hover:text-white underline underline-offset-4 ml-2"
              >
                [RESET ALL]
              </button>
            </div>
          </div>
        )}

        {/* 4. Products Grid */}
        <section className="w-full py-8 px-4 sm:px-6 lg:px-8 flex-1">
          <div className="max-w-7xl mx-auto">
            {filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === "feed"
                    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
                    : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-6"
                }
              >
                {filteredProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            ) : (
              /* Brutalist Empty State */
              <div className="w-full py-24 px-6 border border-[#222222] bg-[#111111] text-center flex flex-col items-center justify-center gap-4 my-8">
                <span className="font-label text-xs uppercase tracking-widest text-[#888888]">
                  [NO PIECES FOUND]
                </span>
                <h3 className="font-headline text-lg sm:text-xl font-bold uppercase text-white">
                  Koleksi dengan kriteria ini belum tersedia di vault kami.
                </h3>
                <p className="font-body text-xs text-[#888888] max-w-md">
                  Coba gunakan kata kunci lain, hapus filter ukuran, atau pilih kategori utama untuk melihat katalog aktif.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="px-6 py-3 bg-white text-black font-label text-xs uppercase font-bold tracking-wider hover:bg-black hover:text-white border border-white transition-colors"
                  >
                    [RESET FILTER // LIHAT SEMUA]
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Filter Bottom Sheet */}
      <FilterSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onUpdateFilters={setFilters}
        onResetFilters={resetAllFilters}
        filteredCount={filteredProducts.length}
      />

      {/* Sort Bottom Action Sheet */}
      <SortSheet
        isOpen={isSortOpen}
        onClose={() => setIsSortOpen(false)}
        currentSort={sortOption}
        onSelectSort={setSortOption}
      />

      <Footer />
    </div>
  );
}

export default function CatalogPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center font-label text-xs uppercase tracking-widest">
          MEMUAT KATALOG NETURISM...
        </div>
      }
    >
      <CatalogContent />
    </React.Suspense>
  );
}
