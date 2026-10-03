import { SectionShell, Eyebrow } from "../primitives";

const QUOTES = [
  {
    quote:
      "Sebelumnya pakai Notion, lalu harganya naik untuk tim kami. Knweave menggantikannya sepenuhnya — kami jalankan di VPS $5/bulan dan punya semua pengetahuan tim.",
    name: "Raka Pratama",
    role: "Maintainer, OpenWeather-Maps OSS",
    initials: "RP",
    color: "#2563EB",
  },
  {
    quote:
      "Tim produk kami 6 orang. Kami tidak butuh 200 fitur. Kami butuh wiki yang cepat, bisa di-share, dan tidak hilang saat vendor diakuisisi. Knweave persis itu.",
    name: "Maya Saraswati",
    role: "Kepala Tim Produk, loka.id",
    initials: "MS",
    color: "#6B7280",
  },
  {
    quote:
      "Self-hosting butuh 10 menit. Datanya markdown biasa — kami bisa pindah kapan saja tanpa terjebak. Ini seperti Google Docs era awal, tapi milik kami.",
    name: "Dimas Nurcahya",
    role: "Relawan Teknologi, Yayasan Edukasi",
    initials: "DN",
    color: "#3B82F6",
  },
];

export function Testimonials() {
  return (
    <SectionShell id="testimoni">
      <div className="reveal mb-12 max-w-2xl">
        <Eyebrow>Testimoni</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink text-balance sm:text-4xl">
          Tim kecil sudah mempercayai Knweave.
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {QUOTES.map((q, i) => (
          <figure
            key={q.name}
            className="reveal card flex flex-col gap-5 p-7"
            style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
          >
            {/* woven quote mark */}
            <svg viewBox="0 0 40 30" className="h-7 w-9" fill="none" aria-hidden>
              <path d="M6 24C14 6 26 18 34 6" stroke={q.color} strokeWidth="2.4" strokeLinecap="round" />
              <path d="M6 18C14 30 26 18 34 28" stroke="#6B7280" strokeWidth="2.4" strokeLinecap="round" opacity="0.4" />
            </svg>
            <blockquote className="flex-1 text-pretty text-[15px] leading-relaxed text-ink-soft">
              &ldquo;{q.quote}&rdquo;
            </blockquote>
            <figcaption className="flex items-center gap-3 border-t border-weave-thread/60 pt-5">
              <span
                className="flex h-10 w-10 flex-none items-center justify-center rounded-full font-display text-sm font-semibold text-white"
                style={{ background: q.color }}
                aria-hidden
              >
                {q.initials}
              </span>
              <div>
                <div className="text-sm font-semibold text-ink">{q.name}</div>
                <div className="text-xs text-ink-muted">{q.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </SectionShell>
  );
}
