import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function ShippingExchangePolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-2 border-b border-[#222222] pb-6">
            <span className="font-label text-xs uppercase tracking-widest text-[#888888]">
              [POLICY & LOGISTICS GUIDELINES]
            </span>
            <h1 className="font-headline text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              Pengiriman & Tukar Ukuran
            </h1>
            <p className="font-body text-xs sm:text-sm text-[#AAAAAA] pt-1">
              Ketentuan resmi operasional logistik, verifikasi pesanan, dan penukaran ukuran aksesoris Neturism.
            </p>
          </div>

          <div className="flex flex-col gap-8 text-xs font-body text-[#AAAAAA] leading-relaxed">
            {/* Section 1: Pengiriman */}
            <div className="p-6 bg-[#111111] border border-[#222222] flex flex-col gap-4">
              <h2 className="font-label text-xs uppercase font-bold text-white tracking-wider">
                [1. OPERASIONAL & PENGIRIMAN]
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Pesanan diproses setelah bukti pembayaran berhasil diverifikasi oleh admin. Waktu verifikasi pembayaran rata-rata &lt; 1 jam kerja (09.00 - 21.00 WIB).
                </li>
                <li>
                  Pengiriman dilakukan menggunakan kurir resmi: <strong>JNE</strong>, <strong>J&T Express</strong>, atau <strong>SiCepat</strong>.
                </li>
                <li>
                  Waktu pengemasan hingga penyerahan kurir maksimal 24 jam hari kerja.
                </li>
                <li>
                  Nomor resi pengiriman akan diinput ke detail riwayat pesanan akun Anda dan dapat dilacak langsung.
                </li>
              </ul>
            </div>

            {/* Section 2: Kebijakan Tukar Ukuran */}
            <div className="p-6 bg-[#111111] border border-[#222222] flex flex-col gap-4">
              <h2 className="font-label text-xs uppercase font-bold text-white tracking-wider">
                [2. KETENTUAN PENUKARAN UKURAN (SIZE EXCHANGE)]
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Jika ukuran gelang atau cincin yang diterima tidak pas, penukaran ukuran diperbolehkan maksimal <strong>7 hari kalender</strong> sejak pesanan ditandai diterima.
                </li>
                <li>
                  Produk wajib dalam kondisi baru, belum pernah dipakai beraktivitas luar, dan kemasan/pouch lengkap.
                </li>
                <li>
                  Ongkos kirim bolak-balik untuk penukaran ukuran ditanggung sepenuhnya oleh pembeli, kecuali terjadi kekeliruan pengiriman ukuran oleh pihak Neturism.
                </li>
                <li>
                  Neturism tidak melayani pengembalian dana (refund uang tunai); penukaran hanya berlaku untuk ukuran yang sama atau karya setara bila stok ukuran yang diinginkan habis.
                </li>
              </ul>
            </div>

            {/* Section 3: Cara Klaim Tukar */}
            <div className="p-6 bg-[#141414] border-2 border-white shadow-brutal flex flex-col gap-4 text-white">
              <span className="font-label text-xs uppercase font-bold">
                [LANGKAH PENGAJUAN TUKAR UKURAN]
              </span>
              <p className="text-xs text-[#AAAAAA]">
                Hubungi admin kami melalui fitur Live Chat di website atau WhatsApp resmi dengan menyertakan Nomor Pesanan (#NTR-...) dan ukuran yang ingin ditukar.
              </p>
              <div className="pt-2">
                <Link
                  href="/chat"
                  className="inline-flex px-5 py-2.5 bg-white text-black font-label text-xs uppercase font-bold hover:bg-black hover:text-white border border-white transition-colors"
                >
                  BUKA CHAT KONSULTASI ADMIN →
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
