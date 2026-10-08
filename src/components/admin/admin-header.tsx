"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { useOrders } from "@/context/orders-context";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  MessageSquare,
  Settings,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";

export function AdminHeader() {
  const pathname = usePathname();
  const { orders } = useOrders();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Count pending verifications
  const pendingVerificationsCount = orders.filter(
    (o) => o.status === "MENUNGGU_VERIFIKASI"
  ).length;

  const navItems = [
    {
      label: "RINGKASAN",
      href: "/admin",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      label: "PESANAN",
      href: "/admin/orders",
      icon: ShoppingBag,
      badge: pendingVerificationsCount > 0 ? pendingVerificationsCount : null,
    },
    {
      label: "KATALOG & STOK",
      href: "/admin/products",
      icon: Package,
      badge: null,
    },
    {
      label: "LIVE CHAT",
      href: "/admin/chat",
      icon: MessageSquare,
      badge: 1, // 1 unread customer query mock
    },
    {
      label: "PENGATURAN",
      href: "/admin/settings",
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-black/95 backdrop-blur border-b border-[#222222]">
      {/* Top Banner Status */}
      <div className="bg-[#111111] border-b border-[#1e1e1e] px-4 py-1.5 flex items-center justify-between text-[11px] font-mono text-[#888888]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-white font-bold tracking-wider">NETURISM BACKOFFICE</span>
          <span className="text-[#555555]">|</span>
          <span className="text-[#aaaaaa]">[INTERNAL DEMO PREVIEW]</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-[#666666]">OPERATOR: ADMIN-01 (SUPERUSER)</span>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-white hover:text-[#cccccc] bg-[#1a1a1a] hover:bg-[#252525] px-2.5 py-0.5 border border-[#333333] transition-colors"
          >
            <span>STOREFRONT</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo Brand */}
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-2.5 group">
              <Logo size="sm" href={null} />
              <span className="text-xs font-mono tracking-widest text-[#888888] group-hover:text-white border border-[#262626] group-hover:border-white px-1.5 py-0.5 transition-colors">
                OPS
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 text-xs font-mono uppercase tracking-wider transition-all relative ${
                    isActive
                      ? "text-white bg-[#161616] border border-[#333333] font-bold"
                      : "text-[#888888] hover:text-white hover:bg-[#111111]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.badge !== null && (
                    <span className="ml-1 bg-white text-black font-bold text-[10px] px-1.5 py-0.2 leading-none">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#888888] hover:text-white border border-[#222222]"
            aria-label="Toggle admin menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0d0d0d] border-b border-[#222222] px-4 py-3 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 text-xs font-mono uppercase ${
                  isActive
                    ? "text-white bg-[#181818] border border-[#333333] font-bold"
                    : "text-[#888888] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== null && (
                  <span className="bg-white text-black font-bold text-[10px] px-1.5 py-0.5">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
