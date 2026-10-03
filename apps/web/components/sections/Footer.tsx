import { Wordmark, LinkButton, Badge } from "../primitives";
import { WovenDivider } from "../primitives/WovenDivider";
import {
  GithubIcon,
  BugIcon,
  DiscordIcon,
  ScaleIcon,
  HeartIcon,
} from "../primitives/Icons";

const LINK_GROUPS = [
  {
    title: "Proyek",
    links: [
      { label: "GitHub", href: "https://github.com", external: true },
      { label: "Rilis", href: "https://github.com", external: true },
      { label: "Roadmap", href: "https://github.com", external: true },
      { label: "Changelog", href: "https://github.com", external: true },
    ],
  },
  {
    title: "Komunitas",
    links: [
      { label: "Issue Tracker", href: "https://github.com", external: true },
      { label: "Discord", href: "#" },
      { label: "Discussions", href: "https://github.com", external: true },
      { label: "Kontribusi", href: "https://github.com", external: true },
    ],
  },
  {
    title: "Sumber",
    links: [
      { label: "Dokumentasi", href: "#faq" },
      { label: "Self-Hosting", href: "#self-host" },
      { label: "Demo", href: "#demo" },
      { label: "Lisensi MIT", href: "#open-source" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative z-10 mt-10">
      {/* woven top border */}
      <div className="shell">
        <WovenDivider tone="blue" />
      </div>

      {/* CTA strip */}
      <div className="shell py-16">
        <div className="reveal relative overflow-hidden rounded-3xl border border-weave-blue/20 bg-weave-blueTint px-7 py-12 text-center sm:px-14">
          <svg
            viewBox="0 0 800 200"
            preserveAspectRatio="xMidYMid slice"
            className="pointer-events-none absolute inset-0 h-full w-full"
            fill="none"
            aria-hidden
          >
            <path d="M-50 60C200 0 400 120 600 60s250-40 250-10" stroke="#2563EB" strokeWidth="1.5" opacity="0.18" />
            <path d="M-50 140C200 200 400 80 600 140s250 40 250 10" stroke="#6B7280" strokeWidth="1.5" opacity="0.14" />
          </svg>

          <div className="relative">
            <Badge tone="blue">
              <HeartIcon className="h-3.5 w-3.5" /> gratis selamanya
            </Badge>
            <h2 className="mx-auto mt-4 max-w-xl font-display text-3xl font-semibold leading-tight text-ink text-balance sm:text-4xl">
              Siap menumbuhkan pengetahuan tim, tanpa ketergantungan?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-ink-soft">
              Coba demo, atau jalankan Knweave di mesinmu sendiri dalam satu
              menit.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <LinkButton href="#demo" variant="primary">
                Coba Demo
              </LinkButton>
              <LinkButton
                href="#self-host"
                variant="secondary"
                iconLeft={<GithubIcon className="h-4 w-4" />}
              >
                Self-Host Sekarang
              </LinkButton>
            </div>
          </div>
        </div>
      </div>

      {/* link grid */}
      <div className="border-t border-weave-thread/60">
        <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Wordmark />
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              Wiki tim sederhana untuk tim kecil. Open source, self-hostable,
              tanpa vendor lock-in.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <SocialLink href="https://github.com" label="GitHub">
                <GithubIcon className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="#" label="Issue tracker">
                <BugIcon className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="#" label="Discord">
                <DiscordIcon className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          {LINK_GROUPS.map((g) => (
            <div key={g.title}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                {g.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.external ? "_blank" : undefined}
                      rel={l.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-ink-soft transition-colors hover:text-weave-blue"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-weave-thread/60">
        <div className="shell flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="flex items-center gap-2 font-mono text-xs text-ink-muted">
            <ScaleIcon className="h-3.5 w-3.5" />
            © 2026 Knweave contributors · MIT License
          </p>
          <p className="flex items-center gap-1.5 font-mono text-xs text-ink-muted">
            Dibuat dengan
            <HeartIcon className="h-3.5 w-3.5 text-weave-blue" />
            oleh komunitas, untuk tim kecil.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-weave-thread bg-surface text-ink-soft transition-all hover:-translate-y-0.5 hover:border-weave-blue hover:text-weave-blue"
    >
      {children}
    </a>
  );
}
