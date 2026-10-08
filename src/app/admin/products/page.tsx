"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useProducts } from "@/context/products-context";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import {
  Plus,
  Search,
  AlertTriangle,
  CheckCircle,
  Package,
  Trash2,
  ExternalLink,
  RotateCcw,
} from "lucide-react";

export default function AdminProductsPage() {
  const { products, updateVariantStock, deleteProduct, resetProducts } = useProducts();
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredProducts = products.filter((prod) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchName = prod.name.toLowerCase().includes(q);
    const matchCat = prod.categoryLabel.toLowerCase().includes(q);
    const matchSku = prod.variants.some((v) => v.sku.toLowerCase().includes(q));
    return matchName || matchCat || matchSku;
  });

  const handleStockChange = (
    productId: string,
    variantId: string,
    currentStock: number,
    delta: number
  ) => {
    const newStock = Math.max(0, currentStock + delta);
    updateVariantStock(productId, variantId, newStock);
    showToast(`Stok diperbarui: ${newStock} unit`, "info");
  };

  const handleDeleteProduct = (productId: string, productName: string) => {
    if (confirm(`Yakin ingin menghapus produk "${productName}" dari katalog?`)) {
      deleteProduct(productId);
      showToast(`Produk "${productName}" dihapus dari katalog.`, "error");
    }
  };

  const handleResetCatalog = () => {
    if (confirm("Kembalikan katalog produk dan stok ke data default Neturism?")) {
      resetProducts();
      showToast("Katalog berhasil di-reset ke default awal.", "success");
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Top Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222222] pb-6">
        <div>
          <span className="text-xs font-mono text-[#888888] tracking-widest uppercase">
            [MANAJEMEN INVENTARIS]
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-1">
            KATALOG & STOK VARIAN
          </h1>
          <p className="text-xs font-body text-[#888888] mt-1">
            Kontrol stok fisik setiap ukuran (size), tinjau SKU, serta tambahkan koleksi baru ke toko.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetCatalog}
            className="flex items-center gap-1.5 text-xs font-mono text-[#888888] hover:text-white px-3 py-2 border border-[#222222] hover:border-[#444444] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET DEFAULT</span>
          </button>

          <Link href="/admin/products/new">
            <Button variant="primary" size="sm" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>+ TAMBAH PRODUK</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
        <input
          type="text"
          placeholder="Cari berdasarkan nama produk, kategori, atau kode SKU..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#0d0d0d] border border-[#222222] pl-10 pr-4 py-2.5 text-xs font-mono text-white placeholder-[#555555] focus:outline-none focus:border-white transition-colors"
        />
      </div>

      {/* Products Inventory List */}
      <div className="flex flex-col gap-4">
        {filteredProducts.map((product) => {
          const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
          const hasZeroStock = product.variants.some((v) => v.stock === 0);

          return (
            <div
              key={product.id}
              className="bg-[#0e0e0e] border border-[#222222] hover:border-[#383838] transition-colors p-5 flex flex-col gap-5"
            >
              {/* Product Top Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 bg-[#141414] border border-[#262626] shrink-0 overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono px-1.5 py-0.5 bg-[#181818] border border-[#333333] text-[#aaaaaa]">
                        {product.categoryLabel.toUpperCase()}
                      </span>
                      {product.isFeatured && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 border border-white text-white font-bold">
                          FEATURED
                        </span>
                      )}
                      {product.isNewDrop && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-white text-black font-bold">
                          NEW DROP
                        </span>
                      )}
                    </div>

                    <h2 className="text-sm sm:text-base font-heading font-bold text-white mt-1">
                      {product.name}
                    </h2>
                    <p className="text-xs font-mono text-[#888888] mt-0.5">
                      {formatRupiah(product.price)} • Material: {product.material}
                    </p>
                  </div>
                </div>

                {/* Right summary & view link */}
                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-[#1c1c1c] pt-3 md:pt-0">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] font-mono text-[#666666] block uppercase">
                      TOTAL STOK GUDANG
                    </span>
                    <span
                      className={`text-sm font-mono font-bold ${
                        totalStock === 0
                          ? "text-[#FFB4AB]"
                          : totalStock <= 5
                          ? "text-yellow-400"
                          : "text-white"
                      }`}
                    >
                      {totalStock} UNIT
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/products/${product.slug}`}
                      target="_blank"
                      className="p-2 border border-[#262626] hover:border-white text-[#888888] hover:text-white transition-colors"
                      title="Lihat di Storefront"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDeleteProduct(product.id, product.name)}
                      className="p-2 border border-[#262626] hover:border-[#FFB4AB] text-[#666666] hover:text-[#FFB4AB] transition-colors"
                      title="Hapus Produk"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Variant Stock Grid Editor */}
              <div className="border-t border-[#1c1c1c] pt-4">
                <span className="text-[10px] font-mono text-[#666666] uppercase block mb-3">
                  STOK FISIK PER UKURAN (KLIK +/- UNTUK UBAH LANGSUNG)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {product.variants.map((variant) => (
                    <div
                      key={variant.id}
                      className={`p-3 bg-[#121212] border flex flex-col justify-between gap-2 ${
                        variant.stock === 0
                          ? "border-[#FFB4AB]/40 bg-[#160d0d]"
                          : variant.stock <= 3
                          ? "border-yellow-600/40"
                          : "border-[#242424]"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-bold text-white">{variant.size}</span>
                        <span className="text-[10px] text-[#666666]">{variant.sku}</span>
                      </div>

                      <div className="flex items-center justify-between mt-1">
                        <span
                          className={`text-xs font-mono ${
                            variant.stock === 0
                              ? "text-[#FFB4AB] font-bold"
                              : "text-[#cccccc]"
                          }`}
                        >
                          {variant.stock === 0 ? "HABIS (0)" : `${variant.stock} unit`}
                        </span>

                        <div className="flex items-center border border-[#333333] bg-[#0c0c0c]">
                          <button
                            onClick={() =>
                              handleStockChange(product.id, variant.id, variant.stock, -1)
                            }
                            disabled={variant.stock <= 0}
                            className="px-2 py-0.5 text-xs font-mono text-[#888888] hover:text-white disabled:opacity-30 hover:bg-[#222222]"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 text-xs font-mono text-white font-bold border-x border-[#333333]">
                            {variant.stock}
                          </span>
                          <button
                            onClick={() =>
                              handleStockChange(product.id, variant.id, variant.stock, 1)
                            }
                            className="px-2 py-0.5 text-xs font-mono text-[#888888] hover:text-white hover:bg-[#222222]"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
