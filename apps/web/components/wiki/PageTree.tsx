"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, PlusIcon } from "../primitives/Icons";
import { childrenOf, useWikiStore } from "./useWikiStore";
import type { WikiPage, WikiState } from "./types";

export function PageTree() {
  const { state } = useWikiStore();

  return (
    <nav className="flex flex-col gap-0.5" aria-label="Pohon halaman">
      {state.sections.map((section) => (
        <Section
          key={section.id}
          state={state}
          sectionId={section.id}
          title={section.title}
          expanded={section.expanded}
        />
      ))}
    </nav>
  );
}

function Section({
  state,
  sectionId,
  title,
  expanded,
}: {
  state: WikiState;
  sectionId: string;
  title: string;
  expanded: boolean;
}) {
  const { dispatch } = useWikiStore();
  const roots = childrenOf(state, sectionId, null);

  return (
    <div>
      <div className="group flex items-center gap-1">
        <button
          onClick={() => dispatch({ type: "toggleSection", sectionId })}
          className="flex flex-1 items-center gap-1 rounded-md px-1.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-ink"
          aria-expanded={expanded}
        >
          {expanded ? (
            <ChevronDown className="h-3.5 w-3.5" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5" />
          )}
          {title}
        </button>
        <button
          onClick={() => dispatch({ type: "add", sectionId, parentId: null })}
          className="rounded p-1 text-ink-muted opacity-0 transition-opacity hover:bg-paper hover:text-weave-blue group-hover:opacity-100"
          aria-label={`Tambah halaman di ${title}`}
          title="Tambah halaman"
        >
          <PlusIcon className="h-3.5 w-3.5" />
        </button>
      </div>

      {expanded && (
        <ul className="mt-0.5 flex flex-col">
          {roots.length === 0 && (
            <li className="px-2 py-1 text-xs italic text-ink-muted/70">
              Belum ada halaman
            </li>
          )}
          {roots.map((page) => (
            <TreeNode key={page.id} page={page} depth={0} />
          ))}
        </ul>
      )}
    </div>
  );
}

function TreeNode({ page, depth }: { page: WikiPage; depth: number }) {
  const { state, dispatch } = useWikiStore();
  const isActive = state.activePageId === page.id;
  const kids = childrenOf(state, page.sectionId, page.id);
  const [expanded, setExpanded] = useState(true);
  const padLeft = 8 + depth * 14;

  return (
    <li>
      <div
        className={`group relative flex items-center rounded-md transition-colors ${
          isActive ? "bg-weave-blueTint" : "hover:bg-paper"
        }`}
      >
        {isActive && (
          <span className="absolute left-0 top-1/2 h-5 w-[2.5px] -translate-y-1/2 rounded-full bg-weave-blue" />
        )}

        {kids.length > 0 ? (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex h-7 w-5 shrink-0 items-center justify-center text-ink-muted hover:text-ink"
            style={{ marginLeft: Math.max(0, padLeft - 4) }}
            aria-label={expanded ? "Lipat" : "Bentangkan"}
          >
            {expanded ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" />
            )}
          </button>
        ) : (
          <span style={{ width: padLeft + 8 }} aria-hidden />
        )}

        <button
          onClick={() => dispatch({ type: "setActive", pageId: page.id })}
          className={`flex flex-1 items-center gap-1.5 truncate py-1.5 pr-2 text-left text-[13px] ${
            isActive ? "font-semibold text-weave-blueInk" : "font-medium text-ink-soft"
          }`}
        >
          {page.icon && <span aria-hidden>{page.icon}</span>}
          <span className="truncate">{page.title}</span>
          {page.starred && <span className="text-[10px] text-amber-500">★</span>}
        </button>

        <button
          onClick={() =>
            dispatch({ type: "add", sectionId: page.sectionId, parentId: page.id })
          }
          className="mr-1 rounded p-1 text-ink-muted opacity-0 transition-opacity hover:bg-surface hover:text-weave-blue group-hover:opacity-100"
          aria-label={`Tambah sub-halaman di ${page.title}`}
          title="Tambah sub-halaman"
        >
          <PlusIcon className="h-3 w-3" />
        </button>
      </div>

      {expanded && kids.length > 0 && (
        <ul className="flex flex-col">
          {kids.map((kid) => (
            <TreeNode key={kid.id} page={kid} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}
