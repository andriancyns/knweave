import type { ReactNode } from "react";
import { SectionShell, Eyebrow, Badge } from "../primitives";
import {
  TreeIcon,
  MarkdownIcon,
  SearchIcon,
  HistoryIcon,
  ShareIcon,
} from "../primitives/Icons";

export function Features() {
  return (
    <SectionShell id="fitur">
      <div className="reveal mb-12 max-w-2xl">
        <Eyebrow>Fitur Utama</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink text-balance sm:text-4xl">
          Semua yang tim butuhkan.{" "}
          <span className="text-ink-muted">Tidak lebih.</span>
        </h2>
        <p className="mt-4 text-ink-soft">
          Lima fitur inti, dirancang untuk bekerja dengan baik bersama — bukan
          daftar tanpa akhir yang menumpuk berat di UI-mu.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-6 lg:grid-rows-[auto_auto]">
        {/* Page tree — big */}
        <FeatureCard
          className="lg:col-span-3 lg:row-span-2"
          icon={<TreeIcon className="h-5 w-5" />}
          title="Pohon Halaman"
          desc="Atur dokumentasi dalam struktur pohon bersarang. Drag untuk menyusun ulang, sembunyikan cabang yang tidak relevan."
          visual={<PageTreeVisual />}
        />

        {/* Markdown */}
        <FeatureCard
          className="lg:col-span-3"
          icon={<MarkdownIcon className="h-5 w-5" />}
          title="Markdown"
          desc="Tulis dengan markdown murni — heading, tabel, kode, callout. Tanpa format proprietari yang menyandera datamu."
          visual={<MarkdownVisual />}
        />

        {/* Search */}
        <FeatureCard
          className="lg:col-span-3"
          icon={<SearchIcon className="h-5 w-5" />}
          title="Pencarian Cepat"
          desc="Temukan halaman apa pun dalam milidetik. ⌘K untuk membuka, ketik, langsung dapat."
          visual={<SearchVisual />}
        />

        {/* Version history */}
        <FeatureCard
          className="lg:col-span-2"
          icon={<HistoryIcon className="h-5 w-5" />}
          title="Riwayat Versi"
          desc="Setiap suntingan tersimpan. Bandingkan, kembalikan, dan telusuri siapa mengubah apa."
        />

        {/* Public share */}
        <FeatureCard
          className="lg:col-span-2"
          icon={<ShareIcon className="h-5 w-5" />}
          title="Bagikan Publik"
          desc="Publikasikan satu halaman sebagai tautan publik baca-saja. Cocok untuk dokumentasi eksternal."
        />

        {/* integrity tile */}
        <FeatureCard
          className="lg:col-span-2 bg-weave-blueTint"
          tone="tint"
          icon={<Badge tone="blue">no bloat</Badge>}
          title="Tanpa Mbloat"
          desc="Tidak ada AI feature-of-the-week, tidak ada marketplace, tidak ada telemetri. Hanya wiki yang cepat."
        />
      </div>
    </SectionShell>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  visual,
  className = "",
  tone = "default",
}: {
  icon: ReactNode;
  title: string;
  desc: string;
  visual?: ReactNode;
  className?: string;
  tone?: "default" | "tint";
}) {
  return (
    <article
      className={`reveal card group flex flex-col overflow-hidden p-6 hover:border-weave-blue/40 ${
        tone === "tint" ? "border-weave-blue/20" : ""
      } ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${
            tone === "tint" ? "bg-surface text-weave-blue" : "bg-paper text-weave-blue"
          }`}
        >
          {icon}
        </span>
        <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{desc}</p>
      {visual && (
        <div className="mt-5 flex-1 rounded-xl border border-weave-thread/60 bg-paper/60 p-4">
          {visual}
        </div>
      )}
    </article>
  );
}

/* ----------------------------- visuals ----------------------------- */

function TreeNode({
  label,
  depth = 0,
  active = false,
  dot = "#D1D5DB",
  children,
}: {
  label: string;
  depth?: number;
  active?: boolean;
  dot?: string;
  children?: ReactNode;
}) {
  return (
    <div>
      <div
        className="flex items-center gap-2 rounded-md px-2 py-1"
        style={{ marginLeft: depth * 16 }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: dot }} />
        <span
          className={`text-xs ${
            active ? "font-semibold text-weave-blue" : "text-ink-soft"
          }`}
        >
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

function PageTreeVisual() {
  return (
    <div className="font-mono text-ink-soft">
      <TreeNode label="📁 Knweave Wiki" dot="#2563EB" />
      <TreeNode label="Onboarding" depth={1} dot="#3B82F6" />
      <TreeNode label="Arsitektur" depth={1} dot="#3B82F6" />
      <TreeNode label="Komponen" depth={2} dot="#6B7280" />
      <TreeNode label="API" depth={2} dot="#6B7280" active />
      <TreeNode label="Self-Hosting" depth={1} dot="#3B82F6" />
      <TreeNode label="docker-compose" depth={2} dot="#6B7280" />
    </div>
  );
}

function MarkdownVisual() {
  return (
    <div className="font-mono text-[11px] leading-relaxed text-ink-soft">
      <div className="text-weave-blue"># Standar RFC</div>
      <div className="text-ink-muted">Draf terakhir diperbarui 2026-06.</div>
      <div className="mt-1">
        Lihat <span className="rounded bg-surface px-1 text-weave-blue">`/docs`</span>{" "}
        untuk detail.
      </div>
      <div className="mt-1.5 flex gap-1">
        <span className="rounded bg-surface px-1.5 py-0.5 text-ink-muted">#tag</span>
        <span className="rounded bg-surface px-1.5 py-0.5 text-ink-muted">#rfc</span>
      </div>
    </div>
  );
}

function SearchVisual() {
  return (
    <div>
      <div className="flex items-center gap-2 rounded-lg border border-weave-thread bg-surface px-3 py-2">
        <SearchIcon className="h-4 w-4 text-ink-muted" />
        <span className="font-mono text-xs text-ink">docker</span>
        <span className="ml-auto rounded border border-weave-thread px-1.5 py-0.5 font-mono text-[10px] text-ink-muted">
          ⌘K
        </span>
      </div>
      <div className="mt-2 space-y-1">
        {["Self-Hosting / docker-compose", "Arsitektur / Container"].map((r, i) => (
          <div
            key={r}
            className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${
              i === 0 ? "bg-weave-blueTint" : "bg-surface"
            }`}
          >
            <span className="h-1 w-1 rounded-full bg-weave-blue" />
            <span className="text-xs text-ink-soft">{r}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
