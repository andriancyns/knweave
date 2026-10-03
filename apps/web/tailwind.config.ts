import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F9FAFB",
        surface: "#FFFFFF",
        ink: {
          DEFAULT: "#111827",
          soft: "#374151",
          muted: "#6B7280",
        },
        weave: {
          blue: "#2563EB",
          blueSoft: "#3B82F6",
          blueInk: "#1D4ED8",
          blueTint: "#EFF4FF",
          gray: "#6B7280",
          thread: "#D1D5DB",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-hanken)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        prose: "68ch",
      },
      keyframes: {
        "thread-draw": {
          "0%": { strokeDashoffset: "1200" },
          "100%": { strokeDashoffset: "0" },
        },
        "soft-rise": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "weave-sway": {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-6px) rotate(0.4deg)" },
        },
      },
      animation: {
        "thread-draw": "thread-draw 2.4s ease-out forwards",
        "soft-rise": "soft-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "weave-sway": "weave-sway 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
