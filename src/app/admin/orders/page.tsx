"use client";

import * as React from "react";
import Link from "next/link";
import { useOrders } from "@/context/orders-context";
import { OrderStatus } from "@/types/order";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  Truck,
  ArrowRight,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

type FilterTab = "SEMUA" | OrderStatus;

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useOrders();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = React.useState<FilterTab>("SEMUA");
  const [searchQuery, setSearchQuery] = React.useState("");

  const pendingVerificationCount = orders.filter(
    (o) => o.status === "MENUNGGU_VERIFIKASI"
  ).length;

  const tabs: { label: string; value: FilterTab; count?: number }[] = [
    { label: "SEMUA", value: "SEMUA", count: orders.length },
    {
      label: "PERLU VERIFIKASI",
      value: "MENUNGGU_VERIFIKASI",
      count: pendingVerificationCount,
    },
    {
      label: "DIPROSES (KEMAS)",
      value: "DIPROSES",
      count: orders.filter((o) => o.status === "DIPROSES").length,
    },
    {
      label: "DIKIRIM",
      value: "DIKIRIM",
      count: orders.filter((o) => o.status === "DIKIRIM").length,
    },
    {
      label: "SELESAI",
      value: "SELESAI",
      count: orders.filter((o) => o.status === "SELESAI").length,
    },
    {
      label: "MENUNGGU PEMBAYARAN",
      value: "MENUNGGU_PEMBAYARAN",
      count: orders.filter((o) => o.status === "MENUNGGU_PEMBAYARAN").length,
    },
    {
      label: "DIBATALKAN",
      value: "DIBATALKAN",
      count: orders.filter((o) => o.status === "DIBATALKAN").length,
    },
  ];

  const filteredOrders = orders.filter((order) => {
    // Status filter
    if (activeTab !== "SEMUA" && order.status !== activeTab) {
      return false;
    }

    // Search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchId = order.id.toLowerCase().includes(q);
      const matchName = order.address.recipientName.toLowerCase().includes(q);
      const matchPhone = order.address.phone.toLowerCase().includes(q);
      const matchTracking = order.trackingNumber?.toLowerCase().includes(q);
      return matchId || matchName || matchPhone || matchTracking;
    }

    return true;
  });

  const handleQuickApprove = (orderId: string) => {
    updateOrderStatus(orderId, "DIPROSES");
    showToast(`Pesanan #${orderId} telah diverifikasi. Siap dikemas.`, "success");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222222] pb-6">
        <div>
          <span className="text-xs font-mono text-[#888888] tracking-widest uppercase">
            [MANAJEMEN TRANSAKSI]
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-1">
            DAFTAR PESANAN PELANGGAN
          </h1>
          <p className="text-xs font-body text-[#888888] mt-1">
            Validasi mutasi bank/QRIS manual, input nomor resi pengiriman, dan kelola alur fulfillment.
          </p>
        </div>

        <div className="text-xs font-mono text-[#888888] bg-[#111111] border border-[#222222] px-3 py-2">
          TOTAL TERCATAT: <span className="text-white font-bold">{orders.length} PESANAN</span>
        </div>
      </div>

      {/* Search and Tabs */}
      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
          <input
            type="text"
            placeholder="Cari berdasarkan Order ID (contoh: NTR-2026...), Nama Pembeli, No HP, atau Resi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0d0d0d] border border-[#222222] pl-10 pr-4 py-2.5 text-xs font-mono text-white placeholder-[#555555] focus:outline-none focus:border-white transition-colors"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase whitespace-nowrap transition-colors border ${
                activeTab === tab.value
                  ? "bg-white text-black border-white font-bold"
                  : "bg-[#111111] text-[#888888] border-[#222222] hover:text-white hover:border-[#383838]"
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span
                  className={`text-[10px] px-1 py-0.2 leading-tight ${
                    activeTab === tab.value
                      ? "bg-black text-white"
                      : "bg-[#222222] text-[#cccccc]"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List / Table */}
      {filteredOrders.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-[#222222] bg-[#0c0c0c]">
          <p className="text-xs font-mono text-[#666666] uppercase">
            [TIDAK ADA PESANAN YANG SESUAI DENGAN FILTER INI]
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredOrders.map((order) => {
            const isPendingVerification = order.status === "MENUNGGU_VERIFIKASI";
            const isProcessing = order.status === "DIPROSES";

            return (
              <div
                key={order.id}
                className="bg-[#0e0e0e] border border-[#222222] hover:border-[#383838] transition-colors p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5"
              >
                {/* Left Info */}
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-sm font-mono font-bold text-white tracking-wider">
                      #{order.id}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 border uppercase ${
                        order.status === "SELESAI"
                          ? "border-emerald-600 text-emerald-400 bg-emerald-950/30"
                          : order.status === "DIKIRIM"
                          ? "border-blue-500 text-blue-400 bg-blue-950/30"
                          : order.status === "DIPROSES"
                          ? "border-yellow-500 text-yellow-400 bg-yellow-950/30"
                          : order.status === "MENUNGGU_VERIFIKASI"
                          ? "border-white text-white bg-white/20 font-bold animate-pulse"
                          : "border-[#444444] text-[#888888]"
                      }`}
                    >
                      {order.status.replace(/_/g, " ")}
                    </span>
                    <span className="text-xs font-mono text-[#666666]">
                      {new Date(order.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  {/* Recipient & Total */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono">
                    <span className="text-white font-bold">{order.address.recipientName}</span>
                    <span className="text-[#888888]">WA: {order.address.phone}</span>
                    <span className="text-[#888888]">
                      {order.address.city}, {order.address.province}
                    </span>
                  </div>

                  {/* Items summary */}
                  <div className="text-xs font-mono text-[#777777]">
                    {order.items.map((it) => `${it.name} [${it.size}] x${it.quantity}`).join(" • ")}
                  </div>

                  {/* Courier & Tracking */}
                  <div className="flex items-center gap-3 text-xs font-mono text-[#888888]">
                    <span>Kurir: <strong className="text-white">{order.courier}</strong></span>
                    {order.trackingNumber ? (
                      <span className="text-emerald-400 bg-emerald-950/20 px-1.5 py-0.5 border border-emerald-800">
                        Resi: {order.trackingNumber}
                      </span>
                    ) : (
                      <span className="text-[#666666] italic">[Resi Belum Diinput]</span>
                    )}
                  </div>
                </div>

                {/* Right Total & Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between lg:justify-end gap-4 w-full lg:w-auto border-t lg:border-t-0 border-[#1c1c1c] pt-4 lg:pt-0">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-mono text-[#888888] block uppercase">
                      TOTAL BAYAR ({order.paymentMethod || "TRANSFER"})
                    </span>
                    <span className="text-base font-mono font-bold text-white">
                      {formatRupiah(order.total)}
                    </span>
                    <span className="text-[10px] font-mono text-[#666666] block">
                      (Termasuk kode unik +{order.uniqueCode})
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {isPendingVerification && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleQuickApprove(order.id)}
                        className="text-xs whitespace-nowrap"
                      >
                        <CheckCircle className="w-3.5 h-3.5 mr-1" />
                        VERIFIKASI
                      </Button>
                    )}

                    <Link href={`/admin/orders/${order.id}`}>
                      <Button variant="secondary" size="sm" className="text-xs whitespace-nowrap">
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        KELOLA
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
