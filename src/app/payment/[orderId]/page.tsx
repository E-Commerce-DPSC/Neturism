"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/context/orders-context";
import { formatRupiah } from "@/lib/utils";
import {
  Copy,
  Check,
  UploadCloud,
  Clock,
  QrCode,
  CreditCard,
  FileText,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

function PaymentView() {
  const params = useParams();
  const router = useRouter();
  const orderId = (params?.orderId as string) || "NTR-20261008-0192";

  const { getOrderById, updateOrderStatus } = useOrders();
  const order = getOrderById(orderId);

  // Fallback defaults if opened directly
  const totalAmount = order ? order.total : 702312;
  const uniqueCode = order ? order.uniqueCode : 312;
  const currentStatus = order ? order.status : "MENUNGGU_PEMBAYARAN";

  // Tab State
  const [activeMethod, setActiveMethod] = React.useState<"qris" | "transfer">("qris");

  // Copy Feedback states
  const [copiedAmount, setCopiedAmount] = React.useState(false);
  const [copiedBca, setCopiedBca] = React.useState(false);
  const [copiedMandiri, setCopiedMandiri] = React.useState(false);

  // Upload states
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string>("");
  const [isSubmittingProof, setIsSubmittingProof] = React.useState(false);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);

  // 24 Hour Countdown Timer State (Simulated)
  const [timeLeft, setTimeLeft] = React.useState({
    hours: 23,
    minutes: 58,
    seconds: 45,
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = (text: string, type: "amount" | "bca" | "mandiri") => {
    navigator.clipboard.writeText(text);
    if (type === "amount") {
      setCopiedAmount(true);
      setTimeout(() => setCopiedAmount(false), 2000);
    } else if (type === "bca") {
      setCopiedBca(true);
      setTimeout(() => setCopiedBca(false), 2000);
    } else if (type === "mandiri") {
      setCopiedMandiri(true);
      setTimeout(() => setCopiedMandiri(false), 2000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFile) return;

    setIsSubmittingProof(true);

    setTimeout(() => {
      updateOrderStatus(orderId, "MENUNGGU_VERIFIKASI", previewUrl);
      setIsSubmittingProof(false);
      setUploadSuccess(true);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="flex-1 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {/* Top Title & Countdown Timer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-[#111111] border-2 border-white shadow-brutal">
            <div className="flex flex-col gap-1">
              <span className="font-label text-xs uppercase tracking-widest text-[#AAAAAA]">
                PESANAN: {orderId}
              </span>
              <h1 className="font-headline text-xl sm:text-3xl font-bold uppercase text-white">
                Instruksi Pembayaran
              </h1>
            </div>

            {/* Countdown Badge */}
            <div className="flex items-center gap-2.5 px-4 py-2.5 bg-black border border-[#333333] self-start sm:self-auto">
              <Clock size={16} className="text-white shrink-0 animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[10px] font-label uppercase text-[#888888]">
                  SISA WAKTU BAYAR:
                </span>
                <span className="font-label text-sm sm:text-base font-bold text-white tracking-wider">
                  {String(timeLeft.hours).padStart(2, "0")}:
                  {String(timeLeft.minutes).padStart(2, "0")}:
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* Amount Card with 3-Digit Unique Code */}
          <div className="p-6 bg-[#0d0d0d] border border-[#222222] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-label text-xs uppercase text-[#888888]">
                TOTAL YANG HARUS DITRANSFER (TERMASUK KODE UNIK):
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-2xl sm:text-4xl font-bold text-white">
                  {formatRupiah(totalAmount)}
                </span>
                <span className="text-xs font-label text-[#AAAAAA]">
                  (Kode Unik: <strong className="text-white">{uniqueCode}</strong>)
                </span>
              </div>
              <p className="text-[11px] font-body text-[#888888] pt-1">
                * Pastikan mentransfer tepat hingga 3 digit terakhir untuk verifikasi manual instan oleh admin.
              </p>
            </div>

            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => handleCopy(totalAmount.toString(), "amount")}
              className="shrink-0 flex items-center gap-2"
            >
              {copiedAmount ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiedAmount ? "TERSERAP DI CLIPBOARD" : "SALIN NOMINAL"}</span>
            </Button>
          </div>

          {/* Payment Methods Selection Tabs */}
          <div className="flex flex-col border border-[#222222] bg-[#0c0c0c]">
            {/* Tab Headers */}
            <div className="grid grid-cols-2 border-b border-[#222222]">
              <button
                type="button"
                onClick={() => setActiveMethod("qris")}
                className={`py-4 text-xs font-label uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-2 ${
                  activeMethod === "qris"
                    ? "bg-white text-black border-b-2 border-white"
                    : "text-[#888888] hover:text-white bg-[#141414]"
                }`}
              >
                <QrCode size={16} />
                <span>METODE 1: QRIS</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMethod("transfer")}
                className={`py-4 text-xs font-label uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-2 ${
                  activeMethod === "transfer"
                    ? "bg-white text-black border-b-2 border-white"
                    : "text-[#888888] hover:text-white bg-[#141414]"
                }`}
              >
                <CreditCard size={16} />
                <span>METODE 2: TRANSFER BANK</span>
              </button>
            </div>

            {/* Tab 1 Content: QRIS */}
            {activeMethod === "qris" && (
              <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center">
                <div className="w-56 h-56 sm:w-64 sm:h-64 relative bg-white p-2 border-2 border-white shadow-brutal-sm shrink-0">
                  <Image
                    src="/images/qris-neturism.svg"
                    alt="QRIS Neturism Store"
                    fill
                    className="object-contain p-2"
                  />
                </div>

                <div className="flex flex-col gap-4 text-xs font-body text-[#AAAAAA] leading-relaxed">
                  <span className="font-label text-xs uppercase font-bold text-white tracking-wider">
                    [CARA BAYAR VIA QRIS]:
                  </span>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Buka aplikasi m-Banking (BCA, Mandiri, BRI, BNI) atau e-Wallet (GoPay, OVO, Dana).</li>
                    <li>Pilih menu <strong>Scan QR / Bayar</strong>.</li>
                    <li>Scan gambar QRIS Neturism di samping.</li>
                    <li>Masukkan nominal persis: <strong className="text-white">{formatRupiah(totalAmount)}</strong>.</li>
                    <li>Simpan bukti tangkapan layar (screenshot) transfer untuk diunggah di bawah.</li>
                  </ol>
                  <a
                    href="/images/qris-neturism.svg"
                    download="QRIS-Neturism.svg"
                    className="inline-flex text-xs font-label uppercase text-white hover:underline underline-offset-4 pt-1"
                  >
                    UNDUH GAMBAR QRIS →
                  </a>
                </div>
              </div>
            )}

            {/* Tab 2 Content: Transfer Bank */}
            {activeMethod === "transfer" && (
              <div className="p-6 sm:p-8 flex flex-col gap-6">
                <span className="font-label text-xs uppercase font-bold text-white tracking-wider">
                  [REKENING RESMI NETURISM STORE]:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Rekening BCA */}
                  <div className="p-4 bg-[#141414] border border-[#2a2a2a] flex flex-col justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="font-headline text-base font-bold text-white uppercase">
                        BANK CENTRAL ASIA (BCA)
                      </span>
                      <span className="text-[11px] font-label text-[#888888]">
                        A.N NETURISM STORE
                      </span>
                      <span className="font-label text-base font-bold text-white tracking-widest pt-2">
                        873-091-2810
                      </span>
                    </div>

                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => handleCopy("8730912810", "bca")}
                      className="w-full flex items-center justify-center gap-1.5"
                    >
                      {copiedBca ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copiedBca ? "TERSERAP" : "SALIN NO. REKENING"}</span>
                    </Button>
                  </div>

                  {/* Rekening Mandiri */}
                  <div className="p-4 bg-[#141414] border border-[#2a2a2a] flex flex-col justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="font-headline text-base font-bold text-white uppercase">
                        BANK MANDIRI
                      </span>
                      <span className="text-[11px] font-label text-[#888888]">
                        A.N NETURISM STORE
                      </span>
                      <span className="font-label text-base font-bold text-white tracking-widest pt-2">
                        137-00-1928301-2
                      </span>
                    </div>

                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => handleCopy("1370019283012", "mandiri")}
                      className="w-full flex items-center justify-center gap-1.5"
                    >
                      {copiedMandiri ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copiedMandiri ? "TERSERAP" : "SALIN NO. REKENING"}</span>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Upload Proof of Payment Section */}
          <div className="p-6 sm:p-8 bg-[#111111] border-2 border-white shadow-brutal flex flex-col gap-6">
            <div className="flex flex-col gap-1 border-b border-[#222222] pb-4">
              <span className="font-label text-xs uppercase font-bold tracking-widest text-white">
                [LANGKAH TERAKHIR: UNGGAH BUKTI PEMBAYARAN]
              </span>
              <p className="text-xs font-body text-[#888888]">
                Unggah bukti transfer (struk ATM, screenshot m-Banking, atau mutasi e-wallet). Format: JPG, PNG, atau PDF (maks. 2 MB).
              </p>
            </div>

            {uploadSuccess || currentStatus === "MENUNGGU_VERIFIKASI" ? (
              /* Success State */
              <div className="p-6 bg-[#081808] border border-white flex flex-col items-center justify-center text-center gap-3">
                <span className="p-2 bg-white text-black font-bold">
                  <Check size={20} strokeWidth={3} />
                </span>
                <h3 className="font-headline text-lg font-bold uppercase text-white">
                  Bukti Pembayaran Berhasil Dikirim
                </h3>
                <p className="font-body text-xs text-[#AAAAAA] max-w-md">
                  Status pesanan Anda kini <strong>MENUNGGU_VERIFIKASI</strong>. Admin kami akan memeriksa mutasi dalam waktu &lt; 1 jam kerja (09.00 - 21.00 WIB).
                </p>
                <div className="pt-3">
                  <Link
                    href={`/orders/${orderId}`}
                    className="px-6 py-3 bg-white text-black font-label text-xs uppercase font-bold tracking-wider hover:bg-black hover:text-white border border-white transition-colors inline-flex items-center gap-2"
                  >
                    <span>LACAK STATUS PESANAN</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ) : (
              /* Upload Form */
              <form onSubmit={handleSubmitProof} className="flex flex-col gap-4">
                <label className="border-2 border-dashed border-[#444444] hover:border-white p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors bg-[#0a0a0a]">
                  <UploadCloud size={32} className="text-[#888888]" />
                  <span className="font-label text-xs uppercase font-bold text-white text-center">
                    {uploadedFile ? uploadedFile.name : "KLIK UNTUK MEMILIH FILE BUKTI PEMBAYARAN"}
                  </span>
                  <span className="text-[11px] font-label text-[#666666]">
                    PNG, JPG, ATAU PDF HINGGA 2MB
                  </span>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                </label>

                {previewUrl && (
                  <div className="flex items-center gap-3 p-3 bg-[#181818] border border-[#333333]">
                    <FileText size={18} className="text-white" />
                    <span className="text-xs font-label text-white truncate flex-1">
                      {uploadedFile?.name} (Siap diunggah)
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setUploadedFile(null);
                        setPreviewUrl("");
                      }}
                      className="text-xs font-label uppercase text-[#FFB4AB] hover:underline"
                    >
                      BATAL
                    </button>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={!uploadedFile || isSubmittingProof}
                  className="w-full flex items-center justify-center gap-2 mt-2"
                >
                  <span>{isSubmittingProof ? "MENGIRIM BUKTI..." : "KIRIM BUKTI PEMBAYARAN SEKARANG"}</span>
                  <ArrowRight size={16} />
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function PaymentPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center font-label text-xs uppercase tracking-widest">
          MEMUAT INSTRUKSI PEMBAYARAN...
        </div>
      }
    >
      <PaymentView />
    </React.Suspense>
  );
}
