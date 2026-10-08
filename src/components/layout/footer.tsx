import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-[#222222] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand Info */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <Logo size="md" />
            <p className="text-xs text-[#888888] font-body leading-relaxed max-w-xs">
              Brand aksesoris streetwear kurasi dengan karakter gelap,
              gothic-industrial, dan ekspresif. Dirancang dan diproduksi secara terbatas.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-label uppercase text-[#555555]">
                INSTAGRAM:{" "}
                <a
                  href="https://www.instagram.com/neturism/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline underline-offset-4"
                >
                  @NETURISM
                </a>
              </span>
            </div>
          </div>

          {/* Nav: Koleksi */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-label uppercase font-bold tracking-widest text-white">
              [KOLEKSI]
            </span>
            <ul className="flex flex-col gap-2.5 text-xs font-body text-[#888888]">
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Semua Produk
                </Link>
              </li>
              <li>
                <Link href="/products?kategori=gelang" className="hover:text-white transition-colors">
                  Gelang // Bracelets
                </Link>
              </li>
              <li>
                <Link href="/products?kategori=cincin" className="hover:text-white transition-colors">
                  Cincin // Signet Rings
                </Link>
              </li>
              <li>
                <Link href="/products?kategori=kalung" className="hover:text-white transition-colors">
                  Kalung // Chains
                </Link>
              </li>
              <li>
                <Link href="/products?kategori=tubuh" className="hover:text-white transition-colors">
                  Aksesoris Tubuh
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav: Bantuan */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-label uppercase font-bold tracking-widest text-white">
              [LAYANAN]
            </span>
            <ul className="flex flex-col gap-2.5 text-xs font-body text-[#888888]">
              <li>
                <Link href="/panduan-ukuran" className="hover:text-white transition-colors">
                  Panduan Ukuran (Size Guide)
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-white transition-colors">
                  Konsultasi Chat
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  Pelacakan Status Pesanan
                </Link>
              </li>
              <li>
                <span className="text-[#555555] font-label text-[11px]">
                  OPERASIONAL: 09.00 - 21.00 WIB
                </span>
              </li>
            </ul>
          </div>

          {/* Nav: Kebijakan */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-label uppercase font-bold tracking-widest text-white">
              [KEBIJAKAN]
            </span>
            <ul className="flex flex-col gap-2.5 text-xs font-body text-[#888888]">
              <li>
                <Link
                  href="/kebijakan/pengiriman-tukar-ukuran"
                  className="hover:text-white transition-colors"
                >
                  Pengiriman & Tukar Ukuran
                </Link>
              </li>
              <li>
                <Link href="/kebijakan/syarat" className="hover:text-white transition-colors">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link href="/kebijakan/privasi" className="hover:text-white transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[#1e1e1e] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-label text-[#555555]">
          <p>© {currentYear} NETURISM. HAK CIPTA DILINDUNGI.</p>
          <div className="flex items-center gap-4">
            <p>[JAKARTA, INDONESIA // CURATED STREETWEAR ACCESSORIES]</p>
            <Link
              href="/admin"
              className="text-[#666666] hover:text-white border border-[#333333] px-2 py-0.5 tracking-wider transition-colors"
            >
              [ADMIN CONSOLE]
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
