"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cart-context";
import { useOrders } from "@/context/orders-context";
import { formatRupiah } from "@/lib/utils";
import { Truck, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";

interface ZoneRate {
  id: "jabodetabek" | "jawa" | "luar-jawa";
  label: string;
  cost: number;
}

const ZONES: ZoneRate[] = [
  { id: "jabodetabek", label: "JABODETABEK", cost: 12000 },
  { id: "jawa", label: "PULAU JAWA (NON-JABODETABEK)", cost: 22000 },
  { id: "luar-jawa", label: "LUAR PULAU JAWA", cost: 45000 },
];

const COURIERS = [
  { id: "JNE", name: "JNE REGULER", est: "1-3 Hari Kerja" },
  { id: "JNT", name: "J&T EXPRESS", est: "1-3 Hari Kerja" },
  { id: "SICEPAT", name: "SICEPAT REGULER", est: "1-3 Hari Kerja" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { createOrder } = useOrders();

  // Form states
  const [recipientName, setRecipientName] = React.useState("Bagas Pratama");
  const [phone, setPhone] = React.useState("081289102931");
  const [streetAddress, setStreetAddress] = React.useState("Jl. Senopati No. 42, RT 02 / RW 03");
  const [city, setCity] = React.useState("Jakarta Selatan");
  const [province, setProvince] = React.useState("DKI Jakarta");
  const [postalCode, setPostalCode] = React.useState("12190");

  const [selectedZone, setSelectedZone] = React.useState<ZoneRate>(ZONES[0]);
  const [selectedCourier, setSelectedCourier] = React.useState(COURIERS[0].name);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  const shippingCost = selectedZone.cost;
  const estimatedTotal = subtotal + shippingCost;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!recipientName || !phone || !streetAddress || !city || !postalCode) {
      setError("Mohon lengkapi semua data alamat pengiriman.");
      return;
    }

    if (items.length === 0) {
      setError("Keranjang belanja kosong. Silakan pilih produk terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderItems = items.map((i) => ({
        productId: i.productId,
        variantId: i.variantId,
        name: i.name,
        size: i.size,
        price: i.price,
        quantity: i.quantity,
        image: i.image,
      }));

      const newOrder = createOrder({
        items: orderItems,
        address: {
          recipientName,
          phone,
          streetAddress,
          city,
          province,
          postalCode,
        },
        courier: selectedCourier,
        shippingCost,
        subtotal,
      });

      // Clear cart
      clearCart();

      // Navigate to Payment page
      window.location.href = `/payment/${newOrder.id}`;
    } catch (err) {
      console.error(err);
      setError("Gagal membuat pesanan. Silakan coba kembali.");
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && !isSubmitting) {
    return (
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <span className="font-label text-xs uppercase text-[#888888] mb-2">
            [CHECKOUT EMPTY]
          </span>
          <h1 className="font-headline text-2xl font-bold uppercase mb-4">
            Tidak ada item untuk di-checkout
          </h1>
          <p className="font-body text-xs text-[#888888] max-w-sm mb-6">
            Keranjang belanja Anda kosong. Silakan pilih perhiasan aksesoris terlebih dahulu.
          </p>
          <Link
            href="/products"
            className="px-6 py-3 bg-white text-black font-label text-xs uppercase font-bold"
          >
            ← BUKA KATALOG PRODUK
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="flex-1 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Breadcrumb / Top Title */}
          <div className="flex flex-col gap-1 border-b border-[#222222] pb-6">
            <div className="flex items-center gap-2 text-xs font-label text-[#888888] mb-1">
              <Link href="/cart" className="hover:text-white flex items-center gap-1">
                <ArrowLeft size={13} />
                <span>KERANJANG</span>
              </Link>
              <span>/</span>
              <span className="text-white">CHECKOUT PESANAN</span>
            </div>
            <h1 className="font-headline text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              Data Pengiriman &amp; Checkout
            </h1>
          </div>

          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 7 Columns: Form Data Penerima & Pilihan Kurir */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              {/* Box 1: Data Penerima */}
              <div className="p-6 bg-[#0e0e0e] border border-[#222222] flex flex-col gap-5">
                <span className="font-label text-xs uppercase font-bold tracking-widest text-white border-b border-[#222222] pb-3 flex items-center justify-between">
                  <span>[01 // DATA PENERIMA]</span>
                  <span className="text-[10px] text-[#888888] font-normal">KONFIRMASI VIA WHATSAPP</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="NAMA LENGKAP PENERIMA *"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Contoh: Bagas Pratama"
                    required
                  />
                  <Input
                    label="NOMOR WHATSAPP AKTIF *"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    required
                  />
                </div>

                <Input
                  label="ALAMAT LENGKAP (JALAN, NOMOR RUMAH, RT/RW, PATOKAN) *"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  placeholder="Jl. Nama Jalan No. XX..."
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="KOTA / KABUPATEN *"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Jakarta Selatan"
                    required
                  />
                  <Input
                    label="PROVINSI *"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    placeholder="DKI Jakarta"
                    required
                  />
                  <Input
                    label="KODE POS *"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="12190"
                    required
                  />
                </div>
              </div>

              {/* Box 2: Zona Wilayah & Pilihan Kurir */}
              <div className="p-6 bg-[#0e0e0e] border border-[#222222] flex flex-col gap-5">
                <span className="font-label text-xs uppercase font-bold tracking-widest text-white border-b border-[#222222] pb-3 flex items-center justify-between">
                  <span>[02 // ZONA TARIF &amp; KURIR PENGIRIMAN]</span>
                  <Truck size={16} className="text-[#888888]" />
                </span>

                {/* Zona Tarif Flat Selection */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-label uppercase text-[#AAAAAA] tracking-wider">
                    PILIH ZONA PENGIRIMAN TUJUAN:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {ZONES.map((zone) => (
                      <button
                        key={zone.id}
                        type="button"
                        onClick={() => setSelectedZone(zone)}
                        className={`p-3 text-left border transition-all flex flex-col justify-between min-h-[75px] ${
                          selectedZone.id === zone.id
                            ? "bg-white text-black border-white font-bold shadow-brutal-sm"
                            : "bg-[#141414] text-[#AAAAAA] border-[#2a2a2a] hover:border-white hover:text-white"
                        }`}
                      >
                        <span className="text-[11px] font-label uppercase tracking-wider">
                          {zone.label}
                        </span>
                        <span className="text-xs font-body font-bold">
                          {formatRupiah(zone.cost)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Courier Selection */}
                <div className="flex flex-col gap-2 pt-2 border-t border-[#1c1c1c]">
                  <label className="text-xs font-label uppercase text-[#AAAAAA] tracking-wider">
                    PILIH EKSPEDISI KURIR:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {COURIERS.map((courier) => (
                      <button
                        key={courier.id}
                        type="button"
                        onClick={() => setSelectedCourier(courier.name)}
                        className={`p-3 text-left border transition-all flex flex-col justify-between ${
                          selectedCourier === courier.name
                            ? "bg-[#1f1f1f] text-white border-white font-bold"
                            : "bg-[#141414] text-[#888888] border-[#2a2a2a] hover:border-white hover:text-white"
                        }`}
                      >
                        <span className="text-xs font-label uppercase font-bold text-white">
                          {courier.name}
                        </span>
                        <span className="text-[10px] font-label text-[#666666]">
                          Est: {courier.est}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-[#260505] border border-[#FFB4AB] text-[#FFB4AB] text-xs font-label uppercase tracking-wide">
                  {error}
                </div>
              )}
            </div>

            {/* Right 5 Columns: Ringkasan Pesanan & Tombol Buat Pesanan */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="p-6 bg-[#111111] border-2 border-white shadow-brutal flex flex-col gap-6">
                <span className="font-label text-xs uppercase font-bold tracking-widest text-white border-b border-[#222222] pb-3">
                  [RINGKASAN ITEM // {items.length} PRODUK]
                </span>

                {/* Items Mini List */}
                <div className="flex flex-col divide-y divide-[#1e1e1e] max-h-60 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.variantId} className="py-3 flex items-center gap-3">
                      <div className="relative w-12 h-12 bg-[#1a1a1a] border border-[#333333] shrink-0 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="50px"
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
                      </div>
                      <span className="text-xs font-body font-semibold text-white">
                        {formatRupiah(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Breakdown Costs */}
                <div className="pt-4 border-t border-[#222222] flex flex-col gap-2 text-xs font-body">
                  <div className="flex justify-between text-[#AAAAAA]">
                    <span>Subtotal Produk</span>
                    <span className="text-white">{formatRupiah(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#AAAAAA]">
                    <span>Ongkos Kirim ({selectedCourier})</span>
                    <span className="text-white">{formatRupiah(shippingCost)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-[#222222] flex justify-between items-baseline">
                  <div className="flex flex-col">
                    <span className="font-label text-xs uppercase font-bold text-white">
                      ESTIMASI TOTAL:
                    </span>
                    <span className="text-[10px] font-label text-[#888888]">
                      (+ Kode unik di halaman bayar)
                    </span>
                  </div>
                  <span className="font-headline text-2xl font-bold text-white">
                    {formatRupiah(estimatedTotal)}
                  </span>
                </div>

                {/* Submit CTA */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <span>{isSubmitting ? "MEMPROSES PESANAN..." : "BUAT PESANAN SEKARANG"}</span>
                  <ArrowRight size={16} />
                </Button>

                {/* Honest Payment Reminder */}
                <div className="p-3 bg-[#161616] border border-[#2a2a2a] text-[11px] font-label text-[#888888] leading-relaxed flex items-start gap-2">
                  <ShieldCheck size={16} className="text-white shrink-0 mt-0.5" />
                  <p>
                    Metode pembayaran (QRIS toko atau Transfer Bank BCA/Mandiri) dan batas transfer 24 jam dipilih langsung pada halaman berikutnya.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
