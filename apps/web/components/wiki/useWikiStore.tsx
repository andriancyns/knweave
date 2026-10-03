"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { SEED } from "./seedData";
import type { Visibility, WikiPage, WikiState } from "./types";

const STORAGE_KEY = "knweave.wiki.v1";
export const CURRENT_USER = "Kamu";

/* ---------------------------------------------------------------- actions */
type Action =
  | { type: "hydrate"; state: WikiState }
  | { type: "setActive"; pageId: string }
  | { type: "updateContent"; pageId: string; content: string; title?: string }
  | { type: "toggleStar"; pageId: string }
  | { type: "setVisibility"; pageId: string; visibility: Visibility }
  | { type: "move"; pageId: string; sectionId: string; parentId: string | null }
  | { type: "add"; sectionId: string; parentId?: string | null }
  | { type: "delete"; pageId: string }
  | { type: "toggleSection"; sectionId: string }
  | { type: "setIcon"; pageId: string; icon: string | undefined };

function nowISO() {
  return new Date().toISOString();
}

function newId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function touch(state: WikiState, pageId: string, summary: string): WikiState {
  const page = state.pages[pageId];
  if (!page) return state;
  return {
    ...state,
    pages: {
      ...state.pages,
      [pageId]: { ...page, updatedAt: nowISO(), updatedBy: CURRENT_USER },
    },
    history: [
      { pageId, at: nowISO(), by: CURRENT_USER, summary },
      ...state.history,
    ].slice(0, 40),
  };
}

function reducer(state: WikiState, action: Action): WikiState {
  switch (action.type) {
    case "hydrate":
      return action.state;

    case "setActive":
      return { ...state, activePageId: action.pageId };

    case "updateContent": {
      const page = state.pages[action.pageId];
      if (!page) return state;
      const next: WikiPage = {
        ...page,
        content: action.content,
        title: action.title?.trim() ? action.title.trim() : page.title,
      };
      return touch(
        {
          ...state,
          pages: { ...state.pages, [action.pageId]: next },
        },
        action.pageId,
        "Menyunting halaman",
      );
    }

    case "toggleStar": {
      const page = state.pages[action.pageId];
      if (!page) return state;
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.pageId]: { ...page, starred: !page.starred },
        },
      };
    }

    case "setVisibility": {
      const page = state.pages[action.pageId];
      if (!page) return state;
      return touch(
        {
          ...state,
          pages: {
            ...state.pages,
            [action.pageId]: { ...page, visibility: action.visibility },
          },
        },
        action.pageId,
        `Visibilitas diubah ke ${action.visibility}`,
      );
    }

    case "move": {
      const page = state.pages[action.pageId];
      if (!page) return state;
      // prevent moving a page into itself / its own descendant
      if (action.parentId) {
        let cursor: string | null = action.parentId;
        while (cursor) {
          if (cursor === action.pageId) return state;
          cursor = state.pages[cursor]?.parentId ?? null;
        }
      }
      return touch(
        {
          ...state,
          pages: {
            ...state.pages,
            [action.pageId]: {
              ...page,
              sectionId: action.sectionId,
              parentId: action.parentId,
            },
          },
        },
        action.pageId,
        "Memindahkan halaman",
      );
    }

    case "add": {
      const id = newId("page");
      const page: WikiPage = {
        id,
        title: "Halaman Baru",
        parentId: action.parentId ?? null,
        sectionId: action.sectionId,
        content: "",
        visibility: "tim",
        starred: false,
        tags: [],
        updatedAt: nowISO(),
        updatedBy: CURRENT_USER,
      };
      return {
        ...state,
        pages: { ...state.pages, [id]: page },
        sections: state.sections.map((s) =>
          s.id === action.sectionId ? { ...s, expanded: true } : s,
        ),
        activePageId: id,
      };
    }

    case "delete": {
      if (!state.pages[action.pageId]) return state;
      // collect descendants
      const toRemove = new Set<string>();
      const queue = [action.pageId];
      while (queue.length) {
        const id = queue.pop()!;
        toRemove.add(id);
        for (const p of Object.values(state.pages)) {
          if (p.parentId === id) queue.push(p.id);
        }
      }
      const pages: Record<string, WikiPage> = {};
      for (const [id, p] of Object.entries(state.pages)) {
        if (!toRemove.has(id)) pages[id] = p;
      }
      const remaining = Object.keys(pages);
      const activePageId =
        toRemove.has(state.activePageId)
          ? remaining[0] ?? ""
          : state.activePageId;
      return { ...state, pages, activePageId };
    }

    case "toggleSection":
      return {
        ...state,
        sections: state.sections.map((s) =>
          s.id === action.sectionId ? { ...s, expanded: !s.expanded } : s,
        ),
      };

    case "setIcon": {
      const page = state.pages[action.pageId];
      if (!page) return state;
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.pageId]: { ...page, icon: action.icon },
        },
      };
    }

    default:
      return state;
  }
}

/* ---------------------------------------------------------------- context */
interface StoreCtx {
  state: WikiState;
  ready: boolean;
  dispatch: React.Dispatch<Action>;
  currentUser: string;
}

const Ctx = createContext<StoreCtx | null>(null);

/* Lazy initialiser: hydrate from localStorage before first render so there
   is no flash and no setState-in-effect. Falls back to SEED. */
function init(): WikiState {
  if (typeof window === "undefined") return SEED;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as WikiState;
      if (parsed?.pages && parsed?.sections) return parsed;
    }
  } catch {
    /* ignore malformed storage */
  }
  return SEED;
}

export function WikiStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, init);

  // persist on every change. init() already hydrated from localStorage
  // before first render, so we can write immediately on each update.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage full / unavailable */
    }
  }, [state]);

  const value = useMemo<StoreCtx>(
    () => ({ state, ready: true, dispatch, currentUser: CURRENT_USER }),
    [state],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/* SSR-safe readiness flag: on the client we're always ready after mount, on
   the server we report not-ready so the UI can avoid rendering stale state. */
function emptySubscribe() {
  return () => {};
}
export function useWikiReady() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function useWikiStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWikiStore must be used within WikiStoreProvider");
  return ctx;
}

/* ----------------------------------------------------------- selectors */
/** direct children of a parent (or section root when parentId === null) */
export function childrenOf(
  state: WikiState,
  sectionId: string,
  parentId: string | null,
) {
  return Object.values(state.pages)
    .filter((p) => p.sectionId === sectionId && p.parentId === parentId)
    .sort((a, b) => a.title.localeCompare(b.title, "id"));
}

export function pageBreadcrumb(state: WikiState, pageId: string): WikiPage[] {
  const chain: WikiPage[] = [];
  const guard = new Set<string>();
  let currentId: string | undefined = pageId;
  while (currentId && !guard.has(currentId)) {
    guard.add(currentId);
    const p: WikiPage | undefined = state.pages[currentId];
    if (!p) break;
    chain.unshift(p);
    currentId = p.parentId ?? undefined;
  }
  return chain;
}

export function sectionTitle(state: WikiState, sectionId: string): string {
  return state.sections.find((s) => s.id === sectionId)?.title ?? "—";
}

/** stable hook wrapper so components can read the active page safely */
export function useActivePage(): WikiPage | undefined {
  const { state } = useWikiStore();
  return state.pages[state.activePageId];
}

export function useResetWiki() {
  const { dispatch } = useWikiStore();
  return useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    dispatch({ type: "hydrate", state: SEED });
  }, [dispatch]);
}
