"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { SizeGuideModal } from "@/components/product/size-guide-modal";
import { ProductCard } from "@/components/product/product-card";
import { PRODUCTS } from "@/lib/data/products";
import { formatRupiah } from "@/lib/utils";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/components/ui/toast";
import { Ruler, ArrowLeft } from "lucide-react";

interface ProductDetailViewProps {
  slug: string;
}

export function ProductDetailView({ slug }: ProductDetailViewProps) {
  const router = useRouter();
  const product = PRODUCTS.find((p) => p.slug === slug);

  const [activeImageIndex, setActiveImageIndex] = React.useState(0);
  const [selectedVariantId, setSelectedVariantId] = React.useState<string>("");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = React.useState(false);

  const { addItem } = useCart();
  const { showToast } = useToast();

  // Initialize first available variant on load
  React.useEffect(() => {
    if (product) {
      const firstAvailable = product.variants.find((v) => v.stock > 0);
      if (firstAvailable) {
        setSelectedVariantId(firstAvailable.id);
      }
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <span className="font-label text-xs uppercase text-[#888888] mb-2">
            [PRODUCT NOT FOUND]
          </span>
          <h1 className="font-headline text-2xl font-bold uppercase mb-4">
            Produk ini tidak ditemukan di vault
          </h1>
          <Link
            href="/products"
            className="px-6 py-3 bg-white text-black font-label text-xs uppercase font-bold"
          >
            ← KEMBALI KE KATALOG
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId);
  const isOutOfStock = !selectedVariant || selectedVariant.stock <= 0;

  const handleAddToCart = () => {
    if (!selectedVariant || isOutOfStock) return;

    addItem(product, selectedVariant, 1);

    // Trigger toast notification
    showToast({
      title: "BERHASIL DITAMBAHKAN",
      description: `${product.name} (Ukuran: ${selectedVariant.size}) telah masuk ke keranjang belanja Anda.`,
      actionText: "LIHAT KERANJANG",
      actionHref: "/cart",
    });
  };

  const handleBuyNow = () => {
    if (!selectedVariant || isOutOfStock) return;
    addItem(product, selectedVariant, 1);
    router.push("/cart");
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white pb-20 md:pb-0">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb Bar */}
        <div className="w-full bg-[#0a0a0a] border-b border-[#222222] py-3 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-label text-[#888888]">
            <Link href="/products" className="hover:text-white flex items-center gap-1">
              <ArrowLeft size={13} />
              <span>KATALOG</span>
            </Link>
            <span>/</span>
            <span className="text-white uppercase truncate">
              {product.name}
            </span>
          </div>
        </div>

        {/* Product Core Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
            {/* Left: Gallery Column */}
            <div className="flex flex-col gap-4">
              {/* Main Active Image 1:1 Aspect Ratio */}
              <div className="relative aspect-square w-full bg-[#0d0d0d] border border-[#333333] overflow-hidden group">
                <Image
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={`${product.name} - Tampilan ${activeImageIndex + 1}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {product.isNewDrop && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="solid" className="text-[10px] px-2 py-0.5">
                      NEW DROP
                    </Badge>
                  </div>
                )}
              </div>

              {/* Thumbnails Row */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-square bg-[#0d0d0d] border transition-all ${
                        activeImageIndex === idx
                          ? "border-white shadow-brutal-sm scale-[0.98]"
                          : "border-[#222222] hover:border-[#666666] opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        sizes="100px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Purchase Actions */}
            <div className="flex flex-col gap-6">
              {/* Header Info */}
              <div className="flex flex-col gap-2">
                <span className="font-label text-xs uppercase tracking-widest text-[#888888]">
                  [{product.categoryLabel} // {product.slug}]
                </span>
                <h1 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-white leading-tight">
                  {product.name}
                </h1>
                <div className="pt-2 flex items-baseline gap-4">
                  <span className="font-headline text-2xl sm:text-3xl font-bold text-white">
                    {formatRupiah(product.price)}
                  </span>
                </div>
              </div>

              {/* Material Highlight */}
              <div className="p-3.5 bg-[#111111] border border-[#222222] flex items-center justify-between text-xs">
                <span className="font-label text-[#888888] uppercase">
                  MATERIAL:
                </span>
                <span className="font-body text-white font-medium">
                  {product.material}
                </span>
              </div>

              {/* Size Variant Selector */}
              <div className="flex flex-col gap-3 pt-2 border-t border-[#222222]">
                <div className="flex items-center justify-between">
                  <span className="font-label text-xs uppercase font-bold tracking-wider text-white">
                    PILIH UKURAN // SIZE:
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-label uppercase text-[#AAAAAA] hover:text-white underline underline-offset-4"
                  >
                    <Ruler size={13} />
                    <span>PANDUAN UKURAN</span>
                  </button>
                </div>

                {/* Size Chips */}
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((variant) => {
                    const isSelected = selectedVariantId === variant.id;
                    const isSoldOut = variant.stock <= 0;

                    return (
                      <Chip
                        key={variant.id}
                        selected={isSelected}
                        outOfStock={isSoldOut}
                        onClick={() => setSelectedVariantId(variant.id)}
                      >
                        {variant.size}
                      </Chip>
                    );
                  })}
                </div>

                {/* Honest Stock Remaining Indicator */}
                {selectedVariant && (
                  <div className="text-xs font-label pt-1">
                    {selectedVariant.stock > 0 ? (
                      <span className="text-[#AAAAAA]">
                        STATUS:{" "}
                        <strong className="text-white">
                          TERSEDIA ({selectedVariant.stock} PCS)
                        </strong>
                      </span>
                    ) : (
                      <span className="text-[#FFB4AB] font-bold">
                        UKURAN INI SEDANG HABIS
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons (Desktop) */}
              <div className="hidden md:flex flex-col gap-3 pt-4 border-t border-[#222222]">
                <div className="flex gap-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="flex-1"
                    disabled={isOutOfStock}
                    onClick={handleAddToCart}
                  >
                    {isOutOfStock ? "UKURAN HABIS" : "TAMBAH KE KERANJANG"}
                  </Button>

                  <Button
                    variant="secondary"
                    size="lg"
                    className="flex-1"
                    disabled={isOutOfStock}
                    onClick={handleBuyNow}
                  >
                    BELI SEKARANG
                  </Button>
                </div>
              </div>

              {/* Accordions (Specifications, Care, Delivery, Return) */}
              <div className="pt-4">
                <Accordion>
                  <AccordionItem title="DESKRIPSI KARYA" defaultOpen={true}>
                    <p>{product.description}</p>
                  </AccordionItem>

                  <AccordionItem title="SPESIFIKASI & DIMENSI">
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      {product.specifications.map((spec, i) => (
                        <li key={i}>{spec}</li>
                      ))}
                    </ul>
                  </AccordionItem>

                  <AccordionItem title="PETUNJUK PERAWATAN">
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      {product.careInstructions.map((care, i) => (
                        <li key={i}>{care}</li>
                      ))}
                    </ul>
                  </AccordionItem>

                  <AccordionItem title="PENGIRIMAN & TUKAR UKURAN">
                    <p>
                      Pesanan diverifikasi manual oleh admin dan dikirim menggunakan kurir JNE/J&T/SiCepat. Penukaran ukuran diperbolehkan maksimal 7 hari setelah barang diterima pelanggan (syarat: kondisi baru dan biaya kirim ditanggung pembeli).
                    </p>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20 pt-10 border-t border-[#222222] flex flex-col gap-6">
              <span className="font-label text-xs uppercase tracking-widest text-[#888888]">
                [REKOMENDASI KOLEKSI LAINNYA]
              </span>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* =========================================
          MOBILE STICKY BOTTOM ACTION BAR (375 PX)
         ========================================= */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#111111] border-t-2 border-white p-3 px-4 flex items-center justify-between gap-3 shadow-2xl">
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] font-label uppercase text-[#888888] truncate">
            {selectedVariant ? `UKURAN: ${selectedVariant.size}` : "PILIH UKURAN"}
          </span>
          <span className="font-headline text-sm font-bold text-white">
            {formatRupiah(product.price)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="md"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className="px-4 py-2 text-xs"
          >
            {isOutOfStock ? "HABIS" : "+ KERANJANG"}
          </Button>
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />

      <Footer />
    </div>
  );
}
