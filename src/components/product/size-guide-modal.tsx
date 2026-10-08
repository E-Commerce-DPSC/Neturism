"use client";

import * as React from "react";
import { Drawer } from "@/components/ui/drawer";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export function SizeGuideModal({
  isOpen,
  onClose,
  category,
}: SizeGuideModalProps) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      position="bottom"
      title="PANDUAN UKURAN // SIZE GUIDE"
    >
      <div className="flex flex-col gap-6 text-xs font-body text-[#AAAAAA] max-w-2xl mx-auto pb-10">
        {/* Intro */}
        <p className="leading-relaxed">
          Semua aksesoris Neturism dirancang dengan fitting streetwear yang presisi. Gunakan pita pengukur lentur atau benang untuk mengukur lingkar pergelangan atau jari Anda.
        </p>

        {/* Tabel Gelang */}
        <div className="flex flex-col gap-2">
          <span className="font-label text-xs uppercase font-bold text-white tracking-wider">
            [PANDUAN GELANG // BRACELET]
          </span>
          <div className="border border-[#222222] overflow-x-auto">
            <table className="w-full text-left font-label text-xs">
              <thead className="bg-[#181818] text-white border-b border-[#222222]">
                <tr>
                  <th className="p-3">UKURAN NETURISM</th>
                  <th className="p-3">LINGKAR PERGELANGAN</th>
                  <th className="p-3">REKOMENDASI FITTING</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e1e]">
                <tr>
                  <td className="p-3 text-white font-bold">17 CM</td>
                  <td className="p-3">15.0 - 16.5 cm</td>
                  <td className="p-3">Pergelangan ramping / snug fit</td>
                </tr>
                <tr>
                  <td className="p-3 text-white font-bold">19 CM</td>
                  <td className="p-3">16.6 - 18.5 cm</td>
                  <td className="p-3">Ukuran standar pria / regular loose</td>
                </tr>
                <tr>
                  <td className="p-3 text-white font-bold">21 CM</td>
                  <td className="p-3">18.6 - 20.5 cm</td>
                  <td className="p-3">Pergelangan besar / heavy drape</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabel Cincin */}
        <div className="flex flex-col gap-2 pt-2">
          <span className="font-label text-xs uppercase font-bold text-white tracking-wider">
            [PANDUAN CINCIN // SIGNET RINGS]
          </span>
          <div className="border border-[#222222] overflow-x-auto">
            <table className="w-full text-left font-label text-xs">
              <thead className="bg-[#181818] text-white border-b border-[#222222]">
                <tr>
                  <th className="p-3">SIZE US</th>
                  <th className="p-3">DIAMETER DALAM</th>
                  <th className="p-3">KELILING JARI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e1e]">
                <tr>
                  <td className="p-3 text-white font-bold">US 7</td>
                  <td className="p-3">17.3 mm</td>
                  <td className="p-3">54.4 mm</td>
                </tr>
                <tr>
                  <td className="p-3 text-white font-bold">US 8</td>
                  <td className="p-3">18.2 mm</td>
                  <td className="p-3">57.0 mm</td>
                </tr>
                <tr>
                  <td className="p-3 text-white font-bold">US 9</td>
                  <td className="p-3">18.9 mm</td>
                  <td className="p-3">59.5 mm</td>
                </tr>
                <tr>
                  <td className="p-3 text-white font-bold">US 10</td>
                  <td className="p-3">19.8 mm</td>
                  <td className="p-3">62.1 mm</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Cara Mengukur */}
        <div className="p-4 bg-[#141414] border border-[#2a2a2a] flex flex-col gap-2">
          <span className="font-label text-xs uppercase font-bold text-white">
            TIPS PENGUKURAN MANDIRI:
          </span>
          <ol className="list-decimal list-inside space-y-1 text-xs text-[#888888] font-body">
            <li>Lilitkan secarik kertas atau benang mengelilingi pergelangan atau jari.</li>
            <li>Tandai titik temu benang dengan pena.</li>
            <li>Ukur panjang benang dengan penggaris datar dalam satuan milimeter/sentimeter.</li>
            <li>Jika ragu di antara dua ukuran, disarankan memilih ukuran yang lebih besar.</li>
          </ol>
        </div>
      </div>
    </Drawer>
  );
}
