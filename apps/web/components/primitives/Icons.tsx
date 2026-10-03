import type { SVGProps } from "react";

/**
 * Lightweight inline icon set — no icon library, consistent 1.6 stroke.
 * All icons are 24x24, inherit currentColor.
 */

type P = SVGProps<SVGSVGElement>;
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const TreeIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="4" width="6" height="4" rx="1" />
    <rect x="3" y="13" width="6" height="4" rx="1" />
    <rect x="14" y="8.5" width="7" height="4" rx="1" />
    <path d="M9 6h2.5a2.5 2.5 0 0 1 2.5 2.5v0M9 15h2.5A2.5 2.5 0 0 0 14 12.5v0" />
  </svg>
);

export const MarkdownIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M7 15V9l3 3 3-3v6M17.5 9v4.5M15.5 11.5l2 2 2-2" />
  </svg>
);

export const SearchIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4 4" />
  </svg>
);

export const HistoryIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3.5 12a8.5 8.5 0 1 0 2.7-6.2" />
    <path d="M4 3.5V7h3.5" />
    <path d="M12 8v4l2.5 2" />
  </svg>
);

export const ShareIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="6" r="2.5" />
    <circle cx="18" cy="18" r="2.5" />
    <path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6" />
  </svg>
);

export const GithubIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12 11.5 11.5 0 0 0 8.4 23c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7 0-.7 0-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.7.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.7 1.6.2 2.8.1 3.2.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
  </svg>
);

export const ArrowRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const SparkIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
  </svg>
);

export const HeartIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 20s-7-4.3-9.2-9.1C1.3 7.6 3 4.5 6 4.5c2 0 3.2 1.1 4 2.3.8-1.2 2-2.3 4-2.3 3 0 4.7 3.1 3.2 6.4C19 15.7 12 20 12 20z" />
  </svg>
);

export const ShieldIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const BoxIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="m12 3 7.5 4.3v9.4L12 21l-7.5-4.3V7.3L12 3z" />
    <path d="m4.5 7.3 7.5 4.3 7.5-4.3M12 21v-9.4" />
  </svg>
);

export const TerminalIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <path d="m7 9 3 3-3 3M13 15h4" />
  </svg>
);

export const CheckIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="m5 12 4.5 4.5L19 7" />
  </svg>
);

export const CopyIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2.5" />
    <path d="M5 15V5.5A1.5 1.5 0 0 1 6.5 4H15" />
  </svg>
);

export const ChevronDown = (p: P) => (
  <svg {...base} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const DiscordIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M20 4.4A19 19 0 0 0 15.3 3l-.3.5a14 14 0 0 1 4.1 1.3 13 13 0 0 0-11.2 0A14 14 0 0 1 12 3.5L11.7 3A19 19 0 0 0 7 4.4 19.7 19.7 0 0 0 3.5 18a19 19 0 0 0 5.7 2.9l.6-1a13 13 0 0 1-2-1l.5-.3a13.5 13.5 0 0 0 11.4 0l.5.3a13 13 0 0 1-2 1l.6 1A19 19 0 0 0 24.5 18 19.7 19.7 0 0 0 20 4.4zM9.3 15.4c-.9 0-1.7-.9-1.7-2s.7-2 1.7-2 1.7.9 1.7 2-.8 2-1.7 2zm5.4 0c-.9 0-1.7-.9-1.7-2s.7-2 1.7-2 1.7.9 1.7 2-.8 2-1.7 2z" />
  </svg>
);

export const BugIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="8" y="8" width="8" height="11" rx="4" />
    <path d="M9 5l1.5 2M15 5l-1.5 2M4 10h3.5M4 15h3.5M20 10h-3.5M20 15h-3.5M8 12.5h8M12 8v11" />
  </svg>
);

export const ScaleIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 4v16M7 8h10M7 8 4 14h6L7 8zM17 8l-3 6h6l-3-6zM6 20h12" />
  </svg>
);

export const UsersIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 20a5.5 5.5 0 0 1 11 0M16 5.2a3 3 0 0 1 0 5.6M16.5 20a5.5 5.5 0 0 0-2-4.3" />
  </svg>
);

export const LeafIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 19C4 11 9 5 20 5c0 11-6 16-14 15z" />
    <path d="M5 19c3-6 7-9 12-11" />
  </svg>
);

export const PackageIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="7" width="18" height="13" rx="2.5" />
    <path d="M3 11h18M8 7V4h8v3" />
  </svg>
);

export const PlusIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const BellIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </svg>
);

export const StarIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="m12 4 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17.6 6.8 20l1-5.8L3.5 10l5.9-.9L12 4z" />
  </svg>
);

export const StarFilledIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="m12 4 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17.6 6.8 20l1-5.8L3.5 10l5.9-.9L12 4z" />
  </svg>
);

export const GlobeIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.5 2.4 2.5 14.6 0 17M12 3.5c-2.5 2.4-2.5 14.6 0 17" />
  </svg>
);

export const LockIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="5" y="10" width="14" height="10" rx="2.5" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
  </svg>
);

export const SettingsIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 14a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V20a2 2 0 0 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H4a2 2 0 0 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H10a1.6 1.6 0 0 0 1-1.5V4a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V10a1.6 1.6 0 0 0 1.5 1H20a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z" />
  </svg>
);

export const ChevronRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const ClockIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 1.8" />
  </svg>
);

export const EyeIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const PencilIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3z" />
    <path d="M14.5 7.5l3 3" />
  </svg>
);

export const BoldIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 5h6.5a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z" />
  </svg>
);

export const ItalicIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M19 5h-6M11 19H5M15 5L9 19" />
  </svg>
);

export const ListIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />
  </svg>
);

export const LinkIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M9 15l6-6" />
    <path d="M11 6l1-1a4 4 0 0 1 6 6l-1 1M13 18l-1 1a4 4 0 0 1-6-6l1-1" />
  </svg>
);

export const MoreIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="5" cy="12" r="1.4" />
    <circle cx="12" cy="12" r="1.4" />
    <circle cx="19" cy="12" r="1.4" />
  </svg>
);

export const FolderIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);

export const FileIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 3h8l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
    <path d="M14 3v5h5" />
  </svg>
);

export const HomeIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 11l8-6 8 6" />
    <path d="M6 10v9h12v-9" />
  </svg>
);

export const CommandIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M8 4a2.5 2.5 0 1 0-2.5 2.5H8V4zM16 4a2.5 2.5 0 1 1 2.5 2.5H16V4zM8 20a2.5 2.5 0 1 1-2.5-2.5H8V20zM16 20a2.5 2.5 0 1 0 2.5-2.5H16V20zM8 8h8v8H8z" />
  </svg>
);

export const XIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const TrashIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" />
    <path d="M10 11v6M14 11v6" />
  </svg>
);
