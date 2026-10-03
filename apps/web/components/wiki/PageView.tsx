"use client";

import { useState } from "react";
import {
  EyeIcon,
  HistoryIcon,
  PencilIcon,
  StarFilledIcon,
  StarIcon,
  XIcon,
} from "../primitives/Icons";
import { MarkdownView } from "./MarkdownView";
import { PageActionsMenu } from "./PageActionsMenu";
import { MovePageModal } from "./MovePageModal";
import { pageBreadcrumb, sectionTitle, useWikiStore } from "./useWikiStore";
import { VISIBILITY_LABELS } from "./types";
import type { WikiPage } from "./types";

interface Props {
  page: WikiPage;
  onEdit: () => void;
}

const TEMPLATES: { label: string; icon: string; body: string }[] = [
  {
    label: "Halaman Baru",
    icon: "📄",
    body: `# Judul\n\nTulis sesuatu…`,
  },
  {
    label: "Catatan Rapat",
    icon: "🗒️",
    body: `# Catatan Rapat\n\n**Tanggal:** \n**Peserta:** \n\n## Agenda\n- \n\n## Keputusan\n- \n\n## Tindak Lanjut\n- [ ] `,
  },
  {
    label: "Dokumentasi API",
    icon: "🔌",
    body: `# Nama Endpoint\n\n## Permintaan\n\n\`\`\`http\nGET /api/sumber\n\`\`\`\n\n## Parameter\n| nama | tipe | wajib |\n|------|------|-------|\n|  |  |  |\n\n## Contoh Respons\n\n\`\`\`json\n{ "ok": true }\n\`\`\``,
  },
  {
    label: "Onboarding",
    icon: "🌱",
    body: `# Onboarding Peran\n\n## Minggu 1\n- \n\n## Minggu 2\n- \n\n## Kontak penting\n- `,
  },
];

export function PageView({ page, onEdit }: Props) {
  const { state, dispatch } = useWikiStore();
  const [moveOpen, setMoveOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const breadcrumb = pageBreadcrumb(state, page.id);
  const isEmpty = page.content.trim() === "";

  return (
    <div className="flex h-full flex-col">
      {/* header */}
      <div className="border-b border-weave-thread/70 bg-surface px-6 py-4 sm:px-10">
        {/* breadcrumb */}
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-ink-muted">
          <span>{sectionTitle(state, page.sectionId)}</span>
          {breadcrumb.length > 1 &&
            breadcrumb.slice(0, -1).map((p) => (
              <span key={p.id} className="flex items-center gap-1.5">
                <span className="text-weave-thread">/</span>
                <button
                  className="hover:text-weave-blue"
                  onClick={() => dispatch({ type: "setActive", pageId: p.id })}
                >
                  {p.title}
                </button>
              </span>
            ))}
        </div>

        <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="text-2xl" aria-hidden>
              {page.icon ?? "📄"}
            </span>
            <h1 className="truncate font-display text-2xl font-semibold tracking-tight text-ink sm:text-[28px]">
              {page.title}
            </h1>
          </div>

          <div className="flex items-center gap-1">
            {/* Edit / View segmented */}
            <div className="weave-segmented" role="group" aria-label="Mode">
              <button aria-pressed={false} onClick={onEdit} className="flex items-center gap-1">
                <PencilIcon className="h-3.5 w-3.5" /> Sunting
              </button>
              <button aria-pressed={true}>
                <EyeIcon className="h-3.5 w-3.5" /> Lihat
              </button>
            </div>

            <button
              onClick={() => setHistoryOpen(true)}
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-ink-soft transition-colors hover:bg-paper hover:text-ink"
              title="Riwayat Perubahan"
            >
              <HistoryIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Riwayat</span>
            </button>

            <button
              onClick={() => dispatch({ type: "toggleStar", pageId: page.id })}
              className={`rounded-lg p-2 transition-colors hover:bg-paper ${
                page.starred ? "text-amber-500" : "text-ink-soft hover:text-ink"
              }`}
              aria-pressed={page.starred}
              aria-label={page.starred ? "Hapus bintang" : "Beri bintang"}
              title={page.starred ? "Hapus bintang" : "Beri bintang"}
            >
              {page.starred ? (
                <StarFilledIcon className="h-5 w-5" />
              ) : (
                <StarIcon className="h-5 w-5" />
              )}
            </button>

            <PageActionsMenu page={page} onMovePage={() => setMoveOpen(true)} />
          </div>
        </div>

        {/* meta */}
        <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-ink-muted">
          <span>
            Diperbarui{" "}
            <span className="font-medium text-ink-soft">
              {relativeTime(page.updatedAt)}
            </span>{" "}
            oleh <span className="font-medium text-ink-soft">{page.updatedBy}</span>
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-weave-thread bg-paper px-2 py-0.5">
            {VISIBILITY_LABELS[page.visibility]}
          </span>
          {page.tags.length > 0 && (
            <span className="flex items-center gap-1.5">
              {page.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-weave-blueTint px-2 py-0.5 font-mono text-[10px] text-weave-blueInk"
                >
                  #{t}
                </span>
              ))}
            </span>
          )}
        </div>
      </div>

      {/* body */}
      <div className="flex-1 overflow-y-auto bg-paper">
        {isEmpty ? (
          <EmptyState
            onPick={(body) =>
              dispatch({
                type: "updateContent",
                pageId: page.id,
                content: body,
              })
            }
            onEdit={onEdit}
          />
        ) : (
          <article className="mx-auto max-w-prose px-6 py-8 sm:px-10">
            <MarkdownView source={page.content} />
          </article>
        )}
      </div>

      {moveOpen && (
        <MovePageModal page={page} onClose={() => setMoveOpen(false)} />
      )}
      {historyOpen && (
        <HistoryModal pageId={page.id} onClose={() => setHistoryOpen(false)} />
      )}
    </div>
  );
}

/* ----------------------------------------------------------- empty state */
function EmptyState({
  onPick,
  onEdit,
}: {
  onPick: (body: string) => void;
  onEdit: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-prose flex-col items-center px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-weave-thread bg-surface text-3xl">
        🧵
      </div>
      <h2 className="mt-5 font-display text-xl font-semibold text-ink">
        Halaman ini masih kosong
      </h2>
      <p className="mt-2 max-w-sm text-sm text-ink-muted">
        Mulai dari templat di bawah, atau tulis langsung. Semua tersimpan otomatis.
      </p>
      <div className="mt-6 grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
        {TEMPLATES.map((t) => (
          <button
            key={t.label}
            onClick={() => onPick(t.body)}
            className="group flex flex-col items-center gap-2 rounded-xl border border-weave-thread bg-surface px-3 py-4 transition-all hover:-translate-y-0.5 hover:border-weave-blue/40 hover:shadow-[0_8px_20px_-12px_rgba(37,99,235,0.4)]"
          >
            <span className="text-2xl transition-transform group-hover:scale-110">
              {t.icon}
            </span>
            <span className="text-[12px] font-medium text-ink-soft">{t.label}</span>
          </button>
        ))}
      </div>
      <button
        onClick={onEdit}
        className="btn-ghost mt-6 px-4 py-2 text-[13px]"
      >
        Mulai menulis dari nol →
      </button>
    </div>
  );
}

/* --------------------------------------------------------- history modal */
function HistoryModal({ pageId, onClose }: { pageId: string; onClose: () => void }) {
  const { state } = useWikiStore();
  const entries = state.history.filter((h) => h.pageId === pageId);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl border border-weave-thread bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-weave-thread/70 px-5 py-3.5">
          <h3 className="flex items-center gap-2 font-display text-base font-semibold text-ink">
            <HistoryIcon className="h-4 w-4 text-weave-blue" />
            Riwayat Perubahan
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-ink-muted hover:bg-paper hover:text-ink"
            aria-label="Tutup"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-2">
          {entries.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-ink-muted">
              Belum ada riwayat.
            </p>
          ) : (
            <ul className="flex flex-col">
              {entries.map((h, i) => (
                <li
                  key={`${h.at}-${i}`}
                  className="flex gap-3 rounded-lg px-3 py-2.5 hover:bg-paper"
                >
                  <div className="mt-0.5 flex flex-col items-center">
                    <span className="h-2 w-2 rounded-full bg-weave-blue/60" />
                    {i < entries.length - 1 && (
                      <span className="mt-1 h-8 w-px bg-weave-thread/60" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium text-ink">{h.summary}</p>
                    <p className="text-[11px] text-ink-muted">
                      {h.by} · {relativeTime(h.at)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- helpers */
export function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "baru saja";
  const diff = Date.now() - then;
  const sec = Math.round(diff / 1000);
  if (sec < 60) return "baru saja";
  const min = Math.round(sec / 60);
  if (min < 60) return `${min} menit lalu`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr} jam lalu`;
  const day = Math.round(hr / 24);
  if (day < 7) return `${day} hari lalu`;
  const wk = Math.round(day / 7);
  if (wk < 5) return `${wk} minggu lalu`;
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
