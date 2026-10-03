"use client";

import { useEffect, useRef, useState } from "react";
import {
  CheckIcon,
  EyeIcon,
  GlobeIcon,
  LockIcon,
  MoreIcon,
  StarFilledIcon,
  StarIcon,
  TrashIcon,
  UsersIcon,
} from "../primitives/Icons";
import { useWikiStore } from "./useWikiStore";
import type { Visibility, WikiPage, WikiState } from "./types";
import { VISIBILITY_LABELS } from "./types";

interface Props {
  page: WikiPage;
  onMovePage?: () => void;
}

const VIS_META: Record<
  Visibility,
  { icon: React.ReactNode; hint: string }
> = {
  public: {
    icon: <GlobeIcon className="h-4 w-4" />,
    hint: "Siapa pun dengan tautan bisa membaca",
  },
  tim: {
    icon: <UsersIcon className="h-4 w-4" />,
    hint: "Hanya anggota tim",
  },
  privat: {
    icon: <LockIcon className="h-4 w-4" />,
    hint: "Hanya kamu",
  },
};

export function PageActionsMenu({ page, onMovePage }: Props) {
  const { state, dispatch } = useWikiStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`rounded-lg p-2 transition-colors ${
          open ? "bg-paper text-ink" : "text-ink-soft hover:bg-paper hover:text-ink"
        }`}
        aria-label="Tindakan halaman"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <MoreIcon className="h-5 w-5" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-11 z-40 w-72 overflow-hidden rounded-xl border border-weave-thread bg-surface shadow-[0_12px_40px_-12px_rgba(17,24,39,0.25)]"
        >
          {/* visibility */}
          <div className="px-3 py-2">
            <p className="px-1 pb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
              Visibilitas
            </p>
            {(Object.keys(VIS_META) as Visibility[]).map((v) => {
              const selected = page.visibility === v;
              return (
                <button
                  key={v}
                  onClick={() =>
                    dispatch({ type: "setVisibility", pageId: page.id, visibility: v })
                  }
                  className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-[13px] transition-colors hover:bg-paper"
                >
                  <span className={selected ? "text-weave-blue" : "text-ink-muted"}>
                    {VIS_META[v].icon}
                  </span>
                  <span className="flex-1">
                    <span className="block font-medium text-ink">
                      {VISIBILITY_LABELS[v]}
                    </span>
                    <span className="block text-[11px] text-ink-muted">
                      {VIS_META[v].hint}
                    </span>
                  </span>
                  {selected && <CheckIcon className="h-4 w-4 text-weave-blue" />}
                </button>
              );
            })}
          </div>

          <div className="h-px bg-weave-thread/60" />

          {/* actions */}
          <div className="p-1.5">
            <MenuRow
              icon={page.starred ? <StarFilledIcon className="h-4 w-4 text-amber-500" /> : <StarIcon className="h-4 w-4" />}
              label={page.starred ? "Hapus bintang" : "Beri bintang"}
              onClick={() => dispatch({ type: "toggleStar", pageId: page.id })}
            />
            <MenuRow
              icon={<EyeIcon className="h-4 w-4" />}
              label="Pindahkan halaman…"
              hint={destLabel(state, page)}
              onClick={() => {
                setOpen(false);
                onMovePage?.();
              }}
            />
          </div>

          <div className="h-px bg-weave-thread/60" />

          <div className="p-1.5">
            <MenuRow
              danger
              icon={<TrashIcon className="h-4 w-4" />}
              label="Hapus halaman"
              onClick={() => {
                if (confirm(`Hapus "${page.title}"? Sub-halaman juga akan dihapus.`)) {
                  dispatch({ type: "delete", pageId: page.id });
                }
                setOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function MenuRow({
  icon,
  label,
  hint,
  danger,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  hint?: string;
  danger?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      role="menuitem"
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-[13px] transition-colors hover:bg-paper ${
        danger ? "text-red-600 hover:bg-red-50" : "text-ink-soft"
      }`}
    >
      <span className={danger ? "text-red-500" : "text-ink-muted"}>{icon}</span>
      <span className="flex-1">
        <span className="block font-medium">{label}</span>
        {hint && <span className="block text-[11px] text-ink-muted">{hint}</span>}
      </span>
    </button>
  );
}

function destLabel(state: WikiState, page: WikiPage): string {
  const sec = state.sections.find((s) => s.id === page.sectionId)?.title ?? "—";
  const parent = page.parentId ? state.pages[page.parentId]?.title : null;
  return parent ? `saat ini: ${sec} › ${parent}` : `saat ini: ${sec}`;
}
