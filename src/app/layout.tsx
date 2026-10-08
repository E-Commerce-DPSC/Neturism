import type { Metadata } from "next";
import { Geist, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Neturism | Aksesoris Streetwear Kurasi",
  description: "Toko online resmi Neturism. Brand aksesoris streetwear kurasi dengan karakter gelap, gothic-industrial, dan ekspresif.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${spaceGrotesk.variable} ${spaceMono.variable} h-full bg-black text-white antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-white selection:text-black">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
