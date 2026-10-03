"use client";

import { useMemo, useState } from "react";
import { FileIcon, SearchIcon, XIcon } from "../primitives/Icons";
import { plainTextSnippet } from "./MarkdownView";
import { sectionTitle, useWikiStore } from "./useWikiStore";
import { VISIBILITY_LABELS } from "./types";

interface Props {
  query: string;
  onQuery: (q: string) => void;
}

export function SearchResults({ query, onQuery }: Props) {
  const { state, dispatch } = useWikiStore();
  const [sectionFilter, setSectionFilter] = useState<string | null>(null);
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  const q = query.trim().toLowerCase();

  const allTags = useMemo(() => {
    const set = new Set<string>();
    Object.values(state.pages).forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [state.pages]);

  const results = useMemo(() => {
    if (!q) return [];
    return Object.values(state.pages)
      .filter((p) => (sectionFilter ? p.sectionId === sectionFilter : true))
      .filter((p) => (tagFilter ? p.tags.includes(tagFilter) : true))
      .map((p) => {
        const inTitle = p.title.toLowerCase().includes(q);
        const inBody = p.content.toLowerCase().includes(q);
        const inTags = p.tags.some((t) => t.toLowerCase().includes(q));
        const score =
          (inTitle ? 3 : 0) + (inTags ? 2 : 0) + (inBody ? 1 : 0);
        return { page: p, score, hit: inTitle || inBody || inTags };
      })
      .filter((r) => r.hit)
      .sort((a, b) => b.score - a.score);
  }, [q, state.pages, sectionFilter, tagFilter]);

  return (
    <div className="flex h-full flex-col bg-paper">
      {/* search header */}
      <div className="border-b border-weave-thread/70 bg-surface px-6 py-5 sm:px-10">
        <div className="flex items-center gap-3">
          <SearchIcon className="h-5 w-5 text-ink-muted" />
          <input
            autoFocus
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Cari halaman…"
            className="flex-1 border-none bg-transparent font-display text-xl font-semibold tracking-tight text-ink placeholder:text-ink-muted/60 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => onQuery("")}
              className="rounded-lg p-1.5 text-ink-muted hover:bg-paper hover:text-ink"
              aria-label="Hapus pencarian"
            >
              <XIcon className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* filters */}
        {q && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
              Bagian
            </span>
            {state.sections.map((s) => (
              <button
                key={s.id}
                aria-pressed={sectionFilter === s.id}
                onClick={() =>
                  setSectionFilter((cur) => (cur === s.id ? null : s.id))
                }
                className="weave-chip"
              >
                {s.title}
              </button>
            ))}
            {allTags.length > 0 && (
              <>
                <span className="ml-3 mr-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                  Tag
                </span>
                {allTags.map((t) => (
                  <button
                    key={t}
                    aria-pressed={tagFilter === t}
                    onClick={() => setTagFilter((cur) => (cur === t ? null : t))}
                    className="weave-chip"
                  >
                    #{t}
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* results list */}
      <div className="flex-1 overflow-y-auto">
        {!q ? (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center text-ink-muted">
            <SearchIcon className="h-8 w-8 text-weave-thread" />
            <p className="mt-3 text-sm">Ketik untuk mencari di semua halaman.</p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center text-ink-muted">
            <FileIcon className="h-8 w-8 text-weave-thread" />
            <p className="mt-3 text-sm">
              Tidak ada hasil untuk “<span className="text-ink">{query}</span>”.
            </p>
          </div>
        ) : (
          <ul className="mx-auto max-w-3xl px-4 py-4 sm:px-10">
            <li className="mb-3 px-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
              {results.length} hasil
            </li>
            {results.map(({ page }) => (
              <li key={page.id}>
                <button
                  onClick={() => dispatch({ type: "setActive", pageId: page.id })}
                  className="group w-full rounded-xl border border-transparent px-4 py-3 text-left transition-all hover:border-weave-thread hover:bg-surface"
                >
                  <div className="flex items-center gap-2">
                    <span aria-hidden>{page.icon ?? "📄"}</span>
                    <span className="font-display text-[15px] font-semibold text-ink group-hover:text-weave-blue">
                      <Highlight text={page.title} q={q} />
                    </span>
                    <span className="ml-auto rounded-full border border-weave-thread bg-paper px-2 py-0.5 font-mono text-[10px] text-ink-muted">
                      {VISIBILITY_LABELS[page.visibility]}
                    </span>
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-ink-muted">
                    {sectionTitle(state, page.sectionId)}
                    {page.parentId && state.pages[page.parentId]
                      ? ` › ${state.pages[page.parentId].title}`
                      : ""}
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">
                    <Highlight text={plainTextSnippet(page.content, 140)} q={q} />
                  </p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/** case-insensitive highlight of the query within text */
function Highlight({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>;
  const lower = text.toLowerCase();
  const needle = q.toLowerCase();
  const out: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  while (i < text.length) {
    const idx = lower.indexOf(needle, i);
    if (idx === -1) {
      out.push(<span key={key++}>{text.slice(i)}</span>);
      break;
    }
    if (idx > i) out.push(<span key={key++}>{text.slice(i, idx)}</span>);
    out.push(
      <mark
        key={key++}
        className="rounded bg-weave-blueTint px-0.5 text-weave-blueInk"
      >
        {text.slice(idx, idx + needle.length)}
      </mark>,
    );
    i = idx + needle.length;
  }
  return <>{out}</>;
}
