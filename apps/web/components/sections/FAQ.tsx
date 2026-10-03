"use client";

import { useState } from "react";
import { SectionShell, Eyebrow } from "../primitives";
import { ChevronDown } from "../primitives/Icons";

const FAQS = [
  {
    q: "Bagaimana Knweave dibandingkan dengan Notion atau Confluence?",
    a: "Knweave bukan pengganti 1-untuk-1. Notion dan Confluence dibuat untuk perusahaan besar dengan ratusan kasus penggunaan. Knweave hanya berfokus pada satu hal yang dilakukan dengan baik: wiki tim sederhana berbasis markdown. Jika kamu butuh database, kanban, otomatisasi, atau marketplace template — gunakan yang lain. Jika kamu butuh wiki yang cepat, milikmu, dan tidak berubah fitur tiap bulan — Knweave adalah pilihan tepat.",
  },
  {
    q: "Apakah Knweave gratis selamanya?",
    a: "Ya. Knweave berlisensi MIT — gratis untuk selamanya, untuk semua orang, tanpa batasan pengguna, halaman, atau ruang. Tidak ada paket &ldquo;free&rdquo; dengan fitur premium terkunci. Semua yang ada di sini adalah semua yang ada di produk.",
  },
  {
    q: "Apakah saya harus self-host, atau ada versi yang di-host?",
    a: "Knweave didesain untuk self-hosting dan ini adalah cara utama yang kami rekomendasikan — cukup satu container Docker. Namun, beberapa kontributor komunitas juga menyediakan layanan hosting terkelola jika kamu tidak ingin repot dengan infrastruktur. Pilihan ada di tanganmu, tanpa ketergantungan.",
  },
  {
    q: "Apakah data saya aman dan benar-benar milik saya?",
    a: "Sangat aman. Seluruh data disimpan sebagai berkas markdown biasa di volume yang kamu kendalikan. Tidak ada telemetri, tidak ada panggilan ke server kami, tidak ada akun wajib. Kamu bisa mem-backup dengan rsync, mengarsipkan ke git, atau memigrasi ke sistem lain kapan saja — datamu tidak terkunci format apa pun.",
  },
  {
    q: "Bagaimana cara berkontribusi atau melaporkan bug?",
    a: "Semua kontribusi disambut hangat. Fork repositori di GitHub, baca CONTRIBUTING.md, dan kirim pull request. Untuk bug, buka issue baru dengan langkah reproduksi. Komunitas kami aktif di Discord — bergabunglah dan sapa kami. Lisensi MIT memastikan kontribusimu juga bebas digunakan semua orang.",
  },
  {
    q: "Bisa untuk tim besar juga, atau hanya tim kecil?",
    a: "Knweave dioptimalkan untuk tim 3–30 orang dan ini sweet-spot-nya. Secara teknis ia bisa menangani lebih banyak pengguna, tetapi kami tidak menggarap fitur enterprise (SSO kompleks, permission granular bertingkat, audit log). Jika timmu sudah ratusan orang dengan kebutuhan governance berat, pertimbangkan Confluence. Untuk tim yang gesit, Knweave lebih cocok.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SectionShell id="faq">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* left intro */}
        <div className="reveal lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink text-balance sm:text-4xl">
            Pertanyaan yang sering muncul.
          </h2>
          <p className="mt-4 text-ink-soft">
            Jawaban jujur, tanpa bahasa pemasaran. Kalau ada yang belum
            terjawab, tanyakan langsung di{" "}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-weave-blue underline-offset-2 hover:underline"
            >
              GitHub Discussions
            </a>{" "}
            atau{" "}
            <a
              href="#"
              className="font-semibold text-weave-blue underline-offset-2 hover:underline"
            >
              Discord
            </a>
            .
          </p>

          {/* mini weave accent */}
          <svg viewBox="0 0 200 30" className="mt-8 h-5 w-40" fill="none" aria-hidden>
            <path d="M2 18C40 6 100 24 140 12s58-6 58 0" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M2 12C40 24 100 6 140 18s58 6 58 0" stroke="#6B7280" strokeWidth="2.2" strokeLinecap="round" opacity="0.5" />
          </svg>
        </div>

        {/* right accordion */}
        <div className="reveal space-y-2.5" style={{ ["--reveal-delay" as string]: "100ms" }}>
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={`card overflow-hidden transition-colors ${
                  isOpen ? "border-weave-blue/40" : ""
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-mono text-xs text-weave-blue">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-display text-base font-semibold text-ink">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 flex-none text-ink-muted transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-weave-blue" : ""
                    }`}
                  />
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <p
                      className="px-5 pb-5 pl-[3.25rem] text-[15px] leading-relaxed text-ink-soft"
                      dangerouslySetInnerHTML={{ __html: item.a }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
