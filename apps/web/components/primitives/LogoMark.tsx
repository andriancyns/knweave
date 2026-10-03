import type { SVGProps } from "react";

/**
 * Knweave logo mark — a knotted weave of two threads forming a stylized
 * "K"/page corner. Uses the brand blue + gray, woven over/under.
 */
export function LogoMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      role="img"
      aria-label="Knweave"
      {...props}
    >
      {/* page surface */}
      <rect
        x="6.5"
        y="5.5"
        width="27"
        height="29"
        rx="5"
        fill="#FFFFFF"
        stroke="#D1D5DB"
        strokeWidth="1.4"
      />
      {/* gray thread (under) */}
      <path
        d="M9 28C16 22 24 14 31 11"
        stroke="#6B7280"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* blue thread (over) — the weave */}
      <path
        d="M9 12C16 18 24 26 31 29"
        stroke="#2563EB"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* crossing knot dot */}
      <circle cx="20" cy="20" r="2.4" fill="#FFFFFF" stroke="#2563EB" strokeWidth="1.6" />
    </svg>
  );
}
