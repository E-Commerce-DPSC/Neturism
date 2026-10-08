"use client";

import * as React from "react";
import Link from "next/link";
import { useOrders } from "@/context/orders-context";
import { useProducts } from "@/context/products-context";
import { formatRupiah } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import {
  Clock,
  CheckCircle,
  Truck,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Package,
  Eye,
  Plus,
  RefreshCw,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { orders, updateOrderStatus, resetOrders } = useOrders();
  const { products, updateVariantStock } = useProducts();
  const { showToast } = useToast();

  // Metrics calculation
  const pendingVerificationOrders = orders.filter(
    (o) => o.status === "MENUNGGU_VERIFIKASI"
  );
  const processingOrders = orders.filter((o) => o.status === "DIPROSES");
  const shippingOrders = orders.filter((o) => o.status === "DIKIRIM");

  const verifiedRevenue = orders
    .filter((o) => ["DIBAYAR", "DIPROSES", "DIKIRIM", "SELESAI"].includes(o.status))
    .reduce((sum, o) => sum + o.total, 0);

  // Low stock variants calculation
  const lowStockItems: {
    productId: string;
    productName: string;
    variantId: string;
    size: string;
    stock: number;
  }[] = [];

  products.forEach((prod) => {
    prod.variants.forEach((v) => {
      if (v.stock <= 3) {
        lowStockItems.push({
          productId: prod.id,
          productName: prod.name,
          variantId: v.id,
          size: v.size,
          stock: v.stock,
        });
      }
    });
  });

  const handleQuickApprove = (orderId: string) => {
    updateOrderStatus(orderId, "DIPROSES");
    showToast(`Pesanan #${orderId} telah diverifikasi. Siap dikemas.`, "success");
  };

  const handleQuickRestock = (productId: string, variantId: string, currentStock: number) => {
    updateVariantStock(productId, variantId, currentStock + 5);
    showToast("Stok varian berhasil ditambah 5 unit.", "success");
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222222] pb-6">
        <div>
          <span className="text-xs font-mono text-[#888888] tracking-widest uppercase">
            [DASHBOARD OPERASIONAL]
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-1">
            RINGKASAN & KENDALI TOKO
          </h1>
          <p className="text-xs font-body text-[#888888] mt-1">
            Pantau arus transaksi, verifikasi mutasi transfer, serta ketersediaan stok fisik secara realtime.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/products/new">
            <Button variant="primary" size="sm" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>TAMBAH PRODUK</span>
            </Button>
          </Link>
          <Link href="/admin/orders">
            <Button variant="secondary" size="sm">
              SEMUA PESANAN
            </Button>
          </Link>
        </div>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-[#0e0e0e] border border-[#222222] p-5 flex flex-col justify-between hover:border-[#383838] transition-colors">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-xs font-mono uppercase tracking-wider">PERLU VERIFIKASI</span>
            <Clock className="w-4 h-4 text-white" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-heading font-bold text-white">
              {pendingVerificationOrders.length}
            </span>
            <span className="text-xs font-mono text-[#666666] ml-2">PESANAN</span>
          </div>
          <p className="text-[11px] font-mono text-[#888888] mt-2 border-t border-[#1a1a1a] pt-2">
            Bukti pembayaran menunggu konfirmasi
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#0e0e0e] border border-[#222222] p-5 flex flex-col justify-between hover:border-[#383838] transition-colors">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-xs font-mono uppercase tracking-wider">SIAP DIKEMAS</span>
            <Package className="w-4 h-4 text-white" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-heading font-bold text-white">
              {processingOrders.length}
            </span>
            <span className="text-xs font-mono text-[#666666] ml-2">PESANAN</span>
          </div>
          <p className="text-[11px] font-mono text-[#888888] mt-2 border-t border-[#1a1a1a] pt-2">
            Pembayaran valid, tunggu no. resi
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#0e0e0e] border border-[#222222] p-5 flex flex-col justify-between hover:border-[#383838] transition-colors">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-xs font-mono uppercase tracking-wider">TOTAL OMZET TERCATAT</span>
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div className="mt-4">
            <span className="text-2xl font-heading font-bold text-white">
              {formatRupiah(verifiedRevenue)}
            </span>
          </div>
          <p className="text-[11px] font-mono text-[#888888] mt-2 border-t border-[#1a1a1a] pt-2">
            Akumulasi transaksi terkonfirmasi
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-[#0e0e0e] border border-[#222222] p-5 flex flex-col justify-between hover:border-[#383838] transition-colors">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-xs font-mono uppercase tracking-wider">STOK KRITIS / HABIS</span>
            <AlertTriangle className="w-4 h-4 text-[#FFB4AB]" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-heading font-bold text-[#FFB4AB]">
              {lowStockItems.length}
            </span>
            <span className="text-xs font-mono text-[#666666] ml-2">VARIAN</span>
          </div>
          <p className="text-[11px] font-mono text-[#888888] mt-2 border-t border-[#1a1a1a] pt-2">
            Sisa stok ≤ 3 unit di gudang
          </p>
        </div>
      </div>

      {/* Action Queue: Pending Verifications */}
      <section className="bg-[#0c0c0c] border border-[#222222] p-6">
        <div className="flex items-center justify-between border-b border-[#1c1c1c] pb-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
            <h2 className="text-sm font-mono uppercase font-bold tracking-widest text-white">
              [ANTEAN MENDESAK: KONFIRMASI PEMBAYARAN]
            </h2>
          </div>
          <span className="text-xs font-mono text-[#888888]">
            {pendingVerificationOrders.length} MEMERLUKAN TINDAKAN
          </span>
        </div>

        {pendingVerificationOrders.length === 0 ? (
          <div className="py-8 text-center border border-dashed border-[#222222] text-[#666666]">
            <CheckCircle className="w-6 h-6 mx-auto mb-2 text-[#444444]" />
            <p className="text-xs font-mono uppercase tracking-wider">
              TIDAK ADA PEMBAYARAN TERTUNDA. SEMUA TRANSAKSI BERES.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {pendingVerificationOrders.map((order) => (
              <div
                key={order.id}
                className="bg-[#141414] border border-[#262626] p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-[#444444] transition-colors"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-white">
                      #{order.id}
                    </span>
                    <Badge variant="outline" size="sm" className="text-[10px]">
                      {order.paymentMethod || "TRANSFER"}
                    </Badge>
                    <span className="text-xs font-mono text-[#888888]">
                      Kode Unik: +{order.uniqueCode}
                    </span>
                  </div>
                  <div className="text-xs font-body text-[#cccccc]">
                    {order.address.recipientName} ({order.address.phone}) —{" "}
                    <span className="font-mono font-bold text-white">
                      {formatRupiah(order.total)}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-[#666666]">
                    Item: {order.items.map((i) => `${i.name} (${i.size}) x${i.quantity}`).join(", ")}
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Link href={`/admin/orders/${order.id}`} className="flex-1 md:flex-none">
                    <Button variant="secondary" size="sm" className="w-full text-xs">
                      <Eye className="w-3.5 h-3.5 mr-1.5" />
                      LIHAT BUKTI
                    </Button>
                  </Link>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1 md:flex-none text-xs"
                    onClick={() => handleQuickApprove(order.id)}
                  >
                    <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                    VERIFIKASI (VALID)
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Grid: Recent Orders & Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Recent Orders */}
        <section className="lg:col-span-2 bg-[#0c0c0c] border border-[#222222] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#1c1c1c] pb-4 mb-4">
              <h2 className="text-sm font-mono uppercase font-bold tracking-widest text-white">
                [PESANAN TERAKHIR]
              </h2>
              <Link
                href="/admin/orders"
                className="text-xs font-mono text-[#888888] hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>LIHAT SEMUA ({orders.length})</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#222222] text-[#666666]">
                    <th className="pb-3 font-normal">ID PESANAN</th>
                    <th className="pb-3 font-normal">PEMBELI</th>
                    <th className="pb-3 font-normal">TOTAL</th>
                    <th className="pb-3 font-normal">STATUS</th>
                    <th className="pb-3 font-normal text-right">AKSI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#181818]">
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-[#121212] transition-colors">
                      <td className="py-3 font-bold text-white">{order.id}</td>
                      <td className="py-3 text-[#cccccc]">{order.address.recipientName}</td>
                      <td className="py-3 text-white font-bold">{formatRupiah(order.total)}</td>
                      <td className="py-3">
                        <span
                          className={`text-[10px] px-2 py-0.5 border ${
                            order.status === "SELESAI"
                              ? "border-emerald-600 text-emerald-400 bg-emerald-950/30"
                              : order.status === "DIKIRIM"
                              ? "border-blue-500 text-blue-400 bg-blue-950/30"
                              : order.status === "DIPROSES"
                              ? "border-yellow-500 text-yellow-400 bg-yellow-950/30"
                              : order.status === "MENUNGGU_VERIFIKASI"
                              ? "border-white text-white bg-white/10"
                              : "border-[#444444] text-[#888888]"
                          }`}
                        >
                          {order.status.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="text-[#aaaaaa] hover:text-white underline underline-offset-4"
                        >
                          Detail
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Right 1 Col: Low Stock Alerts */}
        <section className="bg-[#0c0c0c] border border-[#222222] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#1c1c1c] pb-4 mb-4">
              <h2 className="text-sm font-mono uppercase font-bold tracking-widest text-[#FFB4AB]">
                [PERINGATAN STOK GUDANG]
              </h2>
              <Link
                href="/admin/products"
                className="text-xs font-mono text-[#888888] hover:text-white transition-colors"
              >
                KATALOG →
              </Link>
            </div>

            {lowStockItems.length === 0 ? (
              <p className="text-xs font-mono text-[#666666] py-6 text-center">
                Semua varian memiliki stok cukup (&gt; 3 unit).
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {lowStockItems.slice(0, 5).map((item) => (
                  <div
                    key={`${item.productId}-${item.variantId}`}
                    className="p-3 bg-[#111111] border border-[#222222] flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <p className="font-heading font-bold text-white text-[11px] truncate max-w-[150px]">
                        {item.productName}
                      </p>
                      <p className="font-mono text-[#888888] text-[10px]">
                        Ukuran: {item.size} • Sisa:{" "}
                        <span className={item.stock === 0 ? "text-[#FFB4AB] font-bold" : "text-white"}>
                          {item.stock} unit
                        </span>
                      </p>
                    </div>

                    <button
                      onClick={() => handleQuickRestock(item.productId, item.variantId, item.stock)}
                      className="text-[11px] font-mono px-2 py-1 bg-[#1c1c1c] hover:bg-white hover:text-black border border-[#333333] transition-colors"
                    >
                      +5 RESTOCK
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#1a1a1a] mt-4">
            <Link href="/admin/products" className="block text-center text-xs font-mono text-[#aaaaaa] hover:text-white">
              Kelola Semua Inventaris Produk →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
