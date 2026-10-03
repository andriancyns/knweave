import type { SVGProps } from "react";

/**
 * WovenHeroIllustration — the signature visual for Knweave.
 *
 * Composition: a central "page surface" (a doc) with a small page-tree
 * on its left edge, and three people (simple, warm figures — not
 * corporate) gathered around it. Interlaced blue + gray threads weave
 * between the people and the doc nodes, visualizing collaborative
 * knowledge. A couple of loose threads drift off for life.
 *
 * Drawn deliberately warm and human — small teams, not enterprise.
 */
export function WovenHeroIllustration({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  const blue = "#2563EB";
  const blueSoft = "#3B82F6";
  const gray = "#6B7280";
  const thread = "#D1D5DB";
  const ink = "#111827";

  return (
    <svg
      viewBox="0 0 560 520"
      fill="none"
      className={className}
      role="img"
      aria-label="Ilustrasi kolaborasi: beberapa orang berkumpul mengelilingi halaman wiki, dengan benang yang terjalin menghubungkan mereka ke pohon halaman."
      {...props}
    >
      <defs>
        {/* soft paper shadow */}
        <filter id="paperShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="14"
            stdDeviation="18"
            floodColor="#111827"
            floodOpacity="0.10"
          />
        </filter>
        <linearGradient id="docGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FCFCFD" />
        </linearGradient>
        <linearGradient id="bgBloom" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EFF4FF" />
          <stop offset="100%" stopColor="#F9FAFB" stopOpacity="0" />
        </linearGradient>
        <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1" fill="#6B7280" opacity="0.12" />
        </pattern>
      </defs>

      {/* ambient bloom */}
      <circle cx="280" cy="250" r="240" fill="url(#bgBloom)" />
      <rect x="0" y="0" width="560" height="520" fill="url(#dots)" opacity="0.5" />

      {/* ===== central document surface ===== */}
      <g filter="url(#paperShadow)">
        <rect
          x="150"
          y="110"
          width="260"
          height="300"
          rx="18"
          fill="url(#docGrad)"
          stroke={thread}
          strokeWidth="1.5"
        />
        {/* doc header bar */}
        <rect x="150" y="110" width="260" height="40" rx="18" fill="#F3F6FC" />
        <rect
          x="150"
          y="130"
          width="260"
          height="20"
          fill="#F3F6FC"
        />
        {/* traffic lights */}
        <circle cx="170" cy="130" r="4" fill="#F87171" />
        <circle cx="184" cy="130" r="4" fill="#FBBF24" />
        <circle cx="198" cy="130" r="4" fill="#34D399" />
        {/* doc title */}
        <rect x="226" y="124" width="150" height="12" rx="3" fill={blue} opacity="0.85" />
      </g>

      {/* ===== page tree on the doc (left column) ===== */}
      <g stroke={gray} strokeWidth="1.6" strokeLinecap="round" opacity="0.7">
        {/* connectors */}
        <path d="M178 188h14M192 188v14M192 202h12M192 214h12M178 188v40M178 228h14" />
      </g>
      <g>
        {/* root */}
        <rect x="184" y="178" width="78" height="12" rx="3" fill={blue} />
        {/* children */}
        <rect x="204" y="196" width="68" height="9" rx="3" fill="#E5E7EB" />
        <rect x="204" y="209" width="58" height="9" rx="3" fill="#E5E7EB" />
        <rect x="204" y="222" width="72" height="9" rx="3" fill={blueSoft} opacity="0.5" />
        <rect x="194" y="236" width="64" height="9" rx="3" fill="#E5E7EB" />
      </g>

      {/* ===== doc content lines (markdown-ish) ===== */}
      <g>
        <rect x="300" y="178" width="90" height="8" rx="3" fill={ink} opacity="0.85" />
        <rect x="300" y="194" width="100" height="6" rx="3" fill={gray} opacity="0.45" />
        <rect x="300" y="206" width="86" height="6" rx="3" fill={gray} opacity="0.45" />
        <rect x="300" y="218" width="96" height="6" rx="3" fill={gray} opacity="0.45" />
        {/* a little code chip */}
        <rect x="300" y="236" width="60" height="16" rx="4" fill="#0B1020" />
        <rect x="306" y="241" width="6" height="6" rx="1" fill="#34D399" />
        <rect x="316" y="243" width="34" height="3" rx="1.5" fill="#6B7280" />
        {/* more lines */}
        <rect x="300" y="262" width="78" height="6" rx="3" fill={gray} opacity="0.4" />
        <rect x="300" y="274" width="92" height="6" rx="3" fill={gray} opacity="0.4" />
        {/* a checkbox list */}
        <rect x="300" y="290" width="10" height="10" rx="3" fill="none" stroke={blue} strokeWidth="1.6" />
        <path d="m302.5 295 2 2 3.5-3.5" stroke={blue} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="316" y="291" width="74" height="8" rx="3" fill={gray} opacity="0.4" />
        <rect x="300" y="306" width="10" height="10" rx="3" fill={blue} opacity="0.15" />
        <rect x="316" y="307" width="60" height="8" rx="3" fill={gray} opacity="0.4" />
      </g>

      {/* ===== cursor + comment bubble (collaboration cue) ===== */}
      <g>
        {/* someone's cursor on the doc */}
        <path d="M338 250l10 6-4 2 2 5-3 1-2-5-4 2z" fill={blue} stroke="#FFFFFF" strokeWidth="1.2" />
        <rect x="352" y="258" width="34" height="11" rx="3" fill={blue} />
        <rect x="356" y="261" width="26" height="5" rx="2" fill="#FFFFFF" opacity="0.85" />
        {/* comment bubble */}
        <g transform="translate(380 150)">
          <path
            d="M0 6a6 6 0 0 1 6-6h54a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6H18l-10 8v-8H6a6 6 0 0 1-6-6z"
            fill="#FFFFFF"
            stroke={thread}
            strokeWidth="1.4"
          />
          <circle cx="12" cy="15" r="4" fill={blueSoft} />
          <rect x="20" y="11" width="36" height="4" rx="2" fill="#E5E7EB" />
          <rect x="20" y="18" width="28" height="4" rx="2" fill="#E5E7EB" />
        </g>
      </g>

      {/* ===== WOVEN THREADS connecting people to the doc ===== */}
      <g
        fill="none"
        strokeLinecap="round"
        strokeDasharray="900"
        strokeDashoffset="0"
      >
        {/* gray thread — person top-left into doc top */}
        <path
          d="M120 130C170 150 175 175 200 175"
          stroke={gray}
          strokeWidth="2.6"
          opacity="0.6"
        />
        {/* blue thread — over */}
        <path
          d="M118 144C168 168 178 200 205 205"
          stroke={blue}
          strokeWidth="2.6"
        />
        {/* gray thread — person right into doc */}
        <path
          d="M450 150C410 170 385 195 365 200"
          stroke={gray}
          strokeWidth="2.6"
          opacity="0.6"
        />
        {/* blue thread — over */}
        <path
          d="M448 164C408 188 380 210 360 215"
          stroke={blue}
          strokeWidth="2.6"
        />
        {/* gray thread — person bottom into doc */}
        <path
          d="M150 430C200 410 230 380 250 370"
          stroke={gray}
          strokeWidth="2.6"
          opacity="0.6"
        />
        {/* blue thread — over */}
        <path
          d="M168 432C218 408 240 380 262 368"
          stroke={blue}
          strokeWidth="2.6"
        />
        {/* loose drifting thread top-right */}
        <path
          d="M470 90c12-6 22 4 14 14s-22-8-14-14z"
          stroke={blue}
          strokeWidth="2"
          opacity="0.5"
        />
      </g>

      {/* weave crossing knots */}
      {[
        [205, 190],
        [360, 205],
        [255, 372],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="3.6" fill="#FFFFFF" stroke={blue} strokeWidth="1.6" />
        </g>
      ))}

      {/* ===== PEOPLE — small, warm figures ===== */}
      {/* Person A — top left */}
      <PersonGroup x={70} y={95} color={blue} />

      {/* Person B — top right */}
      <PersonGroup x={400} y={110} color={gray} flip />

      {/* Person C — bottom */}
      <PersonGroup x={120} y={400} color={blueSoft} />

      {/* ===== bottom caption chips ===== */}
      <g transform="translate(150 470)">
        <rect x="0" y="0" width="120" height="28" rx="14" fill="#FFFFFF" stroke={thread} />
        <circle cx="16" cy="14" r="5" fill={blue} />
        <rect x="28" y="10" width="70" height="8" rx="4" fill="#E5E7EB" />
        <text x="106" y="18" fontFamily="monospace" fontSize="9" fill={gray}>
          ●
        </text>
      </g>
      <g transform="translate(290 470)">
        <rect x="0" y="0" width="150" height="28" rx="14" fill="#FFFFFF" stroke={thread} />
        <path d="M14 18l4-5 3 3 5-6" stroke={blue} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="34" y="10" width="100" height="8" rx="4" fill="#E5E7EB" />
      </g>
    </svg>
  );
}

/* A small, warm, non-corporate person figure. */
function PersonGroup({
  x,
  y,
  color,
  flip = false,
}: {
  x: number;
  y: number;
  color: string;
  flip?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) ${flip ? "scale(-1,1) translate(-80,0)" : ""}`}>
      {/* subtle seat / platform */}
      <ellipse cx="40" cy="78" rx="34" ry="6" fill="#111827" opacity="0.06" />
      {/* body */}
      <path
        d="M14 78c0-14 12-24 26-24s26 10 26 24"
        fill="#FFFFFF"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* shoulders accent */}
      <path
        d="M22 70c4-8 10-12 18-12s14 4 18 12"
        fill="none"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* head */}
      <circle cx="40" cy="36" r="13" fill="#FFFFFF" stroke={color} strokeWidth="2.2" />
      {/* hair tuft */}
      <path
        d="M28 30c2-9 9-14 14-12 3 1 5 3 6 6"
        fill="none"
        stroke="#111827"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* eyes */}
      <circle cx="36" cy="36" r="1.3" fill="#111827" />
      <circle cx="44" cy="36" r="1.3" fill="#111827" />
      {/* smile */}
      <path d="M36.5 41c1.5 1.4 5.5 1.4 7 0" stroke="#111827" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      {/* a little hand raised toward the doc */}
      <path
        d="M64 60c6-2 10 2 9 8"
        fill="none"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* name tag dot */}
      <rect x="30" y="50" width="20" height="6" rx="3" fill={color} opacity="0.18" />
    </g>
  );
}
