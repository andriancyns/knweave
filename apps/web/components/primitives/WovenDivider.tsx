import type { SVGProps } from "react";

/**
 * WovenDivider — a horizontal band of interlaced threads used between
 * sections. Two threads cross over/under to evoke the "knweave" name.
 */
export function WovenDivider({
  className = "",
  tone = "light",
  ...props
}: SVGProps<SVGSVGElement> & { tone?: "light" | "blue" }) {
  const blue = tone === "blue" ? "#2563EB" : "#2563EB";
  const gray = "#6B7280";
  const stroke = "#D1D5DB";
  return (
    <svg
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      fill="none"
      className={`block h-6 w-full ${className}`}
      aria-hidden
      {...props}
    >
      {/* base baseline */}
      <line
        x1="0"
        y1="20"
        x2="1200"
        y2="20"
        stroke={stroke}
        strokeWidth="1"
        strokeDasharray="2 6"
        opacity="0.5"
      />
      {/* gray thread — gentle wave */}
      <path
        d="M0 22C150 8 300 32 450 18S750 8 900 22 1100 30 1200 16"
        stroke={gray}
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* blue thread — crossing over */}
      <path
        d="M0 18C150 32 300 8 450 22S750 32 900 18 1100 10 1200 24"
        stroke={blue}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* small weave knots */}
      {[180, 450, 720, 990].map((x, i) => (
        <circle
          key={i}
          cx={x}
          cy={i % 2 === 0 ? 20 : 20}
          r="2.6"
          fill="#FFFFFF"
          stroke={blue}
          strokeWidth="1.4"
        />
      ))}
    </svg>
  );
}
