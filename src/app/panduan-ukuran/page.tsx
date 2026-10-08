import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-2 border-b border-[#222222] pb-6">
            <span className="font-label text-xs uppercase tracking-widest text-[#888888]">
              [OFFICIAL SIZING PROTOCOL]
            </span>
            <h1 className="font-headline text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              Panduan Ukuran (Size Guide)
            </h1>
            <p className="font-body text-xs sm:text-sm text-[#AAAAAA] pt-1">
              Standar pengukuran resmi perhiasan dan aksesoris Neturism untuk gelang, cincin, dan kalung.
            </p>
          </div>

          {/* Section: Gelang */}
          <div className="flex flex-col gap-4">
            <h2 className="font-headline text-lg sm:text-xl font-bold uppercase text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-white" />
              <span>1. Gelang Rantai (Bracelets)</span>
            </h2>
            <div className="border border-[#222222] bg-[#0d0d0d] overflow-x-auto">
              <table className="w-full text-left font-label text-xs">
                <thead className="bg-[#181818] text-white border-b border-[#222222]">
                  <tr>
                    <th className="p-3.5">UKURAN NETURISM</th>
                    <th className="p-3.5">LINGKAR PERGELANGAN</th>
                    <th className="p-3.5">KARAKTER FITTING</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e1e] text-[#AAAAAA]">
                  <tr>
                    <td className="p-3.5 text-white font-bold">17 CM</td>
                    <td className="p-3.5">15.0 - 16.5 cm</td>
                    <td className="p-3.5">Snug fit / pas di pergelangan ramping</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 text-white font-bold">19 CM</td>
                    <td className="p-3.5">16.6 - 18.5 cm</td>
                    <td className="p-3.5">Standar fitting reguler pria & wanita</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 text-white font-bold">21 CM</td>
                    <td className="p-3.5">18.6 - 20.5 cm</td>
                    <td className="p-3.5">Loose drape untuk pergelangan besar</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section: Cincin */}
          <div className="flex flex-col gap-4 pt-4 border-t border-[#222222]">
            <h2 className="font-headline text-lg sm:text-xl font-bold uppercase text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-white" />
              <span>2. Cincin Signet (Signet Rings)</span>
            </h2>
            <div className="border border-[#222222] bg-[#0d0d0d] overflow-x-auto">
              <table className="w-full text-left font-label text-xs">
                <thead className="bg-[#181818] text-white border-b border-[#222222]">
                  <tr>
                    <th className="p-3.5">SIZE STANDAR US</th>
                    <th className="p-3.5">DIAMETER DALAM (MM)</th>
                    <th className="p-3.5">KELILING LINGKAR JARI (MM)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e1e] text-[#AAAAAA]">
                  <tr>
                    <td className="p-3.5 text-white font-bold">US 7</td>
                    <td className="p-3.5">17.3 mm</td>
                    <td className="p-3.5">54.4 mm</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 text-white font-bold">US 8</td>
                    <td className="p-3.5">18.2 mm</td>
                    <td className="p-3.5">57.0 mm</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 text-white font-bold">US 9</td>
                    <td className="p-3.5">18.9 mm</td>
                    <td className="p-3.5">59.5 mm</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 text-white font-bold">US 10</td>
                    <td className="p-3.5">19.8 mm</td>
                    <td className="p-3.5">62.1 mm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Measurement Method */}
          <div className="p-6 bg-[#111111] border-2 border-white shadow-brutal flex flex-col gap-3">
            <span className="font-label text-xs uppercase font-bold text-white">
              [CARA MENGUKUR MANDIRI DENGAN BENANG]
            </span>
            <ol className="list-decimal list-inside space-y-2 text-xs font-body text-[#AAAAAA] leading-relaxed">
              <li>Ambil benang atau potongan kertas selebar 1 cm.</li>
              <li>Lilitkan di sekeliling buku jari terbesar atau pergelangan tangan Anda.</li>
              <li>Tandai dengan spidol titik di mana ujungnya saling bertemu.</li>
              <li>Ukur panjang garis tersebut dengan penggaris milimeter presisi.</li>
              <li>Bila ragu mengenai ukuran yang tepat, Anda dapat berkonsultasi via chat dengan admin kami.</li>
            </ol>
            <div className="pt-2">
              <Link
                href="/chat"
                className="inline-flex text-xs font-label uppercase text-white hover:underline underline-offset-4"
              >
                HUBUNGI ADMIN VIA CHAT KONSULTASI →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
