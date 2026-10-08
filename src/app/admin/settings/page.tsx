"use client";

import * as React from "react";
import Image from "next/image";
import { useOrders } from "@/context/orders-context";
import { useProducts } from "@/context/products-context";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import {
  Save,
  RotateCcw,
  Building,
  CreditCard,
  QrCode,
  Truck,
  ShieldAlert,
  CheckCircle,
} from "lucide-react";

export default function AdminSettingsPage() {
  const { resetOrders } = useOrders();
  const { resetProducts } = useProducts();
  const { clearCart } = useCart();
  const { showToast } = useToast();

  // Form states
  const [bcaAccount, setBcaAccount] = React.useState("873-091-2810");
  const [bcaHolder, setBcaHolder] = React.useState("NETURISM OFFICIAL");
  const [mandiriAccount, setMandiriAccount] = React.useState("137-00-1928301-2");
  const [mandiriHolder, setMandiriHolder] = React.useState("NETURISM OFFICIAL");

  const [rateJabodetabek, setRateJabodetabek] = React.useState(12000);
  const [rateJawa, setRateJawa] = React.useState(22000);
  const [rateLuarJawa, setRateLuarJawa] = React.useState(45000);

  const [csPhone, setCsPhone] = React.useState("0812-8910-2931");
  const [csHours, setCsHours] = React.useState("09.00 - 21.00 WIB");

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Pengaturan operasional berhasil disimpan.", "success");
  };

  const handleResetDemoData = () => {
    if (
      confirm(
        "PERINGATAN DEMO: Anda yakin ingin mengembalikan semua data transaksi pesanan, keranjang, dan stok produk ke kondisi awal?"
      )
    ) {
      resetOrders();
      resetProducts();
      clearCart();
      showToast("Data demo berhasil di-reset ke kondisi awal.", "success");
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      {/* Top Heading */}
      <div className="border-b border-[#222222] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#888888] tracking-widest uppercase">
            [KONFIGURASI SISTEM]
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-1">
            PENGATURAN OPERASIONAL TOKO
          </h1>
          <p className="text-xs font-body text-[#888888] mt-1">
            Kelola nomor rekening manual, preview QRIS, tabel flat tarif ongkir, dan jam operasional.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleResetDemoData}
          className="text-xs text-[#FFB4AB] border-[#FFB4AB]/40 hover:bg-[#FFB4AB]/10 whitespace-nowrap"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
          RESET DATA DEMO
        </Button>
      </div>

      <form onSubmit={handleSaveSettings} className="flex flex-col gap-6 text-xs font-mono">
        {/* Section 1: Bank Accounts */}
        <div className="bg-[#0e0e0e] border border-[#222222] p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-[#1c1c1c] pb-2 text-white">
            <CreditCard className="w-4 h-4" />
            <span className="font-bold uppercase">[1. REKENING BANK TRANSFER MANUAL]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* BCA */}
            <div className="p-4 bg-[#121212] border border-[#262626] flex flex-col gap-2">
              <span className="font-bold text-white uppercase">BANK CENTRAL ASIA (BCA)</span>
              <div>
                <label className="text-[#666666] block text-[10px]">NOMOR REKENING</label>
                <input
                  type="text"
                  value={bcaAccount}
                  onChange={(e) => setBcaAccount(e.target.value)}
                  className="w-full bg-[#181818] border border-[#333333] px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-white"
                />
              </div>
              <div>
                <label className="text-[#666666] block text-[10px]">ATAS NAMA (PEMILIK)</label>
                <input
                  type="text"
                  value={bcaHolder}
                  onChange={(e) => setBcaHolder(e.target.value)}
                  className="w-full bg-[#181818] border border-[#333333] px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-white"
                />
              </div>
            </div>

            {/* Mandiri */}
            <div className="p-4 bg-[#121212] border border-[#262626] flex flex-col gap-2">
              <span className="font-bold text-white uppercase">BANK MANDIRI</span>
              <div>
                <label className="text-[#666666] block text-[10px]">NOMOR REKENING</label>
                <input
                  type="text"
                  value={mandiriAccount}
                  onChange={(e) => setMandiriAccount(e.target.value)}
                  className="w-full bg-[#181818] border border-[#333333] px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-white"
                />
              </div>
              <div>
                <label className="text-[#666666] block text-[10px]">ATAS NAMA (PEMILIK)</label>
                <input
                  type="text"
                  value={mandiriHolder}
                  onChange={(e) => setMandiriHolder(e.target.value)}
                  className="w-full bg-[#181818] border border-[#333333] px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: QRIS Settings */}
        <div className="bg-[#0e0e0e] border border-[#222222] p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-[#1c1c1c] pb-2 text-white">
            <QrCode className="w-4 h-4" />
            <span className="font-bold uppercase">[2. STANDARISASI QRIS RESMI]</span>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="relative w-36 h-36 bg-white p-2 border border-[#444444] shrink-0 flex items-center justify-center">
              <Image
                src="/images/qris-neturism.svg"
                alt="QRIS Neturism"
                fill
                className="object-contain p-2"
              />
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <span className="text-white font-bold">NETURISM INDONESIA (MERCHANT QRIS)</span>
              <p className="text-[#888888] leading-relaxed">
                QRIS kompatibel dengan seluruh aplikasi e-wallet (GoPay, OVO, Dana, ShopeePay)
                dan mobile banking (BCA Mobile, Livin, BRImo, dll).
              </p>
              <div className="pt-2">
                <span className="text-[10px] text-[#666666] block uppercase">NMID RESMI</span>
                <span className="text-white font-mono">ID1020261928019</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Flat Shipping Rates */}
        <div className="bg-[#0e0e0e] border border-[#222222] p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-[#1c1c1c] pb-2 text-white">
            <Truck className="w-4 h-4" />
            <span className="font-bold uppercase">[3. TABEL TARIF PENGIRIMAN FLAT PER ZONA]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-[#121212] border border-[#262626]">
              <label className="text-[#888888] block text-[10px] mb-1">ZONA 1 (JABODETABEK)</label>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold">Rp</span>
                <input
                  type="number"
                  value={rateJabodetabek}
                  onChange={(e) => setRateJabodetabek(Number(e.target.value))}
                  className="w-full bg-[#181818] border border-[#333333] px-2 py-1 text-white text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="p-3 bg-[#121212] border border-[#262626]">
              <label className="text-[#888888] block text-[10px] mb-1">ZONA 2 (PULAU JAWA LAINNYA)</label>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold">Rp</span>
                <input
                  type="number"
                  value={rateJawa}
                  onChange={(e) => setRateJawa(Number(e.target.value))}
                  className="w-full bg-[#181818] border border-[#333333] px-2 py-1 text-white text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="p-3 bg-[#121212] border border-[#262626]">
              <label className="text-[#888888] block text-[10px] mb-1">ZONA 3 (LUAR PULAU JAWA)</label>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold">Rp</span>
                <input
                  type="number"
                  value={rateLuarJawa}
                  onChange={(e) => setRateLuarJawa(Number(e.target.value))}
                  className="w-full bg-[#181818] border border-[#333333] px-2 py-1 text-white text-xs focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Operational Hours & Contact */}
        <div className="bg-[#0e0e0e] border border-[#222222] p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-[#1c1c1c] pb-2 text-white">
            <Building className="w-4 h-4" />
            <span className="font-bold uppercase">[4. INFORMASI KONTAK & LAYANAN]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[#888888] block mb-1">WHATSAPP OFFICIAL CS</label>
              <input
                type="text"
                value={csPhone}
                onChange={(e) => setCsPhone(e.target.value)}
                className="w-full bg-[#121212] border border-[#282828] px-3 py-2 text-white focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="text-[#888888] block mb-1">JAM OPERASIONAL LAYANAN</label>
              <input
                type="text"
                value={csHours}
                onChange={(e) => setCsHours(e.target.value)}
                className="w-full bg-[#121212] border border-[#282828] px-3 py-2 text-white focus:outline-none focus:border-white"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#222222]">
          <Button type="submit" variant="primary" size="md" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            <span>SIMPAN PERUBAHAN PENGATURAN</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
