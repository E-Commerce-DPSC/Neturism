import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/product/product-card";
import { PRODUCTS } from "@/lib/data/products";
import { formatRupiah } from "@/lib/utils";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function HomePage() {
  const heroProduct = PRODUCTS[0]; // Crucifix Barbed Chain Bracelet
  const latestProducts = PRODUCTS.slice(1, 5); // 4 products for 2-col mobile / 4-col desktop

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="flex-1 flex flex-col">
        {/* =========================================================================
            SECTION 1: HERO IDENTITY HEADER (WHO WE TRULY ARE + PROTOTYPE CARD)
           ========================================================================= */}
        <section className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-16 border-b border-[#222222] bg-[#070707]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Identity Statement & CTAs (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-6 sm:gap-8">
              <div className="flex flex-col gap-3 sm:gap-4">
                <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
                  <span className="font-label text-white mr-2 block sm:inline">[IDENTITY]</span>
                  WHO WE TRULY ARE — EXPRESSIVE ACCESSORIES &amp; STREETWEAR ORNAMENTS
                </h1>
                <p className="font-body text-xs sm:text-sm lg:text-base text-[#AAAAAA] leading-relaxed max-w-2xl pt-1">
                  Everything we&apos;ve been through makes us stronger and more curious, but eventually
                  causes us to lose sight of who we are. A brief moment of reflection helps us realize
                  that we need to take a break and see who we really are. Curated expressive
                  accessories designed to anchor your story.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/products"
                  className="px-6 py-4 bg-white text-black font-label text-xs sm:text-sm uppercase font-bold tracking-wider hover:bg-black hover:text-white border-2 border-white transition-all text-center flex items-center justify-center gap-2 shadow-brutal-sm"
                >
                  <span>TEMUKAN JATI DIRI [JELAJAHI ARSIP]</span>
                  <ArrowRight size={16} />
                </Link>

                <a
                  href="#vault-principles"
                  className="px-6 py-4 bg-[#141414] text-white font-label text-xs sm:text-sm uppercase font-bold tracking-wider hover:bg-[#1f1f1f] border border-[#333333] hover:border-white transition-all text-center flex items-center justify-center"
                >
                  CHAPTER 04 REFLECTION [V4.8]
                </a>
              </div>

              {/* Three Metric / Concept Cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-[#1e1e1e]">
                <div className="p-3 sm:p-4 bg-[#111111] border border-[#222222] flex flex-col justify-between">
                  <span className="font-label text-[10px] sm:text-xs text-[#888888] uppercase">
                    DESIGN CONCEPT
                  </span>
                  <div className="pt-1.5 flex flex-col">
                    <span className="font-headline text-xs sm:text-base font-bold text-white uppercase">
                      CURATED
                    </span>
                    <span className="font-label text-[10px] text-[#666666] uppercase">
                      STREETWEAR
                    </span>
                  </div>
                </div>

                <div className="p-3 sm:p-4 bg-[#111111] border border-[#222222] flex flex-col justify-between">
                  <span className="font-label text-[10px] sm:text-xs text-[#888888] uppercase">
                    SIGNATURE STYLE
                  </span>
                  <div className="pt-1.5 flex flex-col">
                    <span className="font-headline text-xs sm:text-base font-bold text-white uppercase">
                      GOTHIC
                    </span>
                    <span className="font-label text-[10px] text-[#666666] uppercase">
                      MONOCHROME
                    </span>
                  </div>
                </div>

                <div className="p-3 sm:p-4 bg-[#111111] border border-[#222222] flex flex-col justify-between">
                  <span className="font-label text-[10px] sm:text-xs text-[#888888] uppercase">
                    QUALITY PROMISE
                  </span>
                  <div className="pt-1.5 flex flex-col">
                    <span className="font-headline text-xs sm:text-base font-bold text-white uppercase">
                      STATEMENT
                    </span>
                    <span className="font-label text-[10px] text-[#666666] uppercase">
                      EXPRESSIVE FINISH
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Prototype Card ART. N-001 (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <Link
                href={`/products/${heroProduct.slug}`}
                className="w-full max-w-md bg-[#111111] border-2 border-[#333333] hover:border-white transition-all duration-200 flex flex-col group select-none shadow-brutal-dark hover:shadow-brutal"
              >
                {/* Top Prototype Header */}
                <div className="px-4 py-2.5 bg-[#161616] border-b border-[#222222] flex items-center justify-between text-xs font-label">
                  <span className="text-[#AAAAAA] uppercase font-bold tracking-wider">
                    ART. N-001 • PROTOTYPE
                  </span>
                  <span className="text-white group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </div>

                {/* Hero Visual Image */}
                <div className="relative aspect-[4/5] w-full bg-[#0a0a0a] overflow-hidden border-b border-[#222222]">
                  <Image
                    src="/images/editorial/hero-prototype.svg"
                    alt="Art N-001 Prototype Crucifix Heavy Link"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Bottom Spec Footer */}
                <div className="p-4 sm:p-5 flex flex-col gap-2 bg-[#121212]">
                  <span className="font-label text-[11px] uppercase tracking-widest text-[#888888]">
                    LIMITED METALLIC DROP
                  </span>
                  <h3 className="font-headline text-lg sm:text-xl font-bold uppercase text-white tracking-wide">
                    CRUCIFIX HEAVY LINK
                  </h3>
                  <div className="pt-2 border-t border-[#222222] flex items-center justify-between font-label text-xs">
                    <span className="font-bold text-white text-sm">
                      RP 890.000
                    </span>
                    <span className="text-[#AAAAAA]">
                      [6 UNITS REMAINING]
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: FEATURED DROP SPOTLIGHT (1 KARTU BESAR KARYA)
           ========================================================================= */}
        <section className="w-full px-4 sm:px-6 lg:px-8 py-10 md:py-14 border-b border-[#222222]">
          <div className="max-w-7xl mx-auto flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-label text-xs uppercase tracking-widest text-[#888888]">
                [CURRENT DROP // SIGNATURE PIECE]
              </span>
              <span className="font-label text-xs uppercase tracking-widest text-[#555555] hidden sm:inline">
                VOL. 2026 // VAULT RELEASE
              </span>
            </div>

            {/* 1 Big Editorial Card */}
            <div className="w-full bg-[#111111] border-2 border-white p-5 sm:p-8 md:p-10 shadow-brutal flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              <div className="w-full lg:w-1/2 aspect-square relative bg-[#090909] border border-[#333333] overflow-hidden group">
                <Image
                  src={heroProduct.images[0]}
                  alt={heroProduct.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-white text-black font-label text-[11px] font-bold tracking-wider">
                    NEW DROP
                  </span>
                </div>
              </div>

              <div className="w-full lg:w-1/2 flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-3">
                  <span className="font-label text-xs uppercase tracking-widest text-[#AAAAAA]">
                    [{heroProduct.categoryLabel} // ITEM #01]
                  </span>
                  <h2 className="font-headline text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase leading-tight">
                    {heroProduct.name}
                  </h2>
                  <p className="font-body text-sm sm:text-base text-[#AAAAAA] leading-relaxed pt-2">
                    {heroProduct.description}
                  </p>
                </div>

                <div className="flex flex-col gap-4 pt-4 border-t border-[#222222]">
                  <div className="flex items-baseline justify-between">
                    <span className="font-label text-xs text-[#888888] uppercase">
                      HARGA SATUAN:
                    </span>
                    <span className="font-headline text-xl sm:text-2xl font-bold text-white">
                      {formatRupiah(heroProduct.price)}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Link
                      href={`/products/${heroProduct.slug}`}
                      className="flex-1 px-6 py-4 bg-white text-black font-label text-xs sm:text-sm uppercase font-bold tracking-wider hover:bg-black hover:text-white border-2 border-white transition-all text-center flex items-center justify-center gap-2"
                    >
                      <span>LIHAT DETAIL PRODUK</span>
                      <ArrowRight size={16} />
                    </Link>

                    <Link
                      href="/products"
                      className="px-6 py-4 bg-black text-white font-label text-xs sm:text-sm uppercase font-bold tracking-wider hover:bg-[#1a1a1a] border border-[#888888] hover:border-white transition-all text-center"
                    >
                      SEMUA KOLEKSI
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: EDITORIAL CATEGORY TILES (4 KARTU BESAR: WRISTWEAR, SIGNETS, CHAINS, RESTORE)
           ========================================================================= */}
        <section className="w-full px-4 sm:px-6 lg:px-8 py-10 md:py-14 border-b border-[#222222] bg-black">
          <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="font-label text-xs uppercase tracking-widest text-[#AAAAAA]">
                [ARCHIVE CURATION BY FORM]
              </span>
              <span className="font-label text-xs uppercase tracking-widest text-[#666666] hidden sm:inline">
                EXPLORE BY CATEGORY
              </span>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Card 1: WRISTWEAR */}
              <Link
                href="/products?kategori=gelang"
                className="relative aspect-[3/4] bg-[#111111] border border-[#222222] hover:border-white transition-all duration-200 overflow-hidden group flex flex-col justify-between p-5 select-none shadow-brutal-dark hover:shadow-brutal"
              >
                <Image
                  src="/images/editorial/cat-wristwear.svg"
                  alt="Wristwear Category"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between text-[11px] font-label text-[#AAAAAA]">
                  <span>VOL. WRISTWEAR</span>
                  <span>[08 STYLES]</span>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 flex flex-col gap-1">
                  <h3 className="font-headline text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white group-hover:translate-x-1 transition-transform">
                    [WRISTWEAR]
                  </h3>
                  <span className="font-label text-[11px] uppercase tracking-wider text-[#AAAAAA] group-hover:text-white flex items-center gap-1">
                    <span>EMBRACE THE WEIGHT</span>
                    <span>→</span>
                  </span>
                </div>
              </Link>

              {/* Card 2: SIGNETS */}
              <Link
                href="/products?kategori=cincin"
                className="relative aspect-[3/4] bg-[#111111] border border-[#222222] hover:border-white transition-all duration-200 overflow-hidden group flex flex-col justify-between p-5 select-none shadow-brutal-dark hover:shadow-brutal"
              >
                <Image
                  src="/images/editorial/cat-signets.svg"
                  alt="Signets Category"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between text-[11px] font-label text-[#AAAAAA]">
                  <span>VOL. MONOLITH</span>
                  <span>[05 STYLES]</span>
                </div>

                <div className="relative z-10 flex flex-col gap-1">
                  <h3 className="font-headline text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white group-hover:translate-x-1 transition-transform">
                    [SIGNETS]
                  </h3>
                  <span className="font-label text-[11px] uppercase tracking-wider text-[#AAAAAA] group-hover:text-white flex items-center gap-1">
                    <span>ANCHOR YOUR PRESENCE</span>
                    <span>→</span>
                  </span>
                </div>
              </Link>

              {/* Card 3: CHAINS */}
              <Link
                href="/products?kategori=kalung"
                className="relative aspect-[3/4] bg-[#111111] border border-[#222222] hover:border-white transition-all duration-200 overflow-hidden group flex flex-col justify-between p-5 select-none shadow-brutal-dark hover:shadow-brutal"
              >
                <Image
                  src="/images/editorial/cat-chains.svg"
                  alt="Chains Category"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between text-[11px] font-label text-[#AAAAAA]">
                  <span>VOL. HARDWARE</span>
                  <span>[04 STYLES]</span>
                </div>

                <div className="relative z-10 flex flex-col gap-1">
                  <h3 className="font-headline text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white group-hover:translate-x-1 transition-transform">
                    [CHAINS]
                  </h3>
                  <span className="font-label text-[11px] uppercase tracking-wider text-[#AAAAAA] group-hover:text-white flex items-center gap-1">
                    <span>CLOSE TO THE CHEST</span>
                    <span>→</span>
                  </span>
                </div>
              </Link>

              {/* Card 4: RESTORE (Care Guide) */}
              <Link
                href="/panduan-ukuran"
                className="relative aspect-[3/4] bg-[#111111] border border-[#222222] hover:border-white transition-all duration-200 overflow-hidden group flex flex-col justify-between p-5 select-none shadow-brutal-dark hover:shadow-brutal"
              >
                <Image
                  src="/images/editorial/cat-restore.svg"
                  alt="Restore Vault Essentials"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between text-[11px] font-label text-[#AAAAAA]">
                  <span>VOL. VAULT ESSENTIALS</span>
                  <span>[INCLUDED]</span>
                </div>

                <div className="relative z-10 flex flex-col gap-1">
                  <h3 className="font-headline text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white group-hover:translate-x-1 transition-transform">
                    [RESTORE]
                  </h3>
                  <span className="font-label text-[11px] uppercase tracking-wider text-[#AAAAAA] group-hover:text-white flex items-center gap-1">
                    <span>CARE FOR THE FORM</span>
                    <span>→</span>
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: PILAR FILOSOFI BRAND
           ========================================================================= */}
        <section
          id="vault-principles"
          className="w-full py-12 px-4 sm:px-6 lg:px-8 border-b border-[#222222] bg-[#0c0c0c]"
        >
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-white block" />
              <h2 className="font-label text-xs uppercase tracking-widest text-[#AAAAAA]">
                [PRINSIP &amp; IDENTITAS BRAND]
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-[#111111] border border-[#222222] flex flex-col gap-3">
                <span className="font-label text-xs text-white font-bold tracking-wider">
                  01 // KURASI GOTHIC-INDUSTRIAL
                </span>
                <p className="font-body text-xs text-[#888888] leading-relaxed">
                  Siluet tajam, duri geometris, dan emblem ekspresif terinspirasi dari arsitektur brutalist dan budaya streetwear bawah tanah.
                </p>
              </div>

              <div className="p-6 bg-[#111111] border border-[#222222] flex flex-col gap-3">
                <span className="font-label text-xs text-white font-bold tracking-wider">
                  02 // MATERIAL RAW &amp; SOLID
                </span>
                <p className="font-body text-xs text-[#888888] leading-relaxed">
                  Menggunakan Stainless Steel 316L dan paduan logam padat dengan finishing teroksidasi gelap. Kuat, tahan lama, dan berbobot mantap.
                </p>
              </div>

              <div className="p-6 bg-[#111111] border border-[#222222] flex flex-col gap-3">
                <span className="font-label text-xs text-white font-bold tracking-wider">
                  03 // RILISAN TERBATAS
                </span>
                <p className="font-body text-xs text-[#888888] leading-relaxed">
                  Setiap aksesoris diproduksi dalam jumlah terkontrol per batch untuk menjaga keunikan dan standar kualitas setiap karya.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: LATEST COLLECTION GRID (2 KOLOM MOBILE)
           ========================================================================= */}
        <section className="w-full py-12 px-4 sm:px-6 lg:px-8 border-b border-[#222222]">
          <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-label text-xs uppercase tracking-widest text-[#888888]">
                  [LATEST VAULT DROPS]
                </span>
                <h2 className="font-headline text-xl sm:text-2xl font-bold text-white uppercase pt-1">
                  Koleksi Pilihan
                </h2>
              </div>

              <Link
                href="/products"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-transparent text-white border border-[#333333] hover:border-white text-xs font-label uppercase transition-colors"
              >
                BUKA KATALOG PENUH →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              {latestProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>

            <div className="sm:hidden pt-4">
              <Link
                href="/products"
                className="w-full block py-3.5 bg-[#141414] text-white border border-[#333333] hover:border-white text-center font-label text-xs uppercase font-bold tracking-wider"
              >
                BUKA KATALOG LENGKAP ({PRODUCTS.length} PRODUK) →
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: COMMUNITY ARCHIVE GALLERY (THE COLLECTIVE JOURNEY)
           ========================================================================= */}
        <section className="w-full py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-[#080808]">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            {/* Gallery Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#222222] pb-6">
              <div className="flex flex-col gap-1.5">
                <span className="font-label text-[11px] uppercase tracking-widest text-[#888888]">
                  NETURISM • LIVED EXPERIENCES ARCHIVE
                </span>
                <h2 className="font-headline text-xl sm:text-3xl font-bold uppercase tracking-tight text-white max-w-2xl">
                  [EXPRESSION] THE COLLECTIVE JOURNEY — STORIES WORN IN FLESH &amp; SILVER
                </h2>
              </div>

              <a
                href="https://www.instagram.com/neturism/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-label uppercase text-[#AAAAAA] hover:text-white transition-colors"
              >
                <span>TAG &amp; SHARE YOUR PERSPECTIVE @NETURISM</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* 6-Photo Streetwear Gallery Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {[
                { src: "/images/community/comm-1.svg", alt: "Streetwear chain wristwear" },
                { src: "/images/community/comm-2.svg", alt: "Crucifix chain on dark cloth" },
                { src: "/images/community/comm-3.svg", alt: "Hands with rings holding camera" },
                { src: "/images/community/comm-4.svg", alt: "Underground rave mood with chains" },
                { src: "/images/community/comm-5.svg", alt: "Heavy chain detail on graphic tee" },
                { src: "/images/community/comm-6.svg", alt: "Neturism gothic cross emblem print" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square w-full bg-[#111111] border border-[#222222] hover:border-white transition-all duration-200 overflow-hidden group select-none shadow-brutal-dark"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
