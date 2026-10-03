"use client";

import { useEffect, useState } from "react";
import { Wordmark, LinkButton } from "../primitives";
import { GithubIcon } from "../primitives/Icons";

const NAV = [
  { label: "Fitur", href: "#fitur" },
  { label: "Demo", href: "#demo" },
  { label: "Self-Host", href: "#self-host" },
  { label: "GitHub", href: "https://github.com", external: true },
  { label: "Dokumentasi", href: "#faq" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-weave-thread/60 bg-paper/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="shell flex h-16 items-center justify-between">
        <a href="#top" aria-label="Knweave — beranda">
          <Wordmark />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-surface hover:text-weave-blue"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LinkButton
            href="https://github.com"
            external
            variant="secondary"
            className="hidden px-4 py-2 sm:inline-flex"
            iconLeft={<GithubIcon className="h-4 w-4" />}
          >
            <span className="font-mono text-xs">★ 2.4k</span>
          </LinkButton>
          <LinkButton href="/app" variant="primary" className="px-4 py-2">
            Coba Demo
          </LinkButton>
        </div>
      </nav>
    </header>
  );
}
