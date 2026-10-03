import { Fragment, type ReactNode } from "react";

/**
 * MarkdownView — minimal hand-rolled markdown → React renderer.
 *
 * Intentionally tiny (no deps). Supports the subset produced by the seed
 * content and the editor toolbar: H1–H3, bold, italics, inline code,
 * fenced code blocks, ordered/unordered lists, paragraphs, links,
 * blockquotes, and hr.
 */

export function MarkdownView({ source }: { source: string }) {
  return <div className="prose-wiki">{renderBlocks(source)}</div>;
}

/* ----------------------------------------------------------- block parse */
function renderBlocks(src: string): ReactNode[] {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const out: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // fenced code block
    const fence = line.match(/^```(\w+)?\s*$/);
    if (fence) {
      const lang = fence[1] ?? "";
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        buf.push(lines[i]);
        i++;
      }
      i++; // consume closing fence
      out.push(
        <pre key={key++}>
          <code data-lang={lang}>{buf.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    // horizontal rule
    if (/^\s*([-*_])\1{2,}\s*$/.test(line)) {
      out.push(<hr key={key++} />);
      i++;
      continue;
    }

    // headings
    const h = line.match(/^(#{1,3})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      const text = inline(h[2]);
      if (level === 1) out.push(<h1 key={key++}>{text}</h1>);
      else if (level === 2) out.push(<h2 key={key++}>{text}</h2>);
      else out.push(<h3 key={key++}>{text}</h3>);
      i++;
      continue;
    }

    // blockquote (consecutive)
    if (/^\s*>\s?/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^\s*>\s?/, ""));
        i++;
      }
      out.push(<blockquote key={key++}>{renderBlocks(buf.join("\n"))}</blockquote>);
      continue;
    }

    // unordered list
    if (/^\s*[-*+]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*+]\s+/, ""));
        i++;
      }
      out.push(
        <ul key={key++}>
          {items.map((it, idx) => (
            <li key={idx}>{inline(it)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    // ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
        i++;
      }
      out.push(
        <ol key={key++}>
          {items.map((it, idx) => (
            <li key={idx}>{inline(it)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    // blank line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // paragraph (gather until blank or block-start)
    const buf: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^(#{1,3})\s+/.test(lines[i]) &&
      !/^```/.test(lines[i]) &&
      !/^\s*[-*+]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !/^\s*>\s?/.test(lines[i]) &&
      !/^\s*([-*_])\1{2,}\s*$/.test(lines[i])
    ) {
      buf.push(lines[i]);
      i++;
    }
    out.push(<p key={key++}>{inline(buf.join(" "))}</p>);
  }

  return out;
}

/* --------------------------------------------------------- inline parse */
function inline(text: string): ReactNode[] {
  // tokenize: code, bold, italic, link
  const nodes: ReactNode[] = [];
  let rest = text;
  let key = 0;

  const patterns: { re: RegExp; render: (m: RegExpExecArray) => ReactNode }[] = [
    {
      // inline code
      re: /`([^`]+)`/,
      render: (m) => <code key={key++}>{m[1]}</code>,
    },
    {
      // bold (** or __)
      re: /\*\*([^*]+)\*\*|__([^_]+)__/,
      render: (m) => <strong key={key++}>{inline(m[1] ?? m[2])}</strong>,
    },
    {
      // italic (* or _)
      re: /\*([^*]+)\*|_([^_]+)_/,
      render: (m) => <em key={key++}>{inline(m[1] ?? m[2])}</em>,
    },
    {
      // link [text](href)
      re: /\[([^\]]+)\]\(([^)\s]+)\)/,
      render: (m) => (
        <a key={key++} href={m[2]} target="_blank" rel="noopener noreferrer">
          {inline(m[1])}
        </a>
      ),
    },
  ];

  while (rest.length) {
    let earliest: { idx: number; match: RegExpExecArray; render: (m: RegExpExecArray) => ReactNode } | null = null;
    for (const p of patterns) {
      const m = p.re.exec(rest);
      if (m && (earliest === null || m.index < earliest.idx)) {
        earliest = { idx: m.index, match: m, render: p.render };
      }
    }
    if (!earliest) {
      nodes.push(<Fragment key={key++}>{rest}</Fragment>);
      break;
    }
    if (earliest.idx > 0) {
      nodes.push(<Fragment key={key++}>{rest.slice(0, earliest.idx)}</Fragment>);
    }
    nodes.push(earliest.render(earliest.match));
    rest = rest.slice(earliest.idx + earliest.match[0].length);
  }

  return nodes;
}

/** quick snippet for search results — strips markdown, trims to length */
export function plainTextSnippet(src: string, max = 160): string {
  const stripped = src
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/[*_>#-]/g, " ")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  return stripped.length > max ? stripped.slice(0, max).trimEnd() + "…" : stripped;
}
