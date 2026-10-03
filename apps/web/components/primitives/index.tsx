import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { LogoMark } from "./LogoMark";

/* ----------------------------- Eyebrow ----------------------------- */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`eyebrow ${className}`}>
      <span className="inline-block h-px w-6 bg-weave-blue/40" aria-hidden />
      {children}
    </span>
  );
}

/* ------------------------------ Badge ------------------------------ */
export function Badge({
  children,
  tone = "blue",
  className = "",
}: {
  children: ReactNode;
  tone?: "blue" | "gray" | "neutral";
  className?: string;
}) {
  const tones: Record<string, string> = {
    blue: "border-weave-blue/25 bg-weave-blueTint text-weave-blueInk",
    gray: "border-ink-muted/20 bg-paper text-ink-soft",
    neutral: "border-weave-thread bg-surface text-ink-soft",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] font-medium tracking-wide ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/* ----------------------------- Buttons ----------------------------- */
type ButtonVariant = "primary" | "secondary" | "ghost";

type BaseProps = {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

const variantClass: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

function Inner({
  iconLeft,
  children,
  iconRight,
}: {
  iconLeft?: ReactNode;
  children: ReactNode;
  iconRight?: ReactNode;
}) {
  return (
    <>
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </>
  );
}

export function LinkButton({
  href,
  external = false,
  ...props
}: BaseProps & { href: string; external?: boolean }) {
  const cls = `${variantClass[props.variant ?? "primary"]} ${props.className ?? ""}`;
  const content = (
    <Inner iconLeft={props.iconLeft} iconRight={props.iconRight}>
      {props.children}
    </Inner>
  );
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

export function Button({
  className = "",
  ...props
}: BaseProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={`${variantClass[props.variant ?? "primary"]} ${className}`} {...props}>
      <Inner iconLeft={props.iconLeft} iconRight={props.iconRight}>
        {props.children}
      </Inner>
    </button>
  );
}

/* --------------------------- SectionShell -------------------------- */
export function SectionShell({
  id,
  children,
  className = "",
  bleed = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  bleed?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative z-10 py-20 sm:py-28 ${bleed ? "" : ""} ${className}`}
    >
      {bleed ? children : <div className="shell">{children}</div>}
    </section>
  );
}

/* --------------------------- Wordmark ------------------------------ */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-7 w-7" />
      <span className="font-display text-xl font-semibold tracking-tight text-ink">
        Knweave
      </span>
    </span>
  );
}
