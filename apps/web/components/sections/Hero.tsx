import { LinkButton, Badge } from "../primitives";
import { GithubIcon, ArrowRight, SparkIcon } from "../primitives/Icons";
import { WovenHeroIllustration } from "../illustrations/WovenHeroIllustration";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-36">
      {/* decorative big weave threads behind hero */}
      <WeaveBackdrop />

      <div className="shell relative z-10 grid items-center gap-12 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-28">
        {/* ---- left: copy ---- */}
        <div className="max-w-xl">
          <div className="reveal" style={{ ["--reveal-delay" as string]: "0ms" }}>
            <Badge tone="blue">
              <SparkIcon className="h-3.5 w-3.5" />
              Open Source · Self-Hostable · Gratis Selamanya
            </Badge>
          </div>

          <h1
            className="reveal mt-6 font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-ink text-balance sm:text-6xl"
            style={{ ["--reveal-delay" as string]: "80ms" }}
          >
            Wiki Tim{" "}
            <span className="relative whitespace-nowrap">
              <span className="text-weave-blue">Sederhana</span>
              {/* underline weave */}
              <svg
                viewBox="0 0 220 14"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-3 w-full"
                aria-hidden
                fill="none"
              >
                <path d="M2 9C40 3 90 3 120 8s70 3 98-3" stroke="#3B82F6" strokeWidth="2.4" strokeLinecap="round" opacity="0.5" />
                <path d="M2 6C40 11 90 11 120 5s70-3 98 4" stroke="#6B7280" strokeWidth="2.4" strokeLinecap="round" opacity="0.45" />
              </svg>
            </span>
            ,<br />
            Terbuka untuk Semua.
          </h1>

          <p
            className="reveal mt-7 max-w-prose text-lg leading-relaxed text-ink-soft text-pretty"
            style={{ ["--reveal-delay" as string]: "160ms" }}
          >
            Knweave adalah pusat pengetahuan bersama untuk tim kecil — tanpa
            vendor lock-in, tanpa ratusan fitur yang tidak perlu. Tulis dalam
            markdown, atur dalam pohon halaman, dan kendalikan sendiri datamu.
          </p>

          <div
            className="reveal mt-9 flex flex-wrap items-center gap-3"
            style={{ ["--reveal-delay" as string]: "240ms" }}
          >
            <LinkButton href="/app" variant="primary" iconRight={<ArrowRight className="h-4 w-4" />}>
              Coba Demo
            </LinkButton>
            <LinkButton
              href="https://github.com"
              external
              variant="secondary"
              iconLeft={<GithubIcon className="h-4 w-4" />}
            >
              Lihat GitHub
            </LinkButton>
          </div>

          {/* trust row */}
          <div
            className="reveal mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs text-ink-muted"
            style={{ ["--reveal-delay" as string]: "320ms" }}
          >
            <Stat label="Lisensi" value="MIT" />
            <Dot />
            <Stat label="Self-host" value="1 container" />
            <Dot />
            <Stat label="RAM" value="< 256MB" />
            <Dot />
            <Stat label="Bahasa" value="Markdown" />
          </div>
        </div>

        {/* ---- right: woven illustration ---- */}
        <div
          className="reveal relative"
          style={{ ["--reveal-delay" as string]: "200ms" }}
        >
          <div className="relative mx-auto max-w-lg">
            {/* floating mini stat card */}
            <div className="absolute -left-4 top-6 z-20 hidden rounded-xl border border-weave-thread bg-surface px-3.5 py-2.5 shadow-[0_8px_24px_-12px_rgba(17,24,39,0.18)] sm:block">
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                online
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-sm font-semibold text-ink">3 anggota tim</span>
              </div>
            </div>

            <WovenHeroIllustration className="w-full animate-weave-sway" />

            <div className="absolute -bottom-2 right-2 z-20 hidden rounded-xl border border-weave-thread bg-surface px-3.5 py-2.5 shadow-[0_8px_24px_-12px_rgba(17,24,39,0.18)] sm:block">
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                disimpan otomatis
              </p>
              <p className="mt-0.5 text-sm font-semibold text-weave-blue">v1.4 · 12 detik lalu</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className="uppercase tracking-wider text-ink-muted/70">{label}</span>
      <span className="font-semibold text-ink">{value}</span>
    </span>
  );
}
function Dot() {
  return <span className="h-1 w-1 rounded-full bg-weave-thread" aria-hidden />;
}

/* large faint weave threads sweeping behind the hero */
function WeaveBackdrop() {
  return (
    <svg
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      fill="none"
      aria-hidden
    >
      <path
        d="M-50 180C200 120 380 260 620 200s440-90 660-30"
        stroke="#2563EB"
        strokeWidth="2"
        opacity="0.08"
      />
      <path
        d="M-50 240C200 300 380 160 620 240s440 90 660 30"
        stroke="#6B7280"
        strokeWidth="2"
        opacity="0.08"
      />
      <path
        d="M-50 520C240 460 420 600 660 540s420-90 640-30"
        stroke="#2563EB"
        strokeWidth="2"
        opacity="0.06"
      />
    </svg>
  );
}
