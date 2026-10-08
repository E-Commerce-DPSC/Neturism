"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useOrders } from "@/context/orders-context";
import { formatRupiah } from "@/lib/utils";
import { Package, User, MapPin, ArrowRight, Plus, Check } from "lucide-react";

type AccountTab = "orders" | "profile" | "addresses";

export default function AccountPage() {
  const { orders } = useOrders();
  const [activeTab, setActiveTab] = React.useState<AccountTab>("orders");

  // Profile Form state
  const [name, setName] = React.useState("Bagas Pratama");
  const [email, setEmail] = React.useState("bagas.pratama@example.com");
  const [phone, setPhone] = React.useState("081289102931");
  const [profileSaved, setProfileSaved] = React.useState(false);

  // Address list state
  const [addresses, setAddresses] = React.useState([
    {
      id: "addr-1",
      label: "Rumah Utama",
      recipient: "Bagas Pratama",
      phone: "081289102931",
      address: "Jl. Senopati No. 42, RT 02 / RW 03, Kebayoran Baru",
      city: "Jakarta Selatan, DKI Jakarta 12190",
      isDefault: true,
    },
    {
      id: "addr-2",
      label: "Kantor / Studio",
      recipient: "Bagas Pratama",
      phone: "081289102931",
      address: "Gedung Kreatif Lt. 4, Jl. Kemang Raya No. 10",
      city: "Jakarta Selatan, DKI Jakarta 12730",
      isDefault: false,
    },
  ]);

  const [showAddAddress, setShowAddAddress] = React.useState(false);
  const [newLabel, setNewLabel] = React.useState("");
  const [newAddress, setNewAddress] = React.useState("");
  const [newCity, setNewCity] = React.useState("");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel || !newAddress || !newCity) return;

    setAddresses((prev) => [
      ...prev,
      {
        id: `addr-${Date.now()}`,
        label: newLabel,
        recipient: name,
        phone,
        address: newAddress,
        city: newCity,
        isDefault: false,
      },
    ]);

    setNewLabel("");
    setNewAddress("");
    setNewCity("");
    setShowAddAddress(false);
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="flex-1 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          {/* Top Title */}
          <div className="flex flex-col gap-1 border-b border-[#222222] pb-6">
            <span className="font-label text-xs uppercase tracking-widest text-[#888888]">
              [CLIENT PORTAL // ARCHIVAL ACCOUNT]
            </span>
            <h1 className="font-headline text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              Akun &amp; Riwayat Pesanan
            </h1>
          </div>

          {/* Navigation Tabs */}
          <div className="grid grid-cols-3 border border-[#222222] bg-[#0c0c0c]">
            <button
              type="button"
              onClick={() => setActiveTab("orders")}
              className={`py-4 text-xs font-label uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-2 ${
                activeTab === "orders"
                  ? "bg-white text-black border-b-2 border-white"
                  : "text-[#888888] hover:text-white bg-[#141414]"
              }`}
            >
              <Package size={15} />
              <span className="hidden sm:inline">RIWAYAT</span> PESANAN ({orders.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`py-4 text-xs font-label uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-2 ${
                activeTab === "profile"
                  ? "bg-white text-black border-b-2 border-white"
                  : "text-[#888888] hover:text-white bg-[#141414]"
              }`}
            >
              <User size={15} />
              <span>DATA DIRI</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("addresses")}
              className={`py-4 text-xs font-label uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-2 ${
                activeTab === "addresses"
                  ? "bg-white text-black border-b-2 border-white"
                  : "text-[#888888] hover:text-white bg-[#141414]"
              }`}
            >
              <MapPin size={15} />
              <span>BUKU ALAMAT</span>
            </button>
          </div>

          {/* Tab 1: Orders History */}
          {activeTab === "orders" && (
            <div className="flex flex-col gap-6">
              {orders.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-6 bg-[#111111] border border-[#222222] hover:border-[#444] transition-colors flex flex-col gap-5"
                    >
                      {/* Top Order Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1e1e1e] pb-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-headline text-base font-bold text-white uppercase">
                            #{ord.id}
                          </span>
                          <span className="font-label text-xs text-[#888888]">
                            Dibuat: {new Date(ord.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                          </span>
                        </div>

                        <Badge
                          variant={ord.status === "SELESAI" ? "solid" : "default"}
                          className="self-start sm:self-auto"
                        >
                          STATUS: {ord.status}
                        </Badge>
                      </div>

                      {/* Items Row */}
                      <div className="flex flex-col gap-3">
                        {ord.items.map((item) => (
                          <div key={item.variantId} className="flex items-center gap-4">
                            <div className="relative w-14 h-14 bg-[#181818] border border-[#333333] shrink-0 overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="60px"
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col">
                              <span className="text-xs sm:text-sm font-headline font-semibold text-white uppercase truncate">
                                {item.name}
                              </span>
                              <span className="text-[11px] font-label text-[#888888]">
                                Ukuran: {item.size} • Qty: {item.quantity}
                              </span>
                            </div>
                            <span className="text-xs font-body font-semibold text-white">
                              {formatRupiah(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Row: Total & Actions */}
                      <div className="pt-4 border-t border-[#1e1e1e] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs font-label text-[#888888] uppercase">
                            TOTAL TRANSAKSI:
                          </span>
                          <span className="font-headline text-base sm:text-lg font-bold text-white">
                            {formatRupiah(ord.total)}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          {ord.status === "MENUNGGU_PEMBAYARAN" && (
                            <Link
                              href={`/payment/${ord.id}`}
                              className="px-4 py-2 bg-white text-black font-label text-xs uppercase font-bold tracking-wider hover:bg-black hover:text-white border border-white transition-colors"
                            >
                              BAYAR SEKARANG →
                            </Link>
                          )}

                          <Link
                            href={`/orders/${ord.id}`}
                            className="px-4 py-2 bg-[#181818] text-white font-label text-xs uppercase border border-[#888888] hover:border-white hover:bg-black transition-colors"
                          >
                            DETAIL &amp; LACAK RESI
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center border border-[#222222] bg-[#111111] p-6 flex flex-col items-center gap-3">
                  <span className="font-label text-xs uppercase text-[#888888]">
                    [BELUM ADA RIWAYAT]
                  </span>
                  <p className="text-xs font-body text-[#AAAAAA]">
                    Anda belum memiliki pesanan aktif di Neturism Store.
                  </p>
                  <Link
                    href="/products"
                    className="mt-2 px-6 py-2.5 bg-white text-black font-label text-xs uppercase font-bold"
                  >
                    JELAJAHI KATALOG →
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Profile Settings */}
          {activeTab === "profile" && (
            <div className="max-w-2xl bg-[#111111] border border-[#222222] p-6 sm:p-8 flex flex-col gap-6">
              <span className="font-label text-xs uppercase font-bold tracking-widest text-white border-b border-[#222222] pb-3">
                [INFORMASI PROFIL PENGGUNA]
              </span>

              <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
                <Input
                  label="NAMA LENGKAP"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  label="EMAIL (TIDAK DAPAT DIUBAH)"
                  type="email"
                  value={email}
                  disabled
                />
                <Input
                  label="NOMOR WHATSAPP (AKTIF)"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />

                <div className="pt-4 border-t border-[#222222] flex flex-col gap-3">
                  <span className="text-xs font-label uppercase text-[#888888]">
                    UBAH KATA SANDI (OPSIONAL):
                  </span>
                  <Input
                    label="KATA SANDI BARU"
                    type="password"
                    placeholder="Minimal 8 karakter..."
                  />
                </div>

                <div className="pt-4">
                  <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto">
                    {profileSaved ? "✓ PERUBAHAN TERSIMPAN" : "SIMPAN PERUBAHAN PROFIL"}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Tab 3: Address Book */}
          {activeTab === "addresses" && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="font-label text-xs uppercase tracking-widest text-[#AAAAAA]">
                  [DAFTAR BUKU ALAMAT PENGIRIMAN]
                </span>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  <span>TAMBAH ALAMAT BARU</span>
                </Button>
              </div>

              {/* Add Address Form Box */}
              {showAddAddress && (
                <form
                  onSubmit={handleAddAddress}
                  className="p-6 bg-[#141414] border-2 border-white shadow-brutal flex flex-col gap-4 max-w-2xl"
                >
                  <span className="font-label text-xs uppercase font-bold text-white">
                    FORM TAMBAH ALAMAT BARU:
                  </span>
                  <Input
                    label="LABEL ALAMAT (CONTOH: APARTEMEN, RUMAH, STUDIO)"
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    required
                  />
                  <Input
                    label="ALAMAT LENGKAP (JALAN, NO, RT/RW)"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    required
                  />
                  <Input
                    label="KOTA & KODE POS"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    required
                  />
                  <div className="flex gap-2 pt-2">
                    <Button type="submit" variant="primary" size="sm">
                      SIMPAN ALAMAT
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAddAddress(false)}
                    >
                      BATAL
                    </Button>
                  </div>
                </form>
              )}

              {/* Saved Addresses List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`p-5 border transition-colors flex flex-col justify-between gap-4 ${
                      addr.isDefault
                        ? "bg-[#141414] border-white shadow-brutal-sm"
                        : "bg-[#0e0e0e] border-[#222222]"
                    }`}
                  >
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-headline text-sm font-bold uppercase text-white">
                          {addr.label}
                        </span>
                        {addr.isDefault && (
                          <Badge variant="solid" className="text-[10px]">
                            UTAMA
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs font-body font-bold text-[#CCCCCC]">
                        {addr.recipient} ({addr.phone})
                      </span>
                      <p className="text-xs font-body text-[#AAAAAA] leading-relaxed pt-1">
                        {addr.address}
                      </p>
                      <span className="text-xs font-body text-[#888888]">
                        {addr.city}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-[#1e1e1e] flex justify-between items-center text-xs font-label">
                      {!addr.isDefault && (
                        <button
                          type="button"
                          onClick={() => setDefaultAddress(addr.id)}
                          className="text-[#AAAAAA] hover:text-white underline underline-offset-4"
                        >
                          [JADIKAN UTAMA]
                        </button>
                      )}
                      <span className="text-[#555555] ml-auto">TERSIMPAN</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
