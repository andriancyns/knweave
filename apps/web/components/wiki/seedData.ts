import type { WikiState } from "./types";

/**
 * Initial wiki tree, shown on first visit. Three sections matching the
 * design spec: Onboarding, Proyek A, Standar Tim — each with nested pages
 * containing realistic markdown so view mode looks alive out of the box.
 */

const NOW = "2026-06-20T09:14:00.000Z";

export const SEED: WikiState = {
  sections: [
    { id: "sec-onboard", title: "Onboarding", expanded: true },
    { id: "sec-proyek", title: "Proyek A", expanded: true },
    { id: "sec-standar", title: "Standar Tim", expanded: false },
  ],
  pages: {
    "page-welcome": {
      id: "page-welcome",
      title: "Selamat Datang di Knweave",
      parentId: null,
      sectionId: "sec-onboard",
      icon: "👋",
      visibility: "tim",
      starred: true,
      tags: ["penting", "panduan"],
      updatedAt: NOW,
      updatedBy: "Rani",
      content: `# Selamat Datang di Knweave

Selamat datang di **wiki tim Knweave** — pusat pengetahuan bersama yang sederhana, cepat, dan sepenuhnya milikmu.

## Mulai dari mana?

- Tekan \`⌘K\` (atau \`Ctrl K\`) untuk mencari halaman apa pun
- Tekan \`⌘E\` untuk beralih antara mode **Lihat** dan **Sunting**
- Klik **+ Halaman Baru** di sidebar untuk menambah halaman

> Tips: semua perubahan tersimpan otomatis ke peramban. Tutup tab, datang lagi, tulisanmu masih ada.

## Konsep dasar

Setiap halaman terdiri dari:

1. **Judul** dan emoji ikon
2. **Isi** dalam format markdown
3. **Visibilitas** — Tautan Publik, Tim, atau Privat

\`\`\`markdown
## Contoh heading

Tulis **tebal**, *miring*, dan \`kode\` dengan bebas.
\`\`\`

Selamat berkolaborasi! 🧵`,
    },
    "page-setup": {
      id: "page-setup",
      title: "Setup Lingkungan",
      parentId: null,
      sectionId: "sec-onboard",
      icon: "🛠️",
      visibility: "tim",
      starred: false,
      tags: ["dev", "setup"],
      updatedAt: "2026-06-18T11:02:00.000Z",
      updatedBy: "Bagas",
      content: `# Setup Lingkungan

Persiapan singkat agar siap berkontribusi.

## Prasyarat

- Node.js \`>= 20.9.0\`
- pnpm \`9.x\`
- Editor dengan formatir prettier

## Langkah

\`\`\`bash
git clone https://github.com/tim/knweave.git
cd knweave
pnpm install
pnpm dev
\`\`\`

Buka \`http://localhost:3000\`. Selesai.

## Catatan

- Gunakan branch \`main\` untuk rilis, \`develop\` untuk pekerjaan harian
- Jalankan \`pnpm lint\` sebelum push`,
    },
    "page-glosarium": {
      id: "page-glosarium",
      title: "Glosarium Istilah",
      parentId: "page-welcome",
      sectionId: "sec-onboard",
      icon: "📖",
      visibility: "tim",
      starred: false,
      tags: ["rujukan"],
      updatedAt: "2026-06-15T08:40:00.000Z",
      updatedBy: "Rani",
      content: `# Glosarium Istilah

Daftar istilah yang sering dipakai tim.

- **Benang (thread)** — satuan konten dalam pohon halaman
- **Tenun (weave)** — struktur tautan antar halaman
- **Simpul (knot)** — titik temu beberapa halaman terkait

> Halaman ini diperbarui seiring tim menambah kosakata baru.`,
    },
    "page-proyek-overview": {
      id: "page-proyek-overview",
      title: "Ringkasan Proyek A",
      parentId: null,
      sectionId: "sec-proyek",
      icon: "🚀",
      visibility: "tim",
      starred: true,
      tags: ["proyek-a", "perencanaan"],
      updatedAt: "2026-06-19T16:20:00.000Z",
      updatedBy: "Sinta",
      content: `# Ringkasan Proyek A

Proyek A adalah upaya merombak dasbor wiki agar lebih cepat dan ramah pengguna baru.

## Tujuan kuartal ini

- Mempercepat pencarian hingga **< 50ms**
- Menyederhanakan pohon halaman
- Menambah mode edit split-view

## Status

1. Riset pengguna — selesai
2. Desain antarmuka — berjalan
3. Implementasi — akan datang

\`\`\`
 milestone        | target       | status
------------------+--------------+---------
 riset            | minggu 1     | ✓
 desain           | minggu 2-3   | ⧗
 implementasi     | minggu 4-6   | ·
\`\`\``,
    },
    "page-roadmap": {
      id: "page-roadmap",
      title: "Roadmap & Milestone",
      parentId: "page-proyek-overview",
      sectionId: "sec-proyek",
      icon: "🗺️",
      visibility: "tim",
      starred: false,
      tags: ["proyek-a", "roadmap"],
      updatedAt: "2026-06-17T13:10:00.000Z",
      updatedBy: "Sinta",
      content: `# Roadmap & Milestone

Rincian tonggak dan tanggung jawab.

## Minggu 2 — Desain

- Wireframe dasbor
- Komponen pohon halaman
- Tema gelap (eksplorasi)

## Minggu 3 — Validasi

- Uji kegunaan dengan 5 pengguna
- Iterasi berdasarkan umpan balik`,
    },
    "page-standar-penulisan": {
      id: "page-standar-penulisan",
      title: "Standar Penulisan",
      parentId: null,
      sectionId: "sec-standar",
      icon: "✍️",
      visibility: "public",
      starred: true,
      tags: ["standar", "gaya"],
      updatedAt: "2026-06-14T10:00:00.000Z",
      updatedBy: "Rani",
      content: `# Standar Penulisan

Agar semua halaman terasa seragam dan mudah dibaca.

## Struktur

- Satu judul \`H1\` per halaman
- Bagian besar memakai \`H2\`
- Sub-bagian memakai \`H3\`

## Gaya

- Kalimat pendek dan langsung
- Hindari jargon kecuali di **Glosarium**
- Pakai *daftar poin* untuk langkah

> Konsistensi lebih berharga daripada kesempurnaan.`,
    },
    "page-template": {
      id: "page-template",
      title: "Template Halaman",
      parentId: "page-standar-penulisan",
      sectionId: "sec-standar",
      icon: "📋",
      visibility: "tim",
      starred: false,
      tags: ["standar", "template"],
      updatedAt: "2026-06-12T09:30:00.000Z",
      updatedBy: "Bagas",
      content: `# Template Halaman

Salin blok di bawah saat membuat halaman baru.

\`\`\`markdown
# Judul Halaman

Ringkasan singkat dalam satu kalimat.

## Konteks
- Untuk siapa halaman ini?
- Kapan dipakai?

## Langkah
1. ...

## Catatan
- ...
\`\`\``,
    },
  },
  activePageId: "page-welcome",
  history: [
    { pageId: "page-welcome", at: NOW, by: "Rani", summary: "Memperbarui tips pintasan" },
    { pageId: "page-proyek-overview", at: "2026-06-19T16:20:00.000Z", by: "Sinta", summary: "Menambah status milestone" },
    { pageId: "page-standar-penulisan", at: "2026-06-14T10:00:00.000Z", by: "Rani", summary: "Mempublikasikan standar awal" },
  ],
};
