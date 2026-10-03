"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  BoldIcon,
  CheckIcon,
  EyeIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  MarkdownIcon,
  PencilIcon,
  XIcon,
} from "../primitives/Icons";
import { MarkdownView } from "./MarkdownView";
import { useWikiStore } from "./useWikiStore";
import type { WikiPage } from "./types";

interface Props {
  page: WikiPage;
  onView: () => void;
}

type ToolKind =
  | "h1"
  | "h2"
  | "h3"
  | "bold"
  | "italic"
  | "list"
  | "code"
  | "codeblock"
  | "link";

const TOOLS: {
  kind: ToolKind;
  label: string;
  icon: React.ReactNode;
  title: string;
}[] = [
  { kind: "h1", label: "H1", icon: null, title: "Heading 1" },
  { kind: "h2", label: "H2", icon: null, title: "Heading 2" },
  { kind: "h3", label: "H3", icon: null, title: "Heading 3" },
  { kind: "bold", label: "", icon: <BoldIcon className="h-4 w-4" />, title: "Tebal" },
  { kind: "italic", label: "", icon: <ItalicIcon className="h-4 w-4" />, title: "Miring" },
  { kind: "list", label: "", icon: <ListIcon className="h-4 w-4" />, title: "Daftar" },
  { kind: "code", label: "", icon: <MarkdownIcon className="h-4 w-4" />, title: "Kode" },
  { kind: "codeblock", label: "</>", icon: null, title: "Blok kode" },
  { kind: "link", label: "", icon: <LinkIcon className="h-4 w-4" />, title: "Tautan" },
];

export function PageEditor({ page, onView }: Props) {
  const { dispatch } = useWikiStore();
  const [title, setTitle] = useState(page.title);
  const [content, setContent] = useState(page.content);
  const [icon, setIcon] = useState(page.icon ?? "");
  // "saving" briefly flips to true while a debounced save is pending,
  // then back to false (saved). Driven only by the autosave timer below.
  const [status, setStatus] = useState<"saved" | "saving">("saved");
  const taRef = useRef<HTMLTextAreaElement>(null);

  // debounced autosave — only side effect is writing to the store (an
  // external-ish sink via context) and flipping the status to "saved" once
  // the debounce fires. The "saving" flip happens in the change handlers.
  useEffect(() => {
    const t = setTimeout(() => {
      dispatch({
        type: "updateContent",
        pageId: page.id,
        content,
        title,
      });
      setStatus("saved");
    }, 600);
    return () => clearTimeout(t);
  }, [content, title, page.id, dispatch]);

  const onContent = (v: string) => {
    setStatus("saving");
    setContent(v);
  };
  const onTitle = (v: string) => {
    setStatus("saving");
    setTitle(v);
  };

  // persist icon immediately
  useEffect(() => {
    if ((icon || undefined) !== page.icon) {
      dispatch({ type: "setIcon", pageId: page.id, icon: icon || undefined });
    }
  }, [icon, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  /* -------- toolbar actions operate on the textarea selection -------- */
  const applyTool = useCallback(
    (kind: ToolKind) => {
      const ta = taRef.current;
      if (!ta) return;
      const { selectionStart: s, selectionEnd: e, value } = readTa(ta);

      const wrap = (before: string, after: string, placeholder: string) => {
        const selected = value.slice(s, e) || placeholder;
        const next = value.slice(0, s) + before + selected + after + value.slice(e);
        onContent(next);
        requestAnimationFrame(() => {
          ta.focus();
          const start = s + before.length;
          ta.setSelectionRange(start, start + selected.length);
        });
      };
      const prefixLine = (prefix: string) => {
        const lineStart = value.lastIndexOf("\n", s - 1) + 1;
        const next = value.slice(0, lineStart) + prefix + value.slice(lineStart);
        onContent(next);
        requestAnimationFrame(() => {
          ta.focus();
          ta.setSelectionRange(s + prefix.length, s + prefix.length);
        });
      };
      const insertText = (text: string) => {
        const next = value.slice(0, s) + text + value.slice(s);
        onContent(next);
        requestAnimationFrame(() => {
          ta.focus();
          const pos = s + text.length;
          ta.setSelectionRange(pos, pos);
        });
      };

      switch (kind) {
        case "h1":
          return prefixLine("# ");
        case "h2":
          return prefixLine("## ");
        case "h3":
          return prefixLine("### ");
        case "bold":
          return wrap("**", "**", "tebal");
        case "italic":
          return wrap("*", "*", "miring");
        case "list":
          return prefixLine("- ");
        case "code":
          return wrap("`", "`", "kode");
        case "codeblock":
          return insertText("\n```\nkode\n```\n");
        case "link":
          return wrap("[", "](https://)", "teks tautan");
      }
    },
    [],
  );

  return (
    <div className="flex h-full flex-col">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-weave-thread/70 bg-surface px-6 py-3 sm:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <input
            value={icon}
            onChange={(e) => setIcon(e.target.value.slice(0, 2))}
            placeholder="📄"
            className="w-10 rounded-md border border-transparent bg-paper px-1 py-1 text-center text-lg focus:border-weave-blue/40 focus:bg-surface focus:outline-none"
            aria-label="Ikon halaman"
          />
          <input
            value={title}
            onChange={(e) => onTitle(e.target.value)}
            placeholder="Judul halaman"
            className="min-w-0 flex-1 truncate border-none bg-transparent font-display text-xl font-semibold tracking-tight text-ink focus:outline-none"
            aria-label="Judul halaman"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 font-mono text-[11px] text-ink-muted sm:inline-flex">
            <CheckIcon
              className={`h-3.5 w-3.5 ${status === "saved" ? "text-emerald-500" : "text-ink-muted"}`}
            />
            {status === "saved" ? "Tersimpan otomatis" : "Menyimpan…"}
          </span>

          <div className="weave-segmented" role="group" aria-label="Mode">
            <button aria-pressed={true}>
              <PencilIcon className="h-3.5 w-3.5" /> Sunting
            </button>
            <button aria-pressed={false} onClick={onView}>
              <EyeIcon className="h-3.5 w-3.5" /> Lihat
            </button>
          </div>

          <button onClick={onView} className="btn-primary px-4 py-2 text-[13px]">
            Selesai
          </button>
        </div>
      </div>

      {/* toolbar */}
      <div className="flex items-center gap-0.5 border-b border-weave-thread/70 bg-surface px-4 py-1.5 sm:px-8">
        {TOOLS.map((t) => (
          <button
            key={t.kind}
            onClick={() => applyTool(t.kind)}
            title={t.title}
            aria-label={t.title}
            className="flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-[13px] font-semibold text-ink-soft transition-colors hover:bg-paper hover:text-weave-blue"
          >
            {t.icon ?? t.label}
          </button>
        ))}
        <div className="ml-auto hidden font-mono text-[11px] text-ink-muted sm:block">
          Markdown
        </div>
      </div>

      {/* split editor / preview */}
      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-2">
        <div className="flex min-h-0 flex-col border-r border-weave-thread/70 bg-surface">
          <div className="border-b border-weave-thread/60 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted sm:px-8">
            Editor
          </div>
          <textarea
            ref={taRef}
            value={content}
            onChange={(e) => onContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                onView();
              }
              if (e.key === "Tab") {
                e.preventDefault();
                const ta = e.currentTarget;
                const { selectionStart: ss, value: val } = readTa(ta);
                const next = val.slice(0, ss) + "  " + val.slice(ss);
                onContent(next);
                requestAnimationFrame(() => {
                  ta.focus();
                  const pos = ss + 2;
                  ta.setSelectionRange(pos, pos);
                });
              }
            }}
            spellCheck={false}
            placeholder="Tulis dalam markdown…"
            className="min-h-0 flex-1 resize-none bg-surface px-4 py-4 font-mono text-[13px] leading-relaxed text-ink focus:outline-none sm:px-8"
          />
        </div>

        <div className="flex min-h-0 flex-col bg-paper">
          <div className="border-b border-weave-thread/60 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted sm:px-8">
            Pratinjau
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            {content.trim() === "" ? (
              <div className="flex h-full items-center justify-center px-6 text-center text-sm text-ink-muted">
                Pratinjau akan muncul di sini.
              </div>
            ) : (
              <article className="mx-auto max-w-prose px-4 py-6 sm:px-8">
                <MarkdownView source={content} />
              </article>
            )}
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="flex items-center justify-between border-t border-weave-thread/70 bg-surface px-4 py-2 sm:px-8">
        <button
          onClick={onView}
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-ink-muted hover:bg-paper hover:text-ink"
        >
          <XIcon className="h-3.5 w-3.5" />
          Batal
        </button>
        <span className="font-mono text-[11px] text-ink-muted">
          Esc untuk keluar · Tab untuk indent
        </span>
      </div>
    </div>
  );
}

/** read fresh selection off a textarea (in case React state lagged) */
function readTa(ta: HTMLTextAreaElement) {
  return {
    selectionStart: ta.selectionStart,
    selectionEnd: ta.selectionEnd,
    value: ta.value,
  };
}
