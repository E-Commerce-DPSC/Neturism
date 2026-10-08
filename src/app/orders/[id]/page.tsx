"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/context/orders-context";
import { formatRupiah } from "@/lib/utils";
import { OrderStatus } from "@/types/order";
import {
  Copy,
  Check,
  Truck,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";

export function OrderTrackingView({ orderId }: { orderId: string }) {
  const { getOrderById } = useOrders();
  const order = getOrderById(orderId);

  const [copiedResi, setCopiedResi] = React.useState(false);

  // Fallback data if accessed with unlisted order ID
  const activeOrder = order || {
    id: orderId,
    createdAt: "2026-10-08T04:20:00Z",
    status: "DIKIRIM" as OrderStatus,
    courier: "JNE REGULER",
    trackingNumber: "JNE8829102910ID",
    shippingCost: 22000,
    subtotal: 680000,
    uniqueCode: 312,
    total: 702312,
    address: {
      recipientName: "Bagas Pratama",
      phone: "081289102931",
      streetAddress: "Jl. Senopati No. 42, RT 02 / RW 03",
      city: "Jakarta Selatan",
      province: "DKI Jakarta",
      postalCode: "12190",
    },
    items: [
      {
        productId: "prod-01",
        variantId: "var-01-19",
        name: "CRUCIFIX BARBED CHAIN BRACELET",
        size: "19 cm",
        price: 680000,
        quantity: 1,
        image: "/images/products/bracelet-crucifix-1.svg",
      },
    ],
  };

  const handleCopyResi = (resi: string) => {
    navigator.clipboard.writeText(resi);
    setCopiedResi(true);
    setTimeout(() => setCopiedResi(false), 2000);
  };

  // Timeline steps definition
  const TIMELINE_STEPS = [
    { key: "MENUNGGU_PEMBAYARAN", label: "Pesanan Dibuat", desc: "Menunggu pembayaran via QRIS atau Transfer Bank" },
    { key: "MENUNGGU_VERIFIKASI", label: "Bukti Diunggah", desc: "Bukti bayar sedang diverifikasi manual oleh admin" },
    { key: "DIBAYAR", label: "Pembayaran Terverifikasi", desc: "Dana telah cocok, pesanan diteruskan ke tim pengemasan" },
    { key: "DIPROSES", label: "Sedang Dikemas", desc: "Aksesoris diperiksa kualitasnya dan dikemas rapi" },
    { key: "DIKIRIM", label: "Diserahkan ke Kurir", desc: "Paket dalam perjalanan ekspedisi, resi telah terbit" },
    { key: "SELESAI", label: "Pesanan Diterima", desc: "Paket berhasil sampai di tujuan pembeli" },
  ];

  const statusOrderIndex: Record<OrderStatus, number> = {
    MENUNGGU_PEMBAYARAN: 0,
    MENUNGGU_VERIFIKASI: 1,
    DIBAYAR: 2,
    DIPROSES: 3,
    DIKIRIM: 4,
    SELESAI: 5,
    DIBATALKAN: -1,
    KEDALUWARSA: -1,
  };

  const currentStepIdx = statusOrderIndex[activeOrder.status] ?? 4;

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="flex-1 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {/* Breadcrumb Bar */}
          <div className="flex flex-col gap-1 border-b border-[#222222] pb-6">
            <div className="flex items-center gap-2 text-xs font-label text-[#888888] mb-1">
              <Link href="/account" className="hover:text-white flex items-center gap-1">
                <ArrowLeft size={13} />
                <span>RIWAYAT PESANAN</span>
              </Link>
              <span>/</span>
              <span className="text-white">DETAIL &amp; LACAK RESI</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="font-headline text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                Pesanan #{activeOrder.id}
              </h1>
              <Badge variant="solid" className="self-start sm:self-auto text-xs px-3 py-1">
                STATUS: {activeOrder.status}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: Tracking Timeline & Logistik Resi */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              {/* Courier & Tracking Box */}
              <div className="p-6 bg-[#111111] border-2 border-white shadow-brutal flex flex-col gap-5">
                <span className="font-label text-xs uppercase font-bold tracking-widest text-white border-b border-[#222222] pb-3 flex items-center justify-between">
                  <span>[INFORMASI EKSPEDISI &amp; RESI]</span>
                  <Truck size={16} className="text-white" />
                </span>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-label uppercase text-[#AAAAAA]">
                    EKSPEDISI KURIR:
                  </span>
                  <span className="font-headline text-base sm:text-lg font-bold text-white uppercase">
                    {activeOrder.courier}
                  </span>
                </div>

                {activeOrder.trackingNumber ? (
                  <div className="p-4 bg-[#181818] border border-[#333333] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-label uppercase text-[#888888]">
                        NOMOR RESI PENGIRIMAN:
                      </span>
                      <span className="font-label text-base font-bold text-white tracking-widest">
                        {activeOrder.trackingNumber}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        onClick={() => handleCopyResi(activeOrder.trackingNumber!)}
                        className="flex items-center gap-1.5"
                      >
                        {copiedResi ? <Check size={12} /> : <Copy size={12} />}
                        <span>{copiedResi ? "TERSALIN" : "SALIN RESI"}</span>
                      </Button>

                      <a
                        href="https://cekresi.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-[#141414] text-white font-label text-xs uppercase border border-[#888888] hover:border-white hover:bg-black transition-colors flex items-center justify-center"
                      >
                        CEK DI SITUS KURIR ↗
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-[#141414] border border-[#2a2a2a] text-xs font-label text-[#888888]">
                    Nomor resi akan muncul di sini segera setelah paket diserahkan ke pihak ekspedisi oleh admin.
                  </div>
                )}

                {/* Delivery Address */}
                <div className="flex flex-col gap-1 pt-2 border-t border-[#222222] text-xs">
                  <span className="font-label text-[#888888] uppercase">
                    ALAMAT PENERIMA:
                  </span>
                  <span className="font-body text-white font-bold">
                    {activeOrder.address.recipientName} ({activeOrder.address.phone})
                  </span>
                  <p className="font-body text-[#AAAAAA] leading-relaxed">
                    {activeOrder.address.streetAddress}, {activeOrder.address.city},{" "}
                    {activeOrder.address.province} {activeOrder.address.postalCode}
                  </p>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="p-6 bg-[#0e0e0e] border border-[#222222] flex flex-col gap-6">
                <span className="font-label text-xs uppercase font-bold tracking-widest text-white border-b border-[#222222] pb-3">
                  [TIMELINE PROGRESS PESANAN]
                </span>

                <div className="flex flex-col gap-6 relative pl-6 border-l-2 border-[#222222] ml-2">
                  {TIMELINE_STEPS.map((step, idx) => {
                    const isPassed = idx <= currentStepIdx;
                    const isCurrent = idx === currentStepIdx;

                    return (
                      <div key={step.key} className="relative flex flex-col gap-1">
                        {/* Dot indicator */}
                        <span
                          className={`absolute -left-[31px] top-0.5 w-4 h-4 flex items-center justify-center border ${
                            isCurrent
                              ? "bg-white border-white text-black font-bold ring-4 ring-white/20"
                              : isPassed
                              ? "bg-white border-white"
                              : "bg-[#141414] border-[#333333]"
                          }`}
                        >
                          {isPassed && <span className="w-1.5 h-1.5 bg-black block" />}
                        </span>

                        <span
                          className={`font-label text-xs uppercase font-bold tracking-wider ${
                            isPassed ? "text-white" : "text-[#555555]"
                          }`}
                        >
                          {step.label}
                        </span>
                        <p className="font-body text-xs text-[#888888]">
                          {step.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Items Snapshot & Support Actions */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Order Snapshot Card */}
              <div className="p-6 bg-[#111111] border border-[#222222] flex flex-col gap-6">
                <span className="font-label text-xs uppercase font-bold tracking-widest text-white border-b border-[#222222] pb-3">
                  [RINCIAN KARYA YANG DIBELI]
                </span>

                <div className="flex flex-col divide-y divide-[#1e1e1e]">
                  {activeOrder.items.map((item) => (
                    <div key={item.variantId} className="py-3 flex items-center gap-3">
                      <div className="relative w-14 h-14 bg-[#1a1a1a] border border-[#333333] shrink-0 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="60px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <span className="text-xs font-headline font-bold uppercase truncate text-white">
                          {item.name}
                        </span>
                        <span className="text-[10px] font-label text-[#888888]">
                          Ukuran: {item.size} • Qty: {item.quantity}
                        </span>
                        <span className="text-xs font-body font-semibold text-white pt-0.5">
                          {formatRupiah(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#222222] flex flex-col gap-2 text-xs font-body text-[#AAAAAA]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white">{formatRupiah(activeOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ongkos Kirim ({activeOrder.courier})</span>
                    <span className="text-white">{formatRupiah(activeOrder.shippingCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kode Unik Transaksi</span>
                    <span className="text-white">+{activeOrder.uniqueCode}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#222222] flex justify-between items-baseline font-label">
                  <span className="text-xs uppercase font-bold text-white">
                    TOTAL PEMBAYARAN:
                  </span>
                  <span className="font-headline text-xl font-bold text-white">
                    {formatRupiah(activeOrder.total)}
                  </span>
                </div>
              </div>

              {/* Shortcut: Hubungi Admin Mengenai Pesanan Ini */}
              <div className="p-6 bg-[#141414] border border-[#2a2a2a] flex flex-col gap-4">
                <span className="font-label text-xs uppercase font-bold text-white tracking-wider flex items-center gap-2">
                  <MessageSquare size={16} />
                  <span>BUTUH BANTUAN TENTANG PESANAN INI?</span>
                </span>
                <p className="text-xs font-body text-[#888888]">
                  Hubungi admin secara langsung untuk konfirmasi pengiriman, pengemasan, atau penukaran ukuran.
                </p>
                <Link
                  href={`/chat?orderId=${activeOrder.id}`}
                  className="w-full py-3.5 bg-white text-black font-label text-xs uppercase font-bold tracking-wider hover:bg-black hover:text-white border-2 border-white transition-colors text-center block"
                >
                  CHAT DENGAN ADMIN NETURISM →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center font-label text-xs uppercase tracking-widest">
          MEMUAT DATA PELACAKAN RESI...
        </div>
      }
    >
      <OrderTrackingView orderId="NTR-20261005-4102" />
    </React.Suspense>
  );
}
