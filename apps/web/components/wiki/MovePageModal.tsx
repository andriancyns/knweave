"use client";

import { useEffect, useState } from "react";
import { FolderIcon, XIcon } from "../primitives/Icons";
import { useWikiStore } from "./useWikiStore";
import type { WikiPage } from "./types";

/** Flatten all valid move destinations (sections + pages except self/descendants). */
function buildDestinations(
  state: ReturnType<typeof useWikiStore>["state"],
  pageId: string,
) {
  // gather descendant ids to exclude
  const blocked = new Set<string>([pageId]);
  const queue = [pageId];
  while (queue.length) {
    const id = queue.pop()!;
    for (const p of Object.values(state.pages)) {
      if (p.parentId === id && !blocked.has(p.id)) {
        blocked.add(p.id);
        queue.push(p.id);
      }
    }
  }

  type Dest = { sectionId: string; parentId: string | null; label: string; depth: number };
  const dests: Dest[] = [];

  for (const s of state.sections) {
    dests.push({ sectionId: s.id, parentId: null, label: s.title, depth: 0 });
    const walk = (parentId: string, depth: number, prefix: string) => {
      const kids = Object.values(state.pages)
        .filter((p) => p.sectionId === s.id && p.parentId === parentId)
        .sort((a, b) => a.title.localeCompare(b.title, "id"));
      for (const k of kids) {
        if (blocked.has(k.id)) continue;
        dests.push({
          sectionId: s.id,
          parentId: k.id,
          label: `${prefix}${k.title}`,
          depth,
        });
        walk(k.id, depth + 1, prefix + "— ");
      }
    };
    walk("", 1, "");
  }
  return dests;
}

export function MovePageModal({
  page,
  onClose,
}: {
  page: WikiPage;
  onClose: () => void;
}) {
  const store = useWikiStore();
  const { dispatch } = store;
  const dests = buildDestinations(store.state, page.id);
  const [selected, setSelected] = useState(
    `${page.sectionId}|${page.parentId ?? ""}`,
  );

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  const confirm = () => {
    const [sectionId, parentId] = selected.split("|");
    dispatch({
      type: "move",
      pageId: page.id,
      sectionId,
      parentId: parentId || null,
    });
    onClose();
  };

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
          <h3 className="font-display text-base font-semibold text-ink">
            Pindahkan “{page.title}”
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-ink-muted hover:bg-paper hover:text-ink"
            aria-label="Tutup"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {dests.map((d) => {
            const value = `${d.sectionId}|${d.parentId ?? ""}`;
            const active = value === selected;
            return (
              <button
                key={value + d.label}
                onClick={() => setSelected(value)}
                className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors ${
                  active ? "bg-weave-blueTint text-weave-blueInk" : "hover:bg-paper"
                }`}
                style={{ paddingLeft: 10 + d.depth * 14 }}
              >
                <FolderIcon
                  className={`h-4 w-4 ${active ? "text-weave-blue" : "text-ink-muted"}`}
                />
                <span className={d.depth === 0 ? "font-semibold" : ""}>{d.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex justify-end gap-2 border-t border-weave-thread/70 px-4 py-3">
          <button
            onClick={onClose}
            className="btn-ghost px-4 py-2 text-[13px]"
          >
            Batal
          </button>
          <button onClick={confirm} className="btn-primary px-4 py-2 text-[13px]">
            Pindahkan
          </button>
        </div>
      </div>
    </div>
  );
}
