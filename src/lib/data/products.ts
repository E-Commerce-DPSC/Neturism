import { Product } from "@/types/product";

export const PRODUCTS: Product[] = [
  {
    id: "prod-01",
    name: "CRUCIFIX BARBED CHAIN BRACELET",
    slug: "crucifix-barbed-chain-bracelet",
    category: "gelang",
    categoryLabel: "Gelang",
    price: 680000,
    description:
      "Gelang rantai industrial dengan tautan barbed kawat berduri dan liontin crucifix tajam. Konstruksi kokoh dengan pengait lobster custom berkekuatan tinggi.",
    material: "Stainless Steel 316L (Finishing Raw Brushed Charcoal)",
    specifications: [
      "Lebar rantai: 14 mm",
      "Ketebalan tautan: 4 mm",
      "Dimensi liontin crucifix: 32 x 20 mm",
      "Pengait: Heavy-duty custom box clasp",
    ],
    careInstructions: [
      "Bersihkan dengan kain microfiber kering setelah pemakaian.",
      "Hindari paparan langsung klorin atau cairan kimia abrasif.",
      "Simpan dalam pouch kain di tempat kering untuk menjaga warna brushed.",
    ],
    images: [
      "/images/products/bracelet-crucifix-1.svg",
      "/images/products/bracelet-crucifix-2.svg",
      "/images/products/bracelet-crucifix-3.svg",
    ],
    isFeatured: true,
    isNewDrop: true,
    variants: [
      { id: "var-01-17", size: "17 cm", sku: "NTR-BRC-CRX-17", stock: 4 },
      { id: "var-01-19", size: "19 cm", sku: "NTR-BRC-CRX-19", stock: 8 },
      { id: "var-01-21", size: "21 cm", sku: "NTR-BRC-CRX-21", stock: 0 }, // Out of stock example
    ],
  },
  {
    id: "prod-02",
    name: "OBSIDIAN EMBLEM SIGNET RING",
    slug: "obsidian-signet-ring",
    category: "cincin",
    categoryLabel: "Cincin",
    price: 490000,
    description:
      "Cincin signet masif dengan ukiran emblem geometris gothic di bagian atas dan tekstur stipple tajam pada samping lingkar.",
    material: "Stainless Steel Padat dengan Tekstur Teroksidasi Gelap",
    specifications: [
      "Diameter permukaan: 18 mm",
      "Berat rata-rata: 22 gram",
      "Pola ukiran: Engraved Gothic Cross Sigil",
    ],
    careInstructions: [
      "Aman terkena air tawar, keringkan setelahnya.",
      "Gunakan sikat berbulu halus untuk membersihkan sela ukiran bila berdebu.",
    ],
    images: [
      "/images/products/ring-obsidian-1.svg",
      "/images/products/ring-obsidian-2.svg",
    ],
    isFeatured: true,
    variants: [
      { id: "var-02-7", size: "US 7", sku: "NTR-RNG-OBS-07", stock: 5 },
      { id: "var-02-8", size: "US 8", sku: "NTR-RNG-OBS-08", stock: 3 },
      { id: "var-02-9", size: "US 9", sku: "NTR-RNG-OBS-09", stock: 6 },
      { id: "var-02-10", size: "US 10", sku: "NTR-RNG-OBS-10", stock: 0 },
    ],
  },
  {
    id: "prod-03",
    name: "THORN HEAVY LINK NECKLACE",
    slug: "thorn-heavy-link-necklace",
    category: "kalung",
    categoryLabel: "Kalung",
    price: 820000,
    description:
      "Kalung rantai berat dengan siluet duri geometris pada setiap sambungan mata rantai. Memberikan statement kuat di dada.",
    material: "Stainless Steel 316L (Raw Industrial Polish)",
    specifications: [
      "Panjang: 50 cm / 60 cm",
      "Lebar mata rantai: 10 mm",
      "Berat: 85 gram",
    ],
    careInstructions: [
      "Lap berkala dengan kain lap kering.",
      "Gantung saat tidak dipakai untuk menghindari kekusutan rantai.",
    ],
    images: [
      "/images/products/necklace-thorn-1.svg",
      "/images/products/necklace-thorn-2.svg",
    ],
    isFeatured: true,
    isNewDrop: true,
    variants: [
      { id: "var-03-50", size: "50 cm", sku: "NTR-NCK-THN-50", stock: 6 },
      { id: "var-03-60", size: "60 cm", sku: "NTR-NCK-THN-60", stock: 4 },
    ],
  },
  {
    id: "prod-04",
    name: "INDUSTRIAL CROSS EAR CUFF",
    slug: "industrial-cross-ear-cuff",
    category: "tubuh",
    categoryLabel: "Aksesoris Tubuh",
    price: 280000,
    description:
      "Ear cuff jepit tanpa perlu tindik dengan detail liontin salib mini menjuntai. Dirancang fleksibel untuk kenyamanan daun telinga.",
    material: "Zinc Alloy + Stainless Post",
    specifications: [
      "Panjang untaian: 35 mm",
      "Tipe penjepit: Adjustable compression cuff",
      "Berat: 8 gram",
    ],
    careInstructions: [
      "Jangan menekuk penjepit terlalu keras melebihi elastisitas logam.",
    ],
    images: [
      "/images/products/earcuff-cross-1.svg",
    ],
    variants: [
      { id: "var-04-os", size: "One Size", sku: "NTR-EAR-CRX-OS", stock: 12 },
    ],
  },
  {
    id: "prod-05",
    name: "DOUBLE CLAW TACTICAL BRACELET",
    slug: "double-claw-tactical-bracelet",
    category: "gelang",
    categoryLabel: "Gelang",
    price: 540000,
    description:
      "Kombinasi rantai ganda dengan pengait cakar brutalist. Desain tebal yang asimetris untuk layering streetwear.",
    material: "Stainless Steel 316L Matte Black Coated",
    specifications: [
      "Panjang: 18 cm / 20 cm",
      "Lebar profil: 12 mm",
      "Coating: PVD Vacuum Dark Gunmetal",
    ],
    careInstructions: [
      "Hindari gesekan kasar dengan benda tajam agar lapisan PVD awet.",
    ],
    images: [
      "/images/products/bracelet-claw-1.svg",
    ],
    variants: [
      { id: "var-05-18", size: "18 cm", sku: "NTR-BRC-CLW-18", stock: 7 },
      { id: "var-05-20", size: "20 cm", sku: "NTR-BRC-CLW-20", stock: 5 },
    ],
  },
  {
    id: "prod-06",
    name: "SOVEREIGN BARBED SIGNET RING",
    slug: "sovereign-barbed-signet-ring",
    category: "cincin",
    categoryLabel: "Cincin",
    price: 450000,
    description:
      "Cincin signet silinder ramping dengan motif duri melingkar penuh. Sangat cocok dipakai di jari kelingking atau telunjuk.",
    material: "Solid Stainless Steel Hard Polish",
    specifications: [
      "Tinggi pita cincin: 8 mm",
      "Finishing: High Contrast Mirror & Shadow Grooves",
    ],
    careInstructions: ["Aman untuk penggunaan harian."],
    images: [
      "/images/products/ring-sovereign-1.svg",
    ],
    variants: [
      { id: "var-06-7", size: "US 7", sku: "NTR-RNG-SOV-07", stock: 4 },
      { id: "var-06-8", size: "US 8", sku: "NTR-RNG-SOV-08", stock: 6 },
      { id: "var-06-9", size: "US 9", sku: "NTR-RNG-SOV-09", stock: 2 },
    ],
  },
];
