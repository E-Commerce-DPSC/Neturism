"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Send, Clock, MessageSquare, ShieldCheck, Tag } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "admin";
  senderName: string;
  content: string;
  timestamp: string;
  orderId?: string;
}

function ChatContent() {
  const searchParams = useSearchParams();
  const linkedOrderId = searchParams.get("orderId");

  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "msg-1",
      sender: "admin",
      senderName: "NETURISM CONCIERGE",
      content:
        "Selamat datang di kanal konsultasi resmi Neturism. Kami siap membantu Anda terkait pemilihan ukuran, ketersediaan stok arsip, atau pelacakan pesanan Anda.",
      timestamp: "09:00",
    },
  ]);

  const [inputText, setInputText] = React.useState("");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const currentTime = new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: "user",
      senderName: "ANDA",
      content: inputText.trim(),
      timestamp: currentTime,
      orderId: linkedOrderId || undefined,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Simulate Admin Response after 1.5s
    setTimeout(() => {
      const adminReply: Message = {
        id: `adm-${Date.now()}`,
        sender: "admin",
        senderName: "NETURISM CONCIERGE",
        content: linkedOrderId
          ? `Terima kasih atas pesan Anda mengenai pesanan #${linkedOrderId}. Pesan Anda telah masuk ke antrean admin kami dan akan dibalas secepatnya pada jam kerja.`
          : "Pesan Anda telah kami terima. Admin kami akan segera membalas konsultasi Anda dalam waktu operasional 09.00 - 21.00 WIB.",
        timestamp: new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, adminReply]);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="flex-1 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-6 h-[750px]">
          {/* Chat Header Card */}
          <div className="p-4 sm:p-6 bg-[#111111] border-2 border-white shadow-brutal flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-white block animate-pulse" />
              <div className="flex flex-col">
                <span className="font-headline text-base sm:text-lg font-bold uppercase text-white tracking-wider">
                  NETURISM CONCIERGE // LIVE CHAT
                </span>
                <span className="text-[11px] font-label text-[#888888]">
                  OPERASIONAL: SENIN - MINGGU (09.00 - 21.00 WIB)
                </span>
              </div>
            </div>

            {linkedOrderId && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#181818] border border-[#333333] text-xs font-label text-white">
                <Tag size={13} className="text-[#888888]" />
                <span>TERKAIT PESANAN: #{linkedOrderId}</span>
              </div>
            )}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0a0a0a] border border-[#222222] flex flex-col gap-4">
            {messages.map((msg) => {
              const isAdmin = msg.sender === "admin";

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[85%] sm:max-w-[70%] ${
                    isAdmin ? "self-start items-start" : "self-end items-end"
                  }`}
                >
                  <span className="text-[10px] font-label uppercase text-[#666666] mb-1">
                    {msg.senderName} • {msg.timestamp}
                  </span>

                  <div
                    className={`p-4 text-xs sm:text-sm font-body leading-relaxed border ${
                      isAdmin
                        ? "bg-[#141414] text-white border-[#333333]"
                        : "bg-white text-black border-white font-medium"
                    }`}
                  >
                    {msg.orderId && (
                      <span className="block text-[10px] font-label uppercase text-[#888888] pb-1 border-b border-[#333333] mb-2">
                        [REF: PESANAN #{msg.orderId}]
                      </span>
                    )}
                    {msg.content}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-[#111111] border border-[#333333] flex items-center gap-3"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              maxLength={1000}
              placeholder="Tuliskan pertanyaan ukuran, stok, atau kendala pesanan Anda..."
              className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm font-body text-white placeholder-[#666666] focus:outline-none"
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!inputText.trim()}
              className="flex items-center gap-1.5 px-4"
            >
              <span>KIRIM</span>
              <Send size={13} />
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ChatPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center font-label text-xs uppercase tracking-widest">
          MEMUAT CHAT NETURISM...
        </div>
      }
    >
      <ChatContent />
    </React.Suspense>
  );
}
