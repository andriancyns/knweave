"use client";

import {
  ChevronDown,
  HomeIcon,
  PlusIcon,
  SettingsIcon,
  StarIcon,
  UsersIcon,
} from "../primitives/Icons";
import { useActivePage, useWikiStore } from "./useWikiStore";
import { PageTree } from "./PageTree";

interface SidebarProps {
  view: "tree" | "home" | "starred";
  onView: (v: "tree" | "home" | "starred") => void;
}

export function Sidebar({ view, onView }: SidebarProps) {
  const { dispatch, state } = useWikiStore();
  const active = useActivePage();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-weave-thread/70 bg-surface/60">
      {/* new page */}
      <div className="p-3">
        <button
          onClick={() =>
            active &&
            dispatch({
              type: "add",
              sectionId: active.sectionId,
              parentId: active.parentId,
            })
          }
          className="btn-primary flex w-full justify-start px-3.5 py-2 text-[13px]"
        >
          <PlusIcon className="h-4 w-4" />
          Halaman Baru
        </button>
      </div>

      {/* quick links */}
      <div className="px-2">
        <QuickLink
          active={view === "home"}
          onClick={() => onView("home")}
          icon={<HomeIcon className="h-4 w-4" />}
          label="Beranda Tim"
        />
        <QuickLink
          active={view === "starred"}
          onClick={() => onView("starred")}
          icon={<StarIcon className="h-4 w-4" />}
          label="Dokumen Penting"
          badge={String(
            Object.values(state.pages).filter((p) => p.starred).length,
          )}
        />
      </div>

      <div className="mx-3 my-2 h-px bg-weave-thread/60" />

      {/* tree */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        <div className="flex items-center justify-between px-1.5 pb-1">
          <button
            onClick={() => onView("tree")}
            className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
              view === "tree" ? "text-weave-blue" : "text-ink-muted"
            }`}
          >
            Ruang Kerja
          </button>
          <ChevronDown className="h-3 w-3 text-ink-muted" />
        </div>
        <PageTree />
      </div>

      {/* footer */}
      <div className="border-t border-weave-thread/70 p-2">
        <QuickLink
          onClick={() => {}}
          icon={<SettingsIcon className="h-4 w-4" />}
          label="Pengaturan Ruang Kerja"
        />
        <QuickLink
          onClick={() => {}}
          icon={<UsersIcon className="h-4 w-4" />}
          label="Kelola Anggota"
        />
      </div>
    </aside>
  );
}

function QuickLink({
  icon,
  label,
  active,
  badge,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors ${
        active
          ? "bg-weave-blueTint text-weave-blueInk"
          : "text-ink-soft hover:bg-paper hover:text-ink"
      }`}
    >
      <span className={active ? "text-weave-blue" : "text-ink-muted"}>{icon}</span>
      <span className="flex-1 truncate text-left">{label}</span>
      {badge && (
        <span className="rounded-full bg-paper px-1.5 py-0.5 font-mono text-[10px] text-ink-muted">
          {badge}
        </span>
      )}
    </button>
  );
}
