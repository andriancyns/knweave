"use client";

import { useCallback, useRef, useState } from "react";
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";
import { PageView } from "./PageView";
import { PageEditor } from "./PageEditor";
import { SearchResults } from "./SearchResults";
import { SHORTCUTS, useKeyboard } from "./useKeyboard";
import { useActivePage, useWikiReady, useWikiStore } from "./useWikiStore";
import { XIcon } from "../primitives/Icons";

type View = "tree" | "home" | "starred";

export function WikiApp() {
  useWikiStore(); // establish context
  const ready = useWikiReady();
  const active = useActivePage();

  const [query, setQuery] = useState("");
  const [view, setView] = useState<View>("tree");
  // editing is scoped to a specific page id, so switching pages naturally
  // exits edit mode without a setState-in-effect.
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searching = query.trim().length > 0;
  const editing = !!active && editingPageId === active.id;

  const startEdit = useCallback(() => {
    if (active) setEditingPageId(active.id);
  }, [active]);
  const stopEdit = useCallback(() => setEditingPageId(null), []);
  const onToggleEdit = useCallback(() => {
    if (!active) return;
    if (searching) {
      setQuery("");
      return;
    }
    setEditingPageId((cur) => (cur === active.id ? null : active.id));
  }, [active, searching]);

  const onFocusSearch = useCallback(() => {
    searchInputRef.current?.focus();
    searchInputRef.current?.select();
  }, []);
  const onExit = useCallback(() => {
    if (searching) setQuery("");
    else stopEdit();
  }, [searching, stopEdit]);
  const onHome = useCallback(() => {
    setQuery("");
    stopEdit();
    setView("home");
  }, [stopEdit]);

  const { helpOpen, setHelpOpen } = useKeyboard({
    onFocusSearch,
    onToggleEdit,
    onExit,
    onHome,
    isEditing: editing,
  });

  const showSearch = searching;

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-paper">
      <TopBar
        query={query}
        onQuery={setQuery}
        searchInputRef={searchInputRef}
      />

      <div className="flex min-h-0 flex-1">
        <Sidebar
          view={view}
          onView={(v) => {
            setView(v);
            setQuery("");
            stopEdit();
          }}
        />

        <main className="relative min-w-0 flex-1">
          {!ready ? (
            <div className="flex h-full items-center justify-center text-sm text-ink-muted">
              Memuat…
            </div>
          ) : showSearch ? (
            <SearchResults query={query} onQuery={setQuery} />
          ) : view === "home" ? (
            <HomeView onOpenPage={() => setView("tree")} />
          ) : view === "starred" ? (
            <StarredView onOpenPage={() => setView("tree")} />
          ) : !active ? (
            <NoPageView />
          ) : editing ? (
            <PageEditor key={active.id} page={active} onView={stopEdit} />
          ) : (
            <PageView key={active.id} page={active} onEdit={startEdit} />
          )}
        </main>
      </div>

      {/* shortcuts help button */}
      <button
        onClick={() => setHelpOpen(true)}
        className="fixed bottom-4 right-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-weave-thread bg-surface text-ink-muted shadow-[0_4px_14px_-4px_rgba(17,24,39,0.18)] transition-colors hover:text-weave-blue"
        aria-label="Pintasan keyboard"
        title="Pintasan keyboard"
      >
        ?
      </button>

      {helpOpen && <ShortcutsHelp onClose={() => setHelpOpen(false)} />}
    </div>
  );
}

/* ----------------------------------------------------------- home view */
function HomeView({ onOpenPage }: { onOpenPage: () => void }) {
  const { state, dispatch } = useWikiStore();
  const recent = [...state.history]
    .map((h) => ({ h, p: state.pages[h.pageId] }))
    .filter((x) => x.p)
    .filter((x, i, arr) => arr.findIndex((y) => y.p.id === x.p.id) === i)
    .slice(0, 6);

  const starred = Object.values(state.pages).filter((p) => p.starred);

  return (
    <div className="h-full overflow-y-auto bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-10 sm:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-weave-blue">
          Beranda Tim
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">
          Selamat datang kembali 👋
        </h1>
        <p className="mt-2 text-ink-muted">
          Lanjutkan dari tempat terakhir, atau buka halaman berbintang.
        </p>

        <section className="mt-8">
          <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
            Baru saja diubah
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {recent.map(({ h, p }) => (
              <button
                key={h.at + p.id}
                onClick={() => {
                  dispatch({ type: "setActive", pageId: p.id });
                  onOpenPage();
                }}
                className="group flex items-start gap-3 rounded-xl border border-weave-thread bg-surface p-4 text-left transition-all hover:-translate-y-0.5 hover:border-weave-blue/40"
              >
                <span className="text-xl" aria-hidden>{p.icon ?? "📄"}</span>
                <span className="min-w-0">
                  <span className="block truncate font-medium text-ink group-hover:text-weave-blue">
                    {p.title}
                  </span>
                  <span className="block text-[11px] text-ink-muted">
                    {h.summary} · {h.by}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
            Berbintang
          </h2>
          {starred.length === 0 ? (
            <p className="rounded-xl border border-dashed border-weave-thread bg-surface px-4 py-6 text-center text-sm text-ink-muted">
              Belum ada halaman berbintang.
            </p>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              {starred.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    dispatch({ type: "setActive", pageId: p.id });
                    onOpenPage();
                  }}
                  className="group flex items-center gap-2 rounded-lg border border-weave-thread bg-surface px-3 py-2.5 text-left text-[13px] transition-colors hover:border-weave-blue/40"
                >
                  <span aria-hidden>{p.icon ?? "📄"}</span>
                  <span className="truncate text-ink group-hover:text-weave-blue">
                    {p.title}
                  </span>
                  <span className="ml-auto text-amber-500">★</span>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

/* ------------------------------------------------------- starred view */
function StarredView({ onOpenPage }: { onOpenPage: () => void }) {
  const { state, dispatch } = useWikiStore();
  const starred = Object.values(state.pages).filter((p) => p.starred);

  return (
    <div className="h-full overflow-y-auto bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-10 sm:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-weave-blue">
          Dokumen Penting
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">
          Halaman Berbintang
        </h1>

        {starred.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-weave-thread bg-surface px-6 py-12 text-center">
            <p className="text-3xl">⭐</p>
            <p className="mt-3 text-sm text-ink-muted">
              Beri bintang pada halaman agar muncul di sini.
            </p>
          </div>
        ) : (
          <ul className="mt-6 flex flex-col gap-2">
            {starred.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => {
                    dispatch({ type: "setActive", pageId: p.id });
                    onOpenPage();
                  }}
                  className="group flex w-full items-center gap-3 rounded-xl border border-weave-thread bg-surface px-4 py-3 text-left transition-all hover:-translate-y-0.5 hover:border-weave-blue/40"
                >
                  <span className="text-xl" aria-hidden>{p.icon ?? "📄"}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium text-ink group-hover:text-weave-blue">
                      {p.title}
                    </span>
                    <span className="block text-[11px] text-ink-muted">
                      Diperbarui oleh {p.updatedBy}
                    </span>
                  </span>
                  <span className="text-amber-500">★</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------- no page */
function NoPageView() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-weave-thread bg-surface text-3xl">
        🧵
      </div>
      <h2 className="mt-4 font-display text-lg font-semibold text-ink">
        Pilih halaman dari pohon
      </h2>
      <p className="mt-1 text-sm text-ink-muted">
        atau tekan <kbd className="kbd">⌘K</kbd> untuk mencari.
      </p>
    </div>
  );
}

/* ------------------------------------------------------- shortcuts help */
function ShortcutsHelp({ onClose }: { onClose: () => void }) {
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
            Pintasan Keyboard
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-ink-muted hover:bg-paper hover:text-ink"
            aria-label="Tutup"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
        <ul className="flex flex-col p-2">
          {SHORTCUTS.map((s) => (
            <li
              key={s.label}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-paper"
            >
              <span className="text-[13px] text-ink-soft">{s.label}</span>
              <span className="flex items-center gap-1">
                {s.keys.map((k, i) => (
                  <kbd key={i} className="kbd">
                    {k}
                  </kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
