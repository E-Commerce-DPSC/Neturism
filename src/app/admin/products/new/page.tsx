"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProducts } from "@/context/products-context";
import { Product, ProductVariant } from "@/types/product";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { ArrowLeft, Plus, Trash2, CheckCircle } from "lucide-react";

export default function AdminNewProductPage() {
  const router = useRouter();
  const { addProduct } = useProducts();
  const { showToast } = useToast();

  const [name, setName] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [category, setCategory] = React.useState<"gelang" | "cincin" | "kalung" | "tubuh">("gelang");
  const [price, setPrice] = React.useState<number>(550000);
  const [material, setMaterial] = React.useState("Stainless Steel 316L (Raw Brushed Finish)");
  const [description, setDescription] = React.useState("");
  const [specsText, setSpecsText] = React.useState("Lebar profil: 12 mm\nPengait custom clasp\nFinishing raw brushed");
  const [careText, setCareText] = React.useState("Bersihkan dengan kain microfiber kering.\nHindari kontak bahan kimia abrasif.");
  const [isFeatured, setIsFeatured] = React.useState(false);
  const [isNewDrop, setIsNewDrop] = React.useState(true);

  // Variants state
  const [variants, setVariants] = React.useState<
    { size: string; sku: string; stock: number }[]
  >([
    { size: "17 cm", sku: "NTR-BRC-NEW-17", stock: 6 },
    { size: "19 cm", sku: "NTR-BRC-NEW-19", stock: 8 },
    { size: "21 cm", sku: "NTR-BRC-NEW-21", stock: 4 },
  ]);

  // Auto-slugify on name change
  const handleNameChange = (val: string) => {
    setName(val);
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(generatedSlug);
  };

  const handleAddVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        size: "Ukuran Baru",
        sku: `NTR-${category.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`,
        stock: 5,
      },
    ]);
  };

  const handleRemoveVariant = (index: number) => {
    if (variants.length <= 1) {
      showToast("Produk minimal harus memiliki 1 varian.", "error");
      return;
    }
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVariantChange = (
    index: number,
    field: "size" | "sku" | "stock",
    value: string | number
  ) => {
    setVariants((prev) =>
      prev.map((v, i) => (i === index ? { ...v, [field]: value } : v))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast("Nama produk tidak boleh kosong.", "error");
      return;
    }

    const categoryLabels: Record<string, string> = {
      gelang: "Gelang",
      cincin: "Cincin",
      kalung: "Kalung",
      tubuh: "Aksesoris Tubuh",
    };

    const newProductId = `prod-${Date.now().toString().slice(-4)}`;

    const formattedVariants: ProductVariant[] = variants.map((v, idx) => ({
      id: `var-${newProductId}-${idx + 1}`,
      size: v.size,
      sku: v.sku,
      stock: Number(v.stock),
    }));

    // Choose suitable mock image based on category
    let mockImage = "/images/products/bracelet-crucifix-1.svg";
    if (category === "cincin") mockImage = "/images/products/ring-obsidian-1.svg";
    if (category === "kalung") mockImage = "/images/products/necklace-thorn-1.svg";
    if (category === "tubuh") mockImage = "/images/products/earcuff-cross-1.svg";

    const newProduct: Product = {
      id: newProductId,
      name: name.toUpperCase().trim(),
      slug: slug || `product-${Date.now()}`,
      category,
      categoryLabel: categoryLabels[category] || "Aksesoris",
      price: Number(price),
      description:
        description ||
        "Aksesoris berkarakter gothic industrial kurasi Neturism dengan konstruksi presisi.",
      material,
      specifications: specsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      careInstructions: careText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      images: [mockImage],
      isFeatured,
      isNewDrop,
      variants: formattedVariants,
    };

    addProduct(newProduct);
    showToast(`Produk "${newProduct.name}" berhasil dipublikasikan!`, "success");
    router.push("/admin/products");
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      {/* Top Heading */}
      <div className="border-b border-[#222222] pb-6">
        <Link
          href="/admin/products"
          className="flex items-center gap-1.5 text-xs font-mono text-[#888888] hover:text-white transition-colors w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>KEMBALI KE DAFTAR PRODUK</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-2">
          TAMBAH PRODUK BARU
        </h1>
        <p className="text-xs font-body text-[#888888] mt-1">
          Lengkapi data spesifikasi teknis, harga, material, dan varian ukuran stok.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-xs font-mono">
        {/* Section 1: Basic Info */}
        <div className="bg-[#0e0e0e] border border-[#222222] p-6 flex flex-col gap-4">
          <span className="text-xs uppercase font-bold text-white border-b border-[#1c1c1c] pb-2">
            [1. INFORMASI DASAR PRODUK]
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[#888888] block mb-1">NAMA PRODUK *</label>
              <input
                type="text"
                required
                placeholder="Contoh: BARBED WIRE STATEMENT CHOKER"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full bg-[#121212] border border-[#282828] px-3 py-2 text-white focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="text-[#888888] block mb-1">SLUG URL (OTOMATIS)</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-[#121212] border border-[#282828] px-3 py-2 text-[#aaaaaa] focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="text-[#888888] block mb-1">KATEGORI</label>
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as "gelang" | "cincin" | "kalung" | "tubuh")
                }
                className="w-full bg-[#121212] border border-[#282828] px-3 py-2 text-white focus:outline-none focus:border-white"
              >
                <option value="gelang">GELANG (BRACELET)</option>
                <option value="cincin">CINCIN (SIGNET RING)</option>
                <option value="kalung">KALUNG (CHAIN / NECKLACE)</option>
                <option value="tubuh">AKSESORIS TUBUH (BODY PIECE / EAR CUFF)</option>
              </select>
            </div>

            <div>
              <label className="text-[#888888] block mb-1">HARGA DASAR (RP) *</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-[#121212] border border-[#282828] px-3 py-2 text-white focus:outline-none focus:border-white"
              />
            </div>
          </div>

          <div>
            <label className="text-[#888888] block mb-1">MATERIAL LOGAM</label>
            <input
              type="text"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full bg-[#121212] border border-[#282828] px-3 py-2 text-white focus:outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="text-[#888888] block mb-1">DESKRIPSI LENGKAP</label>
            <textarea
              rows={3}
              placeholder="Jelaskan karakter siluet, inspirasi gothic industrial, dan nuansa pemakaian..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#121212] border border-[#282828] px-3 py-2 text-white focus:outline-none focus:border-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 bg-[#121212] border border-[#333333] accent-white"
              />
              <span className="text-white">Tampilkan di Spotlight Beranda (Featured)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isNewDrop}
                onChange={(e) => setIsNewDrop(e.target.checked)}
                className="w-4 h-4 bg-[#121212] border border-[#333333] accent-white"
              />
              <span className="text-white">Label &quot;NEW DROP&quot;</span>
            </label>
          </div>
        </div>

        {/* Section 2: Variants & Stock */}
        <div className="bg-[#0e0e0e] border border-[#222222] p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#1c1c1c] pb-2">
            <span className="text-xs uppercase font-bold text-white">
              [2. VARIAN UKURAN & STOK AWAL]
            </span>
            <button
              type="button"
              onClick={handleAddVariant}
              className="flex items-center gap-1.5 text-xs text-white bg-[#1a1a1a] hover:bg-[#252525] px-2.5 py-1 border border-[#333333]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ TAMBAH UKURAN</span>
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {variants.map((v, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-3 items-center bg-[#121212] p-3 border border-[#262626]"
              >
                <div className="col-span-4">
                  <label className="text-[10px] text-[#666666] block">UKURAN (SIZE)</label>
                  <input
                    type="text"
                    value={v.size}
                    onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                    className="w-full bg-[#181818] border border-[#333333] px-2 py-1 text-white text-xs focus:outline-none"
                  />
                </div>

                <div className="col-span-4">
                  <label className="text-[10px] text-[#666666] block">KODE SKU</label>
                  <input
                    type="text"
                    value={v.sku}
                    onChange={(e) => handleVariantChange(index, "sku", e.target.value)}
                    className="w-full bg-[#181818] border border-[#333333] px-2 py-1 text-[#aaaaaa] text-xs focus:outline-none"
                  />
                </div>

                <div className="col-span-3">
                  <label className="text-[10px] text-[#666666] block">STOK AWAL</label>
                  <input
                    type="number"
                    min="0"
                    value={v.stock}
                    onChange={(e) =>
                      handleVariantChange(index, "stock", Math.max(0, Number(e.target.value)))
                    }
                    className="w-full bg-[#181818] border border-[#333333] px-2 py-1 text-white text-xs focus:outline-none"
                  />
                </div>

                <div className="col-span-1 flex justify-end pt-3">
                  <button
                    type="button"
                    onClick={() => handleRemoveVariant(index)}
                    className="text-[#666666] hover:text-[#FFB4AB] p-1"
                    title="Hapus varian"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Specs & Care */}
        <div className="bg-[#0e0e0e] border border-[#222222] p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[#888888] block mb-1">
              SPESIFIKASI TEKNIS (1 baris = 1 poin)
            </label>
            <textarea
              rows={3}
              value={specsText}
              onChange={(e) => setSpecsText(e.target.value)}
              className="w-full bg-[#121212] border border-[#282828] px-3 py-2 text-white focus:outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="text-[#888888] block mb-1">
              INSTRUKSI PERAWATAN (1 baris = 1 poin)
            </label>
            <textarea
              rows={3}
              value={careText}
              onChange={(e) => setCareText(e.target.value)}
              className="w-full bg-[#121212] border border-[#282828] px-3 py-2 text-white focus:outline-none focus:border-white"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#222222]">
          <Link href="/admin/products">
            <Button variant="secondary" size="md">
              BATAL
            </Button>
          </Link>
          <Button type="submit" variant="primary" size="md" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>PUBLIKASIKAN KE TOKO</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
