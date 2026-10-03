import { SectionShell, Eyebrow } from "../primitives";
import { PackageIcon, GithubIcon, UsersIcon, LeafIcon } from "../primitives/Icons";

const CASES = [
  {
    icon: PackageIcon,
    title: "Tim Produk",
    desc: "Spesifikasi, PRD, dan keputusan desain — semuanya di satu pohon halaman yang bisa diakses seluruh tim.",
    tag: "produk",
  },
  {
    icon: GithubIcon,
    title: "Proyek Open Source",
    desc: "Dokumentasi kontributor, panduan setup, dan arsitektur. Pengguna baru onboarding dalam hitungan menit.",
    tag: "oss",
  },
  {
    icon: UsersIcon,
    title: "Komunitas",
    desc: "Wiki publik untuk FAQ, panduan, dan pengetahuan bersama. Bagikan satu halaman atau seluruh ruang.",
    tag: "komunitas",
  },
  {
    icon: LeafIcon,
    title: "Organisasi Nonprofit",
    desc: "Pengetahuan program, SOP, dan rapat tim. Tanpa biaya lisensi, tanpa ketergantungan vendor.",
    tag: "nonprofit",
  },
];

export function UseCases() {
  return (
    <SectionShell id="use-cases">
      <div className="reveal mb-12 flex flex-col items-start gap-3">
        <Eyebrow>Untuk siapa</Eyebrow>
        <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight text-ink text-balance sm:text-4xl">
          Dibuat untuk tim kecil yang menghargai{" "}
          <span className="text-weave-blue">kesederhanaan</span>.
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CASES.map((c, i) => (
          <article
            key={c.title}
            className="reveal card group p-6 hover:-translate-y-1 hover:border-weave-blue/40 hover:shadow-[0_18px_40px_-24px_rgba(37,99,235,0.35)]"
            style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-weave-thread bg-paper text-weave-blue transition-colors group-hover:bg-weave-blueTint">
                <c.icon className="h-5 w-5" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                {c.tag}
              </span>
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-ink">
              {c.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.desc}</p>

            {/* woven corner accent */}
            <svg
              viewBox="0 0 60 20"
              className="mt-5 h-3 w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden
              fill="none"
            >
              <path d="M0 12C15 4 30 16 45 8S60 4 60 8" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
              <path d="M0 8C15 16 30 4 45 12S60 16 60 12" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            </svg>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
