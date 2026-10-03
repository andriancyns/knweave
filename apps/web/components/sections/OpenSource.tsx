import { SectionShell, Eyebrow, Badge, LinkButton } from "../primitives";
import {
  ScaleIcon,
  HeartIcon,
  GithubIcon,
  UsersIcon,
  ArrowRight,
} from "../primitives/Icons";

export function OpenSource() {
  return (
    <SectionShell id="open-source">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* left: copy */}
        <div className="reveal">
          <Eyebrow>Open Source & Lisensi</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink text-balance sm:text-4xl">
            Punyamu, untuk selamanya.{" "}
            <span className="text-weave-blue">Sungguh-sungguh.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Knweave berlisensi <span className="font-semibold text-ink">MIT</span> —
            bebas pakai, ubah, distribusi, dan host sendiri tanpa syarat. Tidak
            ada &ldquo;open-core&rdquo;, tidak ada fitur terkunci di balik lisensi
            komersial.
          </p>

          <ul className="mt-7 space-y-3">
            {[
              "Kode sumber penuh tersedia publik di GitHub",
              "Kontribusi komunitas diterima dengan ramah (lihat CONTRIBUTING.md)",
              "Tanpa telemetri, tanpa pemanggilan ke rumah (phone-home)",
              "Bisa di-fork, di-custom, dan dipakai internal tanpa batas",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-weave-blueTint text-weave-blue">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12 4.5 4.5L19 7" />
                  </svg>
                </span>
                <span className="text-ink-soft">{t}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton
              href="https://github.com"
              external
              variant="primary"
              iconLeft={<GithubIcon className="h-4 w-4" />}
            >
              Jelajahi Kode
            </LinkButton>
            <LinkButton
              href="https://github.com"
              external
              variant="secondary"
              iconRight={<ArrowRight className="h-4 w-4" />}
            >
              Panduan Kontribusi
            </LinkButton>
          </div>
        </div>

        {/* right: license card + community stats */}
        <div className="reveal space-y-4" style={{ ["--reveal-delay" as string]: "120ms" }}>
          {/* license card */}
          <div className="card relative overflow-hidden p-7">
            <div className="absolute -right-8 -top-8 opacity-[0.07]">
              <ScaleIcon className="h-40 w-40" />
            </div>
            <Badge tone="gray">
              <ScaleIcon className="h-3.5 w-3.5" /> LICENSE
            </Badge>
            <p className="mt-4 font-mono text-4xl font-semibold tracking-tight text-ink">
              MIT
            </p>
            <p className="mt-1 font-mono text-xs text-ink-muted">
              Copyright © 2026 Knweave contributors
            </p>
            <div className="mt-5 rounded-lg border border-weave-thread bg-paper p-4 font-mono text-[11px] leading-relaxed text-ink-muted">
              <span className="text-weave-blue">Permission</span> is hereby
              granted, free of charge, to any person obtaining a copy of this
              software… to deal in the Software without restriction,{" "}
              <span className="text-ink-soft">including without limitation</span>{" "}
              the rights to use, copy, modify, merge, publish, distribute…
            </div>
          </div>

          {/* community stats row */}
          <div className="grid grid-cols-3 gap-4">
            <StatCard icon={<GithubIcon className="h-4 w-4" />} value="2.4k" label="stars" />
            <StatCard icon={<HeartIcon className="h-4 w-4" />} value="38" label="kontributor" />
            <StatCard icon={<UsersIcon className="h-4 w-4" />} value="190" label="forks" />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="card flex flex-col items-center justify-center gap-1 p-4 text-center">
      <span className="text-weave-blue">{icon}</span>
      <span className="font-display text-2xl font-semibold text-ink">{value}</span>
      <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
        {label}
      </span>
    </div>
  );
}
