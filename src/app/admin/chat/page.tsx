"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import {
  Send,
  MessageSquare,
  Clock,
  CheckCheck,
  User,
  ExternalLink,
  Sparkles,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "customer" | "admin";
  text: string;
  time: string;
}

interface ChatSession {
  id: string;
  customerName: string;
  phone: string;
  orderRef?: string;
  lastMessage: string;
  lastTime: string;
  unread: boolean;
  messages: ChatMessage[];
}

const INITIAL_SESSIONS: ChatSession[] = [
  {
    id: "sess-01",
    customerName: "Bagas Pratama",
    phone: "0812-8910-2931",
    orderRef: "NTR-20261005-4102",
    lastMessage: "Halo kak, apakah paket gelang Crucifix saya sudah dikirim oleh kurir JNE?",
    lastTime: "10:42 WIB",
    unread: true,
    messages: [
      {
        id: "m-1",
        sender: "customer",
        text: "Halo min, mau tanya mengenai pesanan #NTR-20261005-4102.",
        time: "10:40 WIB",
      },
      {
        id: "m-2",
        sender: "customer",
        text: "Halo kak, apakah paket gelang Crucifix saya sudah dikirim oleh kurir JNE?",
        time: "10:42 WIB",
      },
    ],
  },
  {
    id: "sess-02",
    customerName: "Dimas Arya",
    phone: "0857-1928-3810",
    lastMessage: "Cincin Obsidian size US 9 ada stok siap kirim hari ini?",
    lastTime: "Kemarin",
    unread: false,
    messages: [
      {
        id: "m-3",
        sender: "customer",
        text: "Malam min, mau tanya ukuran lingkar jari.",
        time: "19:15 WIB",
      },
      {
        id: "m-4",
        sender: "admin",
        text: "Malam kak Dimas! Bisa kami bantu, untuk lingkar jari berapa mm?",
        time: "19:18 WIB",
      },
      {
        id: "m-5",
        sender: "customer",
        text: "Cincin Obsidian size US 9 ada stok siap kirim hari ini?",
        time: "19:20 WIB",
      },
    ],
  },
  {
    id: "sess-03",
    customerName: "Tamara Putri",
    phone: "0878-2910-4491",
    orderRef: "NTR-20261001-1928",
    lastMessage: "Barang sudah sampai kak, kualitasnya gila bagus banget!",
    lastTime: "04 Okt",
    unread: false,
    messages: [
      {
        id: "m-6",
        sender: "customer",
        text: "Barang sudah sampai kak, kualitasnya gila bagus banget!",
        time: "14:10 WIB",
      },
      {
        id: "m-7",
        sender: "admin",
        text: "Terima kasih banyak apresiasinya kak Tamara! Stay dark and expressive.",
        time: "14:15 WIB",
      },
    ],
  },
];

export default function AdminChatPage() {
  const { showToast } = useToast();
  const [sessions, setSessions] = React.useState<ChatSession[]>(INITIAL_SESSIONS);
  const [activeSessionId, setActiveSessionId] = React.useState<string>("sess-01");
  const [replyInput, setReplyInput] = React.useState("");

  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];

  const handleSelectSession = (id: string) => {
    setActiveSessionId(id);
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, unread: false } : s))
    );
  };

  const handleSendReply = (textToSend?: string) => {
    const text = textToSend || replyInput;
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: "admin",
      text: text.trim(),
      time: "Baru saja",
    };

    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === activeSession.id) {
          return {
            ...s,
            lastMessage: `Admin: ${text.trim()}`,
            lastTime: "Baru saja",
            messages: [...s.messages, newMsg],
          };
        }
        return s;
      })
    );

    setReplyInput("");
    showToast("Balasan terkirim ke pelanggan.", "success");
  };

  const cannedReplies = [
    {
      label: "KONFIRMASI BAYAR",
      text: "Halo kak, pembayaran Anda telah kami verifikasi. Pesanan saat ini sedang disiapkan tim logistik.",
    },
    {
      label: "JADWAL PICKUP",
      text: "Paket akan di-pickup kurir hari ini pukul 17.00 WIB. Nomor resi otomatis diupdate di link pelacakan pesanan.",
    },
    {
      label: "TUKAR UKURAN",
      text: "Tukar ukuran dapat diproses maksimal 7 hari kerja setelah barang diterima dengan tag barcode utuh dan belum dipakai.",
    },
    {
      label: "READY STOCK",
      text: "Item tersebut ready stock di gudang Jakarta dan siap dikirim pada jadwal pengiriman terdekat hari ini.",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Top Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222222] pb-6">
        <div>
          <span className="text-xs font-mono text-[#888888] tracking-widest uppercase">
            [LAYANAN PELANGGAN]
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-1">
            INBOX CONCIERGE & LIVE CHAT
          </h1>
          <p className="text-xs font-body text-[#888888] mt-1">
            Respon cepat pertanyaan pelanggan mengenai ketersediaan stok, konfirmasi transfer, dan resi kurir.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#888888] bg-[#111111] border border-[#222222] px-3 py-2">
          <span>JAM OPERASIONAL:</span>
          <span className="text-white font-bold">09.00 - 21.00 WIB</span>
        </div>
      </div>

      {/* Chat Workspace (Split View) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#222222] bg-[#0c0c0c] min-h-[600px]">
        {/* Left: Sessions List (4 Cols) */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#222222] flex flex-col">
          <div className="p-4 border-b border-[#1c1c1c] bg-[#111111]">
            <span className="text-xs font-mono font-bold uppercase text-white tracking-wider">
              [INBOX PERCAKAPAN ({sessions.length})]
            </span>
          </div>

          <div className="divide-y divide-[#181818] overflow-y-auto max-h-[550px]">
            {sessions.map((sess) => {
              const isSelected = sess.id === activeSession.id;

              return (
                <button
                  key={sess.id}
                  onClick={() => handleSelectSession(sess.id)}
                  className={`w-full text-left p-4 transition-colors flex flex-col gap-1.5 ${
                    isSelected
                      ? "bg-[#181818] border-l-2 border-white"
                      : "hover:bg-[#121212]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-heading font-bold text-white">
                      {sess.customerName}
                    </span>
                    <span className="text-[10px] font-mono text-[#666666]">
                      {sess.lastTime}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#888888]">
                      {sess.phone}
                    </span>
                    {sess.orderRef && (
                      <span className="text-[9px] font-mono px-1 py-0.2 bg-[#222222] text-[#cccccc] border border-[#333333]">
                        #{sess.orderRef}
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-body text-[#aaaaaa] line-clamp-1 mt-0.5">
                    {sess.lastMessage}
                  </p>

                  {sess.unread && (
                    <div className="mt-1 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      <span>BELUM DIBALAS</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat Window (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          {/* Chat Window Header */}
          <div className="p-4 border-b border-[#1c1c1c] bg-[#111111] flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-heading font-bold text-white">
                  {activeSession.customerName}
                </h3>
                <span className="text-xs font-mono text-[#888888]">
                  ({activeSession.phone})
                </span>
              </div>
              {activeSession.orderRef && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-mono text-[#666666]">
                    TERKAIT PESANAN:
                  </span>
                  <Link
                    href={`/admin/orders/${activeSession.orderRef}`}
                    className="text-[10px] font-mono text-white underline underline-offset-2 hover:text-[#cccccc] flex items-center gap-1"
                  >
                    <span>#{activeSession.orderRef}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/${activeSession.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono px-2.5 py-1 bg-[#1a1a1a] hover:bg-emerald-950/40 text-emerald-400 border border-emerald-900 transition-colors"
              >
                BUKA WHATSAPP
              </a>
            </div>
          </div>

          {/* Messages Thread */}
          <div className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[400px] flex-1">
            {activeSession.messages.map((msg) => {
              const isAdmin = msg.sender === "admin";

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[80%] ${
                    isAdmin ? "ml-auto items-end" : "mr-auto items-start"
                  }`}
                >
                  <div
                    className={`p-3 text-xs font-body leading-relaxed border ${
                      isAdmin
                        ? "bg-white text-black border-white"
                        : "bg-[#141414] text-white border-[#262626]"
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                  <span className="text-[10px] font-mono text-[#666666] mt-1">
                    {isAdmin ? "Admin Neturism" : activeSession.customerName} • {msg.time}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Canned Responses (Quick Replies) */}
          <div className="p-3 border-t border-[#1c1c1c] bg-[#0f0f0f]">
            <span className="text-[10px] font-mono text-[#666666] uppercase block mb-2">
              TEMPLATE BALASAN CEPAT (CANNED REPLIES):
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {cannedReplies.map((canned, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendReply(canned.text)}
                  className="text-[11px] font-mono px-2.5 py-1 bg-[#161616] hover:bg-[#252525] border border-[#2b2b2b] text-[#cccccc] hover:text-white transition-colors"
                >
                  + {canned.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reply Form */}
          <div className="p-4 border-t border-[#222222] bg-[#111111]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendReply();
              }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                placeholder="Tulis pesan balasan untuk pelanggan..."
                value={replyInput}
                onChange={(e) => setReplyInput(e.target.value)}
                className="flex-1 bg-[#090909] border border-[#262626] px-4 py-2.5 text-xs font-mono text-white placeholder-[#555555] focus:outline-none focus:border-white"
              />
              <Button type="submit" variant="primary" size="sm" className="text-xs">
                <Send className="w-3.5 h-3.5 mr-1.5" />
                KIRIM
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
