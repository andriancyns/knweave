"use client";

import { useEffect, useState } from "react";

interface Handlers {
  onFocusSearch: () => void;
  onToggleEdit: () => void;
  onExit: () => void;
  onHome: () => void;
  isEditing: boolean;
}

/**
 * Global keyboard shortcuts for the wiki app. Registers a single keydown
 * listener and a `?` help modal toggle. Returns the help-modal open state.
 */
export function useKeyboard(h: Handlers) {
  const [helpOpen, setHelpOpen] = useState(false);
  const [gPressed, setGPressed] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        !!target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      // ⌘/Ctrl + K → focus search (always)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        h.onFocusSearch();
        return;
      }

      // ⌘/Ctrl + E → toggle edit (always)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "e") {
        e.preventDefault();
        h.onToggleEdit();
        return;
      }

      // Escape → exit / close
      if (e.key === "Escape") {
        if (helpOpen) {
          setHelpOpen(false);
          return;
        }
        h.onExit();
        return;
      }

      if (typing) return;

      // ? → help
      if (e.key === "?") {
        e.preventDefault();
        setHelpOpen((v) => !v);
        return;
      }

      // g then h → home
      if (e.key.toLowerCase() === "g") {
        setGPressed(true);
        setTimeout(() => setGPressed(false), 800);
        return;
      }
      if (gPressed && e.key.toLowerCase() === "h") {
        setGPressed(false);
        h.onHome();
        return;
      }

      // e → edit (when not typing and not editing)
      if (e.key.toLowerCase() === "e" && !h.isEditing) {
        e.preventDefault();
        h.onToggleEdit();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [h, helpOpen, gPressed]);

  return { helpOpen, setHelpOpen };
}

export const SHORTCUTS: { keys: string[]; label: string }[] = [
  { keys: ["⌘", "K"], label: "Cari halaman" },
  { keys: ["⌘", "E"], label: "Beralih Lihat / Sunting" },
  { keys: ["E"], label: "Mulai menyunting" },
  { keys: ["Esc"], label: "Keluar / tutup" },
  { keys: ["G", "H"], label: "Beranda Tim" },
  { keys: ["?"], label: "Pintasan ini" },
];
