"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { MobileNavDrawer } from "@/components/layout/mobile-nav-drawer";
import { Search, ShoppingBag, Menu, User } from "lucide-react";
import { cn } from "@/lib/utils";

import { useCart } from "@/context/cart-context";

interface HeaderProps {
  cartItemCount?: number;
}

export function Header({ cartItemCount }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();
  const effectiveCount = cartItemCount !== undefined ? cartItemCount : totalItems;

  const navLinks = [
    { name: "BERANDA", href: "/" },
    { name: "KATALOG", href: "/products" },
    { name: "PANDUAN UKURAN", href: "/panduan-ukuran" },
    { name: "LIVE CHAT", href: "/chat" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-black/95 backdrop-blur-md border-b border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* Left: Mobile Hamburger & Desktop Logo */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-white hover:text-[#AAAAAA] transition-colors focus:outline-none"
              aria-label="Buka menu navigasi"
            >
              <Menu size={22} strokeWidth={2} />
            </button>

            <Logo size="md" />
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-xs font-label uppercase tracking-widest transition-colors py-1",
                    isActive
                      ? "text-white border-b-2 border-white font-bold"
                      : "text-[#888888] hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions (Search, Account, Cart) */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/products"
              className="p-2 text-[#AAAAAA] hover:text-white transition-colors"
              aria-label="Cari produk"
            >
              <Search size={20} strokeWidth={2} />
            </Link>

            <Link
              href="/account"
              className="hidden sm:inline-flex p-2 text-[#AAAAAA] hover:text-white transition-colors"
              aria-label="Akun saya"
            >
              <User size={20} strokeWidth={2} />
            </Link>

            <Link
              href="/cart"
              className="relative p-2 text-white hover:text-[#AAAAAA] transition-colors flex items-center"
              aria-label="Keranjang belanja"
            >
              <ShoppingBag size={20} strokeWidth={2} />
              {effectiveCount > 0 && (
                <span className="absolute top-1 right-0 min-w-[16px] h-[16px] px-1 bg-white text-black font-label text-[10px] font-bold flex items-center justify-center">
                  {effectiveCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        cartCount={effectiveCount}
      />
    </>
  );
}
