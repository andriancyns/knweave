"use client";

import Link from "next/link";
import { type RefObject } from "react";
import { LogoMark } from "../primitives/LogoMark";
import { BellIcon, ChevronDown, CommandIcon, SearchIcon } from "../primitives/Icons";

interface TopBarProps {
  query: string;
  onQuery: (q: string) => void;
  /** parent owns a ref so the keyboard handler can focus search */
  searchInputRef: RefObject<HTMLInputElement | null>;
}

export function TopBar({ query, onQuery, searchInputRef }: TopBarProps) {
  const focusSearch = () => {
    searchInputRef.current?.focus();
    searchInputRef.current?.select();
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-weave-thread/70 bg-surface/85 px-4 backdrop-blur-md">
      {/* logo + workspace */}
      <Link href="/" className="group flex shrink-0 items-center gap-2.5">
        <LogoMark className="h-7 w-7" />
        <span className="hidden font-display text-[15px] font-semibold tracking-tight text-ink sm:inline">
          Knweave
        </span>
      </Link>

      <div className="hidden h-5 w-px bg-weave-thread sm:block" />

      <button className="hidden items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-medium text-ink-soft transition-colors hover:bg-paper md:inline-flex">
        Tim Knweave
        <ChevronDown className="h-3.5 w-3.5 text-ink-muted" />
      </button>

      {/* search */}
      <div className="relative mx-auto w-full max-w-md">
        <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
        <input
          ref={searchInputRef}
          type="text"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Cari halaman…"
          className="weave-input"
          aria-label="Cari halaman"
        />
        <button
          onClick={focusSearch}
          className="absolute right-2.5 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 sm:inline-flex"
          aria-label="Pintasan cari"
          title="Tekan ⌘K"
        >
          <kbd className="kbd inline-flex items-center gap-0.5">
            <CommandIcon className="h-3 w-3" />K
          </kbd>
        </button>
      </div>

      {/* right actions */}
      <div className="flex shrink-0 items-center gap-1">
        <button
          className="relative rounded-full p-2 text-ink-soft transition-colors hover:bg-paper hover:text-ink"
          aria-label="Notifikasi"
          title="Notifikasi"
        >
          <BellIcon className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-weave-blue ring-2 ring-surface" />
        </button>

        <button
          className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-weave-blue to-weave-blueInk text-xs font-semibold text-white ring-2 ring-surface"
          aria-label="Profil"
          title="Kamu"
        >
          KA
        </button>
      </div>
    </header>
  );
}
