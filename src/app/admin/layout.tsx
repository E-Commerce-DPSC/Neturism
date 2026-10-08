import * as React from "react";
import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/admin-header";

export const metadata: Metadata = {
  title: "Admin Backoffice Console | Neturism",
  description: "Panel kendali operasional, pesanan, verifikasi pembayaran, dan inventaris produk Neturism.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#070707] text-white flex flex-col font-sans selection:bg-white selection:text-black">
      <React.Suspense fallback={<div className="h-14 bg-black border-b border-[#222222]" />}>
        <AdminHeader />
      </React.Suspense>
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="w-full bg-[#0a0a0a] border-t border-[#1a1a1a] py-4 px-4 sm:px-6 lg:px-8 text-center text-xs font-mono text-[#555555]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>NETURISM ADMIN OPS [DEMO PREVIEW BUILD]</span>
          <span>SINKRONISASI STATE CLIENT-SIDE (LOCALSTORAGE) AKTIF</span>
        </div>
      </footer>
    </div>
  );
}
