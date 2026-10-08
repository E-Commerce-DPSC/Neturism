"use client";

import * as React from "react";
import Link from "next/link";
import { Drawer } from "@/components/ui/drawer";
import { NeturismEmblem } from "@/components/brand/logo";
import { MessageSquare, Ruler, ShieldCheck, User, Search } from "lucide-react";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartCount?: number;
}

const CATEGORIES = [
  { name: "Semua Produk", slug: "all", href: "/products" },
  { name: "Gelang // Bracelets", slug: "gelang", href: "/products?kategori=gelang" },
  { name: "Cincin // Signet Rings", slug: "cincin", href: "/products?kategori=cincin" },
  { name: "Kalung // Chains", slug: "kalung", href: "/products?kategori=kalung" },
  { name: "Aksesoris Tubuh // Body Pieces", slug: "tubuh", href: "/products?kategori=tubuh" },
  { name: "Aksesoris Pendukung", slug: "pendukung", href: "/products?kategori=pendukung" },
];

export function MobileNavDrawer({
  isOpen,
  onClose,
  cartCount = 0,
}: MobileNavDrawerProps) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} position="left" title="NAVIGATION MENU">
      <div className="flex flex-col gap-6 py-2">
        {/* Search shortcut */}
        <Link
          href="/products"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 bg-[#161616] border border-[#333333] text-sm font-label uppercase text-[#AAAAAA] hover:border-white hover:text-white transition-colors"
        >
          <Search size={16} />
          <span>CARI KOLEKSI...</span>
        </Link>

        {/* Main 4 Nav Links */}
        <nav className="flex flex-col divide-y divide-[#1e1e1e] border-y border-[#222222]">
          <Link
            href="/"
            onClick={onClose}
            className="py-3.5 text-sm font-headline tracking-wider text-white hover:text-[#AAAAAA] hover:translate-x-1 transition-all flex items-center justify-between"
          >
            <span>BERANDA // HOME</span>
            <span className="text-xs text-[#555555] font-label">→</span>
          </Link>
          <Link
            href="/products"
            onClick={onClose}
            className="py-3.5 text-sm font-headline tracking-wider text-white hover:text-[#AAAAAA] hover:translate-x-1 transition-all flex items-center justify-between"
          >
            <span>KATALOG // CATALOG</span>
            <span className="text-xs text-[#555555] font-label">→</span>
          </Link>
          <Link
            href="/panduan-ukuran"
            onClick={onClose}
            className="py-3.5 text-sm font-headline tracking-wider text-white hover:text-[#AAAAAA] hover:translate-x-1 transition-all flex items-center justify-between"
          >
            <span>PANDUAN UKURAN // SIZE GUIDE</span>
            <span className="text-xs text-[#555555] font-label">→</span>
          </Link>
          <Link
            href="/chat"
            onClick={onClose}
            className="py-3.5 text-sm font-headline tracking-wider text-white hover:text-[#AAAAAA] hover:translate-x-1 transition-all flex items-center justify-between"
          >
            <span>LIVE CHAT // KONSULTASI</span>
            <span className="text-xs text-[#555555] font-label">→</span>
          </Link>
        </nav>

        {/* Essential links */}
        <div className="flex flex-col border-t border-[#222222] pt-4 gap-2">
          <span className="text-[11px] font-label uppercase tracking-widest text-[#666666] mb-1">
            [SERVICES & INFORMATION]
          </span>

          <Link
            href="/panduan-ukuran"
            onClick={onClose}
            className="flex items-center gap-3 py-2.5 text-xs font-label uppercase text-[#AAAAAA] hover:text-white transition-colors"
          >
            <Ruler size={16} />
            <span>PANDUAN UKURAN // SIZE GUIDE</span>
          </Link>

          <Link
            href="/chat"
            onClick={onClose}
            className="flex items-center gap-3 py-2.5 text-xs font-label uppercase text-[#AAAAAA] hover:text-white transition-colors"
          >
            <MessageSquare size={16} />
            <span>KONSULTASI // LIVE CHAT</span>
          </Link>

          <Link
            href="/kebijakan/pengiriman-tukar-ukuran"
            onClick={onClose}
            className="flex items-center gap-3 py-2.5 text-xs font-label uppercase text-[#AAAAAA] hover:text-white transition-colors"
          >
            <ShieldCheck size={16} />
            <span>PENGIRIMAN & TUKAR UKURAN</span>
          </Link>

          <Link
            href="/account"
            onClick={onClose}
            className="flex items-center gap-3 py-2.5 text-xs font-label uppercase text-[#AAAAAA] hover:text-white transition-colors"
          >
            <User size={16} />
            <span>AKUN & RIWAYAT PESANAN</span>
          </Link>
        </div>

        {/* Footer brand stamp */}
        <div className="mt-auto pt-6 border-t border-[#222222] flex items-center justify-between text-[10px] font-label uppercase text-[#555555]">
          <span>NETURISM OFFICIAL</span>
          <span>EST. 2026 // JAKARTA</span>
        </div>
      </div>
    </Drawer>
  );
}
