"use client";

import { useState } from "react";
import { SectionShell, Eyebrow, Badge, LinkButton } from "../primitives";
import { CopyIcon, CheckIcon, BoxIcon, TerminalIcon } from "../primitives/Icons";

const COMPOSE = `# knweave — docker-compose.yml
services:
  knweave:
    image: ghcr.io/knweave/knweave:latest
    ports:
      - "3000:3000"
    volumes:
      - knweave-data:/data
    environment:
      - KNWEAVE_SECRET=ubah-saya
    restart: unless-stopped

volumes:
  knweave-data:`;

export function SelfHost() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(COMPOSE);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard may be unavailable */
    }
  };

  return (
    <SectionShell id="self-host">
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        {/* left: copy */}
        <div className="reveal">
          <Eyebrow>Self-Host Mudah</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink text-balance sm:text-4xl">
            Satu container, jalan dalam{" "}
            <span className="text-weave-blue">satu menit</span>.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Tidak perlu Kubernetes, tidak perlu database eksternal, tidak perlu
            konsultan. Cukup satu file <span className="font-mono text-sm text-ink">docker-compose</span>{" "}
            dan Knweave berjalan di mesinmu sendiri.
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            <Badge tone="blue">
              <BoxIcon className="h-3.5 w-3.5" /> 1 container
            </Badge>
            <Badge tone="gray">&lt; 256 MB RAM</Badge>
            <Badge tone="gray">tanpa DB eksternal</Badge>
            <Badge tone="gray">data tersimpan lokal</Badge>
            <Badge tone="gray">~15 MB image</Badge>
          </div>

          {/* terminal one-liner */}
          <div className="mt-7 flex items-center gap-3 rounded-xl border border-weave-thread bg-ink px-4 py-3 font-mono text-sm">
            <TerminalIcon className="h-4 w-4 flex-none text-emerald-400" />
            <code className="flex-1 truncate text-paper">
              <span className="text-weave-blueSoft">$</span> docker compose up -d
            </code>
          </div>

          <div className="mt-6">
            <LinkButton href="#faq" variant="ghost" className="px-0">
              Butuh panduan langkah-demi-langkah? →
            </LinkButton>
          </div>
        </div>

        {/* right: code block */}
        <div className="reveal" style={{ ["--reveal-delay" as string]: "120ms" }}>
          <div className="card overflow-hidden">
            {/* window chrome */}
            <div className="flex items-center justify-between border-b border-weave-thread/70 bg-paper px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#F87171]" />
                <span className="h-3 w-3 rounded-full bg-[#FBBF24]" />
                <span className="h-3 w-3 rounded-full bg-[#34D399]" />
                <span className="ml-3 font-mono text-xs text-ink-muted">
                  docker-compose.yml
                </span>
              </div>
              <button
                onClick={copy}
                className="inline-flex items-center gap-1.5 rounded-md border border-weave-thread bg-surface px-2.5 py-1 font-mono text-[11px] text-ink-soft transition-colors hover:border-weave-blue hover:text-weave-blue"
                aria-label="Salin konfigurasi"
              >
                {copied ? (
                  <>
                    <CheckIcon className="h-3.5 w-3.5 text-emerald-500" />
                    Tersalin
                  </>
                ) : (
                  <>
                    <CopyIcon className="h-3.5 w-3.5" />
                    Salin
                  </>
                )}
              </button>
            </div>

            {/* code */}
            <pre className="overflow-x-auto bg-ink p-5 font-mono text-[12.5px] leading-relaxed">
              <code className="text-paper/90">
                {COMPOSE.split("\n").map((line, i) => (
                  <div key={i} className="whitespace-pre">
                    <CodeLine line={line} />
                  </div>
                ))}
              </code>
            </pre>
          </div>

          <p className="mt-3 text-center font-mono text-[11px] text-ink-muted">
            ↑ jadikan <span className="text-ink-soft">knweave.yourdomain.com</span> dan
            selesai.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}

/* tiny YAML-ish syntax highlighter */
function CodeLine({ line }: { line: string }) {
  if (line.startsWith("#")) {
    return <span className="text-paper/35">{line || " "}</span>;
  }
  // split into key / value
  const m = line.match(/^(\s*)([A-Za-z0-9_-]+)(:)(.*)$/);
  if (m) {
    const [, indent, key, colon, rest] = m;
    return (
      <>
        <span>{indent}</span>
        <span className="text-weave-blueSoft">{key}</span>
        <span className="text-paper/50">{colon}</span>
        <span className="text-emerald-300/90">{highlightValue(rest)}</span>
      </>
    );
  }
  return <span className="text-paper/70">{line || " "}</span>;
}

function highlightValue(rest: string) {
  // highlight quotes strings
  const parts = rest.split(/("[^"]*")/g);
  return parts.map((p, i) =>
    p.startsWith('"') ? (
      <span key={i} className="text-amber-300/90">
        {p}
      </span>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}
