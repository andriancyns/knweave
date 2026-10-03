import { SectionShell, Eyebrow, Badge } from "../primitives";
import { CheckIcon } from "../primitives/Icons";

export function SmallTeams() {
  return (
    <SectionShell id="small-teams">
      <div className="reveal relative overflow-hidden rounded-3xl border border-weave-thread bg-surface px-7 py-12 sm:px-14 sm:py-16">
        {/* weave threads in background */}
        <svg
          viewBox="0 0 1200 400"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 h-full w-full"
          fill="none"
          aria-hidden
        >
          <path d="M-50 120C200 60 380 200 620 140s440-90 660-30" stroke="#2563EB" strokeWidth="1.5" opacity="0.06" />
          <path d="M-50 280C200 340 380 200 620 280s440 90 660 30" stroke="#6B7280" strokeWidth="1.5" opacity="0.06" />
        </svg>

        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Eyebrow>Dibangun untuk Tim Kecil</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink text-balance sm:text-4xl">
              Kami tidak mencoba menjadi{" "}
              <span className="text-weave-blue">Notion</span>.
            </h2>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-soft">
              Tim berusia 3–30 orang tidak butuh ratusan fitur, marketplace
              template, atau AI agent yang menulis sendiri. Mereka butuh tempat
              yang <span className="font-semibold text-ink">cepat</span>,{" "}
              <span className="font-semibold text-ink">jelas</span>, dan tidak
              berubah fitur setiap bulan.
            </p>

            <div className="mt-7 space-y-2.5">
              {[
                "Buka, ketik, simpan — selesai dalam hitungan detik",
                "Antarmuka konsisten, bukan labirin menu",
                "Pembaruan terencana, bukan rilis fitur kilat tiap minggu",
              ].map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-weave-blueTint text-weave-blue">
                    <CheckIcon className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-ink-soft">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* contrast visual: us vs them */}
          <div className="space-y-3">
            <div className="rounded-2xl border border-weave-thread/60 bg-paper p-5">
              <Badge tone="blue">Knweave</Badge>
              <ul className="mt-3 space-y-1.5 font-mono text-xs text-ink-soft">
                {["page tree", "markdown", "search", "riwayat", "share"].map(
                  (f) => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckIcon className="h-3 w-3 text-weave-blue" strokeWidth={3} />
                      {f}
                    </li>
                  )
                )}
              </ul>
              <div className="mt-3 flex h-2 w-full overflow-hidden rounded-full bg-weave-thread/40">
                <div className="h-full w-[22%] bg-weave-blue" />
              </div>
              <p className="mt-1.5 font-mono text-[10px] text-ink-muted">
                5 fitur inti · ringan
              </p>
            </div>

            <div className="rounded-2xl border border-weave-thread/60 bg-paper p-5 opacity-70">
              <Badge tone="gray">Wiki korporat pada umumnya</Badge>
              <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 font-mono text-[11px] text-ink-muted">
                {[
                  "page tree",
                  "blocks",
                  "DB",
                  "views",
                  "kanban",
                  "AI",
                  "automations",
                  "templates",
                  "analytics",
                  "comments",
                  "permissions++",
                  "plugins",
                  "…+ 87 lainnya",
                ].map((f) => (
                  <li key={f} className="truncate">
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex h-2 w-full overflow-hidden rounded-full bg-weave-thread/40">
                <div className="h-full w-[100%] bg-ink-muted/40" />
              </div>
              <p className="mt-1.5 font-mono text-[10px] text-ink-muted">
                ratusan fitur · berat
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
