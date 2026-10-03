import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT"],
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Knweave — Wiki Tim Sederhana, Terbuka untuk Semua",
  description:
    "Knweave adalah wiki tim minimalis. Gratis, open source, dan bisa di-self-host. Cocok untuk tim kecil, proyek open source, dan organisasi nonprofit.",
  keywords: [
    "wiki",
    "open source",
    "self-hosted",
    "team wiki",
    "dokumentasi",
    "markdown",
  ],
  openGraph: {
    title: "Knweave — Wiki Tim Sederhana",
    description:
      "Wiki tim minimalis. Gratis, open source, bisa di-self-host.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${fraunces.variable} ${hanken.variable} ${jetbrains.variable}`}
    >
      <body className="relative">{children}</body>
    </html>
  );
}
