"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { formatRupiah } from "@/lib/utils";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal, totalItems } =
    useCart();

  const [orderNote, setOrderNote] = React.useState("");

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="flex-1 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Top Title */}
          <div className="flex flex-col gap-1 border-b border-[#222222] pb-6">
            <span className="font-label text-xs uppercase tracking-widest text-[#888888]">
              [CHECKOUT STAGE // 01]
            </span>
            <div className="flex items-center justify-between">
              <h1 className="font-headline text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                Keranjang Belanja
              </h1>
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs font-label uppercase text-[#888888] hover:text-[#FFB4AB] transition-colors"
                >
                  [KOSONGKAN KERANJANG]
                </button>
              )}
            </div>
          </div>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
              {/* Left Column: Cart Items List */}
              <div className="lg:col-span-2 flex flex-col divide-y divide-[#222222] border border-[#222222] bg-[#0c0c0c]">
                {items.map((item) => (
                  <div
                    key={item.variantId}
                    className="p-4 sm:p-6 flex gap-4 sm:gap-6 items-center"
                  >
                    {/* Thumbnail 1:1 */}
                    <div className="relative w-20 h-20 sm:w-28 sm:h-28 aspect-square bg-[#141414] border border-[#333333] shrink-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col flex-1 gap-1 min-w-0">
                      <h3 className="font-headline text-xs sm:text-base font-bold uppercase text-white truncate">
                        {item.name}
                      </h3>
                      <span className="font-label text-xs text-[#AAAAAA] uppercase">
                        UKURAN: <strong className="text-white">{item.size}</strong>
                      </span>
                      <span className="font-body text-xs sm:text-sm font-semibold text-white pt-1">
                        {formatRupiah(item.price)}
                      </span>

                      {/* Quantity & Delete Controls */}
                      <div className="flex items-center justify-between gap-4 pt-3 mt-1 border-t border-[#1a1a1a]">
                        <div className="flex items-center border border-[#333333] bg-[#141414]">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.variantId, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="p-1.5 sm:p-2 text-[#888888] hover:text-white disabled:opacity-30 disabled:hover:text-[#888888]"
                            aria-label="Kurangi jumlah"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="px-3 sm:px-4 text-xs font-label font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.variantId, item.quantity + 1)
                            }
                            disabled={item.quantity >= item.maxStock}
                            className="p-1.5 sm:p-2 text-[#888888] hover:text-white disabled:opacity-30 disabled:hover:text-[#888888]"
                            aria-label="Tambah jumlah"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.variantId)}
                          className="p-2 text-[#888888] hover:text-[#FFB4AB] transition-colors flex items-center gap-1 text-xs font-label"
                          aria-label="Hapus produk"
                        >
                          <Trash2 size={14} />
                          <span className="hidden sm:inline">HAPUS</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Optional Order Note */}
                <div className="p-4 sm:p-6 bg-[#111111] border-t border-[#222222] flex flex-col gap-2">
                  <label
                    htmlFor="order-note"
                    className="font-label text-xs uppercase text-[#AAAAAA] tracking-wider"
                  >
                    CATATAN PESANAN (OPSIONAL - MAKS. 200 KARAKTER):
                  </label>
                  <textarea
                    id="order-note"
                    rows={2}
                    maxLength={200}
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    placeholder="Instruksi pengemasan khusus atau pesan tertentu..."
                    className="w-full p-3 bg-[#0a0a0a] border border-[#333333] text-xs font-body text-white placeholder-[#666666] focus:outline-none focus:border-white transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Right Column: Order Summary */}
              <div className="p-6 bg-[#111111] border-2 border-white shadow-brutal flex flex-col gap-6">
                <span className="font-label text-xs uppercase font-bold tracking-widest text-white border-b border-[#222222] pb-3">
                  [RINGKASAN PESANAN]
                </span>

                <div className="flex flex-col gap-3 text-xs font-body">
                  <div className="flex justify-between text-[#AAAAAA]">
                    <span>Total Item ({totalItems} pcs)</span>
                    <span className="text-white font-medium">{formatRupiah(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#AAAAAA]">
                    <span>Ongkos Kirim</span>
                    <span className="text-[#888888] font-label text-[11px]">
                      Dihitung di checkout
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#222222] flex justify-between items-baseline">
                  <span className="font-label text-xs uppercase font-bold text-white">
                    ESTIMASI TOTAL:
                  </span>
                  <span className="font-headline text-xl sm:text-2xl font-bold text-white">
                    {formatRupiah(subtotal)}
                  </span>
                </div>

                <div className="pt-2 flex flex-col gap-3">
                  <Link
                    href="/checkout"
                    className="w-full py-4 bg-white text-black font-label text-xs sm:text-sm uppercase font-bold tracking-wider hover:bg-black hover:text-white border-2 border-white transition-all text-center flex items-center justify-center gap-2"
                  >
                    <span>LANJUT KE CHECKOUT</span>
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    href="/products"
                    className="w-full py-3 bg-transparent text-white font-label text-xs uppercase text-center hover:underline underline-offset-4"
                  >
                    ← Lanjut Belanja Koleksi Lain
                  </Link>
                </div>

                {/* Honest Note */}
                <div className="pt-3 border-t border-[#222222] text-[11px] font-label text-[#666666] leading-relaxed">
                  * Keranjang tersimpan sementara di perangkat ini dan akan otomatis digabung ke akun Anda setelah masuk/daftar saat checkout.
                </div>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="py-24 px-6 border border-[#222222] bg-[#111111] text-center flex flex-col items-center justify-center gap-4 my-8">
              <span className="font-label text-xs uppercase tracking-widest text-[#888888]">
                [EMPTY CART]
              </span>
              <h2 className="font-headline text-xl sm:text-2xl font-bold uppercase text-white">
                Keranjang belanja Anda masih kosong
              </h2>
              <p className="font-body text-xs text-[#888888] max-w-sm">
                Belum ada perhiasan atau aksesoris yang Anda tambahkan. Silakan jelajahi katalog untuk menemukan rilisan signature Neturism.
              </p>
              <div className="pt-4">
                <Link
                  href="/products"
                  className="px-8 py-4 bg-white text-black font-label text-xs uppercase font-bold tracking-wider hover:bg-black hover:text-white border-2 border-white transition-colors"
                >
                  JELAJAHI KATALOG PRODUK →
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
