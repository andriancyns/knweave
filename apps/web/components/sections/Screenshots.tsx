import { SectionShell, Eyebrow } from "../primitives";
import { TreeIcon, MarkdownIcon } from "../primitives/Icons";

const SHOTS = [
  {
    label: "Pohon Wiki",
    caption: "Struktur pohon bersarang, drag untuk menyusun ulang.",
    render: <WikiTreeShot />,
  },
  {
    label: "Tampilan Halaman",
    caption: "Markdown dirender bersih dengan heading, kode, dan callout.",
    render: <PageViewShot />,
  },
  {
    label: "Mode Edit",
    caption: "Editor markdown split-pane, pratinjau langsung di sampingnya.",
    render: <EditViewShot />,
  },
];

export function Screenshots() {
  return (
    <SectionShell id="demo">
      <div className="reveal mb-12 max-w-2xl">
        <Eyebrow>Tangkapan Layar</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink text-balance sm:text-4xl">
          Begini rupanya Knweave.
        </h2>
        <p className="mt-4 text-ink-soft">
          Tiga tampilan inti: pohon halaman, baca, dan edit. Sederhana,
          konsisten, dan bekerja sama persis di setiap perangkat.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {SHOTS.map((s, i) => (
          <figure
            key={s.label}
            className="reveal group"
            style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
          >
            <div className="card overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(17,24,39,0.25)]">
              {/* window chrome */}
              <div className="flex items-center gap-2 border-b border-weave-thread/70 bg-paper px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#F87171]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FBBF24]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#34D399]" />
                <span className="ml-2 font-mono text-[10px] text-ink-muted">
                  knweave · {s.label.toLowerCase().replace(/\s/g, "-")}
                </span>
              </div>
              {/* the mockup */}
              <div className="aspect-[4/3] overflow-hidden bg-paper p-4">
                <div className="h-full w-full">{s.render}</div>
              </div>
            </div>
            <figcaption className="mt-3 px-1">
              <span className="font-display text-base font-semibold text-ink">
                {s.label}
              </span>
              <p className="mt-0.5 text-sm text-ink-muted">{s.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </SectionShell>
  );
}

/* shared small primitives for mockups */
const chip = "rounded bg-surface border border-weave-thread/70";

/* --------------------------- Wiki tree ----------------------------- */
function Tree({
  label,
  depth = 0,
  active = false,
  folder = false,
}: {
  label: string;
  depth?: number;
  active?: boolean;
  folder?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-1.5 rounded-md px-1.5 py-1 ${
        active ? "bg-weave-blueTint" : ""
      }`}
      style={{ marginLeft: depth * 12 }}
    >
      <span className={folder ? "text-weave-blue" : "text-ink-muted"}>
        {folder ? "▾" : "•"}
      </span>
      <span
        className={`truncate text-[10px] ${
          active ? "font-semibold text-weave-blue" : "text-ink-soft"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function WikiTreeShot() {
  return (
    <div className="flex h-full gap-2">
      {/* sidebar */}
      <div className={`flex w-[45%] flex-col gap-0.5 ${chip} p-2`}>
        <div className="mb-1 flex items-center gap-1.5 px-1">
          <TreeIcon className="h-3 w-3 text-weave-blue" />
          <span className="font-mono text-[9px] uppercase tracking-wider text-ink-muted">
            wiki
          </span>
        </div>
        <Tree label="📁 Knweave" folder depth={0} />
        <Tree label="Onboarding" depth={1} />
        <Tree label="Pengenalan" depth={2} />
        <Tree label="Setup Cepat" depth={2} active />
        <Tree label="Arsitektur" depth={1} folder />
        <Tree label="Komponen" depth={2} />
        <Tree label="Alur Data" depth={2} />
        <Tree label="Self-Hosting" depth={1} folder />
        <Tree label="FAQ" depth={1} />
      </div>
      {/* main pane placeholder */}
      <div className={`flex flex-1 flex-col gap-1.5 ${chip} p-3`}>
        <div className="h-2 w-1/2 rounded bg-weave-blue/80" />
        <div className="h-1.5 w-full rounded bg-weave-thread/70" />
        <div className="h-1.5 w-5/6 rounded bg-weave-thread/70" />
        <div className="h-1.5 w-2/3 rounded bg-weave-thread/70" />
        <div className="mt-1 h-4 w-3/5 rounded bg-weave-blueTint" />
        <div className="h-1.5 w-full rounded bg-weave-thread/70" />
        <div className="h-1.5 w-4/5 rounded bg-weave-thread/70" />
      </div>
    </div>
  );
}

/* --------------------------- Page view ----------------------------- */
function PageViewShot() {
  return (
    <div className={`flex h-full flex-col gap-1.5 overflow-hidden ${chip} p-3.5`}>
      {/* breadcrumb */}
      <div className="flex items-center gap-1 font-mono text-[9px] text-ink-muted">
        <span>Knweave</span>
        <span>/</span>
        <span>Arsitektur</span>
        <span>/</span>
        <span className="text-ink">Komponen</span>
      </div>
      {/* title */}
      <h4 className="font-display text-sm font-semibold text-ink">
        Komponen Inti
      </h4>
      <div className="h-px w-full bg-weave-thread/60" />
      {/* body */}
      <p className="text-[10px] leading-snug text-ink-soft">
        Knweave terdiri dari tiga bagian: server, penyimpanan berkas, dan UI
        klien. Semuanya dalam satu binary.
      </p>
      {/* code block */}
      <div className="rounded bg-ink p-2 font-mono text-[9px] leading-snug">
        <span className="text-emerald-400">type</span>{" "}
        <span className="text-weave-blueSoft">Wiki</span>{" "}
        <span className="text-paper/50">{"struct {"}</span>
        <div className="pl-3 text-paper/70">Pages []Page</div>
        <span className="text-paper/50">{"}"}</span>
      </div>
      {/* callout */}
      <div className="flex items-start gap-1.5 rounded bg-weave-blueTint px-2 py-1.5">
        <span className="text-weave-blue">💡</span>
        <span className="text-[9px] text-ink-soft">
          Data disimpan sebagai berkas markdown — bisa di-<i>grep</i> &amp;
          di-backup dengan rsync.
        </span>
      </div>
    </div>
  );
}

/* --------------------------- Edit view ----------------------------- */
function EditViewShot() {
  return (
    <div className="flex h-full flex-col gap-1.5">
      {/* toolbar */}
      <div className={`flex items-center gap-2 ${chip} px-2 py-1.5`}>
        <MarkdownIcon className="h-3 w-3 text-weave-blue" />
        <span className="font-mono text-[9px] text-ink-muted">edit</span>
        <div className="ml-auto flex gap-1">
          {["B", "I", "{}", "#"].map((b) => (
            <span
              key={b}
              className="flex h-4 w-4 items-center justify-center rounded bg-paper font-mono text-[8px] text-ink-soft"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
      {/* split panes */}
      <div className="grid flex-1 grid-cols-2 gap-1.5">
        {/* editor */}
        <div className={`flex flex-col gap-0.5 ${chip} p-2 font-mono text-[9px] leading-snug`}>
          <div className="text-weave-blue">{"# Standar RFC"}</div>
          <div className="text-paper/0">.</div>
          <div className="text-ink-soft">Draf terakhir 2026-06.</div>
          <div className="text-ink-soft">Lihat `{"{"}docs{"}"}`.</div>
          <div className="text-ink-soft">- [x] ringkasan</div>
          <div className="text-ink-soft">- [ ] contoh</div>
        </div>
        {/* preview */}
        <div className={`flex flex-col gap-0.5 ${chip} p-2`}>
          <div className="text-[10px] font-semibold text-ink">Standar RFC</div>
          <div className="text-[9px] text-ink-muted">Draf terakhir 2026-06.</div>
          <div className="text-[9px] text-ink-soft">Lihat <span className="rounded bg-paper px-0.5 text-weave-blue">docs</span>.</div>
          <div className="flex items-center gap-1 text-[9px] text-ink-soft">
            <span className="inline-block h-2.5 w-2.5 rounded-sm border border-weave-blue" />
            ringkasan
          </div>
          <div className="flex items-center gap-1 text-[9px] text-ink-muted">
            <span className="inline-block h-2.5 w-2.5 rounded-sm border border-weave-thread" />
            contoh
          </div>
        </div>
      </div>
    </div>
  );
}
