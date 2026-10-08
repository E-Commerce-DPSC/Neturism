"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useOrders } from "@/context/orders-context";
import { OrderStatus } from "@/types/order";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Truck,
  Printer,
  Copy,
  ExternalLink,
  Phone,
  AlertTriangle,
  FileText,
  Clock,
  Package,
} from "lucide-react";

interface AdminOrderDetailViewProps {
  orderId: string;
}

export function AdminOrderDetailView({ orderId }: AdminOrderDetailViewProps) {
  const router = useRouter();
  const { orders, getOrderById, updateOrderStatus, deleteOrder } = useOrders();
  const { showToast } = useToast();

  const order = getOrderById(orderId);

  // Form states
  const [courierName, setCourierName] = React.useState(order?.courier || "JNE REGULER");
  const [trackingInput, setTrackingInput] = React.useState(order?.trackingNumber || "");
  const [isPackingSlipOpen, setIsPackingSlipOpen] = React.useState(false);

  React.useEffect(() => {
    if (order) {
      setCourierName(order.courier);
      setTrackingInput(order.trackingNumber || "");
    }
  }, [order]);

  if (!order) {
    return (
      <div className="py-16 text-center border border-dashed border-[#222222] bg-[#0c0c0c]">
        <AlertTriangle className="w-8 h-8 mx-auto mb-3 text-[#FFB4AB]" />
        <h2 className="text-sm font-mono uppercase font-bold text-white">
          [PESANAN #{orderId} TIDAK DITEMUKAN]
        </h2>
        <p className="text-xs font-mono text-[#666666] mt-2">
          Pesanan mungkin telah dihapus atau ID tidak valid.
        </p>
        <div className="mt-6">
          <Link href="/admin/orders">
            <Button variant="secondary" size="sm">
              KEMBALI KE DAFTAR PESANAN
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Formatting WhatsApp link
  const cleanPhone = order.address.phone.replace(/[^0-9]/g, "");
  const waNumber = cleanPhone.startsWith("0")
    ? `62${cleanPhone.slice(1)}`
    : cleanPhone;
  const waLink = `https://wa.me/${waNumber}?text=Halo%20${encodeURIComponent(
    order.address.recipientName
  )},%20kami%20dari%20Neturism%20mengenai%20pesanan%20%23${order.id}`;

  const handleApprovePayment = () => {
    updateOrderStatus(order.id, "DIPROSES");
    showToast("Pembayaran diverifikasi. Status diubah ke DIPROSES.", "success");
  };

  const handleRejectPayment = () => {
    updateOrderStatus(order.id, "MENUNGGU_PEMBAYARAN");
    showToast("Bukti ditolak. Status dikembalikan ke MENUNGGU PEMBAYARAN.", "error");
  };

  const handleUpdateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingInput.trim()) {
      showToast("Nomor resi tidak boleh kosong.", "error");
      return;
    }
    updateOrderStatus(order.id, "DIKIRIM", undefined, trackingInput.trim(), courierName);
    showToast(`Resi ${trackingInput.trim()} tersimpan. Status: DIKIRIM.`, "success");
  };

  const handleMarkCompleted = () => {
    updateOrderStatus(order.id, "SELESAI");
    showToast("Pesanan berhasil ditandai SELESAI.", "success");
  };

  const handleCancelOrder = () => {
    if (confirm(`Yakin ingin membatalkan pesanan #${order.id}?`)) {
      updateOrderStatus(order.id, "DIBATALKAN");
      showToast("Pesanan dibatalkan.", "error");
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} disalin ke clipboard`, "info");
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Top Navigation & Status Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-6">
        <div className="flex flex-col gap-1">
          <Link
            href="/admin/orders"
            className="flex items-center gap-1.5 text-xs font-mono text-[#888888] hover:text-white transition-colors w-fit"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>KEMBALI KE DAFTAR PESANAN</span>
          </Link>
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-xl sm:text-2xl font-mono font-bold text-white">
              PESANAN #{order.id}
            </h1>
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
          </div>
          <span className="text-xs font-mono text-[#666666]">
            Dibuat pada:{" "}
            {new Date(order.createdAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        {/* Quick Top Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsPackingSlipOpen(true)}
            className="text-xs"
          >
            <Printer className="w-3.5 h-3.5 mr-1.5" />
            SURAT JALAN / RESI
          </Button>

          {order.status === "DIKIRIM" && (
            <Button
              variant="primary"
              size="sm"
              onClick={handleMarkCompleted}
              className="text-xs"
            >
              <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
              TANDAI SELESAI
            </Button>
          )}
        </div>
      </div>

      {/* Main Grid: 2 Cols */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Items & Payment Verification */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Section: Items Ordered */}
          <section className="bg-[#0c0c0c] border border-[#222222] p-6">
            <h2 className="text-xs font-mono uppercase font-bold tracking-widest text-white border-b border-[#1c1c1c] pb-3 mb-4">
              [ITEM DALAM PESANAN]
            </h2>

            <div className="divide-y divide-[#181818]">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 bg-[#141414] border border-[#262626] shrink-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xs font-heading font-bold text-white">
                        {item.name}
                      </h3>
                      <p className="text-[11px] font-mono text-[#888888] mt-0.5">
                        Ukuran: <strong className="text-white">{item.size}</strong> • Qty:{" "}
                        <strong className="text-white">{item.quantity}</strong>
                      </p>
                      <p className="text-[11px] font-mono text-[#666666] mt-0.5">
                        @ {formatRupiah(item.price)}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-white">
                      {formatRupiah(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="border-t border-[#222222] mt-6 pt-4 flex flex-col gap-2 text-xs font-mono">
              <div className="flex justify-between text-[#888888]">
                <span>Subtotal Produk</span>
                <span>{formatRupiah(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#888888]">
                <span>Biaya Pengiriman ({order.courier})</span>
                <span>{formatRupiah(order.shippingCost)}</span>
              </div>
              <div className="flex justify-between text-[#888888]">
                <span>Kode Unik Transfer</span>
                <span className="text-white">+{order.uniqueCode}</span>
              </div>
              <div className="border-t border-[#1c1c1c] pt-2 flex justify-between text-sm font-bold text-white">
                <span>TOTAL HARUS DIBAYAR</span>
                <span className="text-base text-white">{formatRupiah(order.total)}</span>
              </div>
            </div>
          </section>

          {/* Section: Payment Verification Panel */}
          <section className="bg-[#0c0c0c] border border-[#222222] p-6">
            <div className="flex items-center justify-between border-b border-[#1c1c1c] pb-3 mb-4">
              <h2 className="text-xs font-mono uppercase font-bold tracking-widest text-white">
                [VERIFIKASI BUKTI TRANSFER]
              </h2>
              <Badge variant="outline" size="sm">
                {order.paymentMethod || "TRANSFER_BANK"}
              </Badge>
            </div>

            {order.paymentProofUrl ? (
              <div className="flex flex-col sm:flex-row items-start gap-6 bg-[#111111] border border-[#262626] p-4">
                <div className="relative w-40 h-48 bg-black border border-[#333333] shrink-0 overflow-hidden flex items-center justify-center">
                  <Image
                    src={order.paymentProofUrl}
                    alt="Bukti Transfer"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between h-full gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono">
                      <CheckCircle className="w-4 h-4" />
                      <span>BUKTI PEMBAYARAN TELAH DIUNGGAH PELANGGAN</span>
                    </div>
                    <p className="text-xs font-mono text-[#888888] mt-2">
                      Cocokkan nominal mutasi bank sebesar{" "}
                      <strong className="text-white">{formatRupiah(order.total)}</strong>{" "}
                      dengan angka pada struk dan mutasi rekening.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#222222]">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleApprovePayment}
                      className="text-xs"
                    >
                      <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                      TERIMA & PROSES PESANAN
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRejectPayment}
                      className="text-xs text-[#FFB4AB] border-[#FFB4AB]/40 hover:bg-[#FFB4AB]/10"
                    >
                      <XCircle className="w-3.5 h-3.5 mr-1.5" />
                      TOLAK BUKTI
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-[#111111] border border-dashed border-[#222222] text-[#666666]">
                <Clock className="w-6 h-6 mx-auto mb-2 text-[#444444]" />
                <p className="text-xs font-mono uppercase tracking-wider">
                  PELANGGAN BELUM MENGUNGGAH BUKTI PEMBAYARAN
                </p>
                <p className="text-[11px] font-mono text-[#555555] mt-1">
                  Batas waktu pembayaran 24 jam sebelum kedaluwarsa otomatis.
                </p>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleApprovePayment}
                    className="text-xs"
                  >
                    KONFIRMASI MANUAL (MUTASI COCOK TANPA STRUK)
                  </Button>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Customer Info & Shipping Controls */}
        <div className="flex flex-col gap-6">
          {/* Section: Customer & Destination Address */}
          <section className="bg-[#0c0c0c] border border-[#222222] p-6">
            <h2 className="text-xs font-mono uppercase font-bold tracking-widest text-white border-b border-[#1c1c1c] pb-3 mb-4">
              [DATA PEMESAN & TUJUAN]
            </h2>

            <div className="flex flex-col gap-3 text-xs font-mono">
              <div>
                <span className="text-[#666666] block text-[10px] uppercase">NAMA PENERIMA</span>
                <span className="text-white font-bold">{order.address.recipientName}</span>
              </div>

              <div>
                <span className="text-[#666666] block text-[10px] uppercase">NOMOR WHATSAPP</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-white">{order.address.phone}</span>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>CHAT WA</span>
                  </a>
                </div>
              </div>

              <div>
                <span className="text-[#666666] block text-[10px] uppercase">ALAMAT LENGKAP</span>
                <p className="text-[#cccccc] leading-relaxed mt-0.5">
                  {order.address.streetAddress}
                </p>
                <p className="text-[#888888] mt-0.5">
                  {order.address.city}, {order.address.province} {order.address.postalCode}
                </p>
              </div>

              <div className="pt-2 border-t border-[#1c1c1c]">
                <button
                  onClick={() =>
                    copyToClipboard(
                      `${order.address.recipientName}\n${order.address.phone}\n${order.address.streetAddress}\n${order.address.city}, ${order.address.province} ${order.address.postalCode}`,
                      "Alamat penerima"
                    )
                  }
                  className="text-[11px] text-[#aaaaaa] hover:text-white flex items-center gap-1.5"
                >
                  <Copy className="w-3 h-3" />
                  <span>SALIN ALAMAT UNTUK LABEL</span>
                </button>
              </div>
            </div>
          </section>

          {/* Section: Shipping & Tracking Number Form */}
          <section className="bg-[#0c0c0c] border border-[#222222] p-6">
            <h2 className="text-xs font-mono uppercase font-bold tracking-widest text-white border-b border-[#1c1c1c] pb-3 mb-4">
              [PENGIRIMAN & NOMOR RESI]
            </h2>

            <form onSubmit={handleUpdateShipping} className="flex flex-col gap-4 text-xs font-mono">
              <div>
                <label className="text-[#666666] block text-[10px] uppercase mb-1">
                  EKSPEDISI / KURIR
                </label>
                <select
                  value={courierName}
                  onChange={(e) => setCourierName(e.target.value)}
                  className="w-full bg-[#111111] border border-[#262626] px-3 py-2 text-white text-xs focus:outline-none focus:border-white"
                >
                  <option value="JNE REGULER">JNE REGULER</option>
                  <option value="JNE YES (YAKIN ESOK SAMPAI)">JNE YES</option>
                  <option value="SICEPAT REGULER">SICEPAT REGULER</option>
                  <option value="J&T EXPRESS">J&T EXPRESS</option>
                  <option value="ANTERAJA">ANTERAJA</option>
                </select>
              </div>

              <div>
                <label className="text-[#666666] block text-[10px] uppercase mb-1">
                  NOMOR RESI PENGIRIMAN
                </label>
                <input
                  type="text"
                  placeholder="Contoh: JNE8829102910ID..."
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  className="w-full bg-[#111111] border border-[#262626] px-3 py-2 text-white text-xs focus:outline-none focus:border-white placeholder-[#555555]"
                />
              </div>

              <Button type="submit" variant="primary" size="sm" className="w-full text-xs">
                <Truck className="w-3.5 h-3.5 mr-1.5" />
                SIMPAN RESI & TANDAI DIKIRIM
              </Button>
            </form>
          </section>

          {/* Danger Actions */}
          <section className="bg-[#0c0c0c] border border-[#222222] p-4 flex flex-col gap-2">
            <span className="text-[10px] font-mono text-[#666666] uppercase">KENDALI KHUSUS</span>
            <button
              onClick={handleCancelOrder}
              className="text-left text-xs font-mono text-[#FFB4AB] hover:underline"
            >
              Batalkan Pesanan Ini
            </button>
          </section>
        </div>
      </div>

      {/* Modal: Packing Slip / Thermal Label Preview */}
      {isPackingSlipOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white text-black max-w-md w-full p-6 border-2 border-black font-mono text-xs flex flex-col gap-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <span className="font-bold text-sm tracking-widest">NETURISM // LABEL PENGIRIMAN</span>
              <button
                onClick={() => setIsPackingSlipOpen(false)}
                className="text-black font-bold text-sm hover:underline"
              >
                [X TUTUP]
              </button>
            </div>

            <div className="border border-black p-3 bg-[#f5f5f5]">
              <span className="block text-[10px] text-gray-600">KURIR:</span>
              <span className="font-bold text-sm">{order.courier}</span>
              {order.trackingNumber && (
                <div className="mt-1">
                  <span className="block text-[10px] text-gray-600">NO. RESI:</span>
                  <span className="font-bold">{order.trackingNumber}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 text-[11px] border-b border-black pb-3">
              <div>
                <span className="font-bold block">PENGIRIM:</span>
                <p>NETURISM ACCESSORIES</p>
                <p>Jakarta, Indonesia</p>
                <p>WA: 0812-8910-2931</p>
              </div>
              <div>
                <span className="font-bold block">PENERIMA:</span>
                <p className="font-bold">{order.address.recipientName}</p>
                <p>{order.address.phone}</p>
                <p>{order.address.streetAddress}</p>
                <p>{order.address.city}, {order.address.province} {order.address.postalCode}</p>
              </div>
            </div>

            <div>
              <span className="font-bold block text-[11px] mb-1">MANIFEST BARANG:</span>
              <ul className="divide-y divide-gray-300 text-[10px]">
                {order.items.map((it, idx) => (
                  <li key={idx} className="py-1 flex justify-between">
                    <span>{it.name} [{it.size}]</span>
                    <span>x{it.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="bg-black text-white px-4 py-2 font-bold text-xs uppercase"
              >
                CETAK LABEL / PRINT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
