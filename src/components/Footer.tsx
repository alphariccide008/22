import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "./ui";
import { site, footerNav } from "@/content/site";

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink-950 text-white">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          <div>
            <Logo tone="dark" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Multilingual live streaming to a global audience — AI captions,
              AI speech translation and remote interpretation in one platform.
            </p>
            <address className="mt-6 text-sm not-italic leading-relaxed text-white/60">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.country}
            </address>
            <div className="mt-6 flex gap-2">
              <Social href={site.social.linkedin} label="LinkedIn">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V10.4H5.67v7.94h2.67zM7 9.24a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zm11.34 9.1v-4.36c0-2.33-1.24-3.42-2.9-3.42a2.5 2.5 0 0 0-2.27 1.25v-1.07h-2.67c.04.75 0 7.94 0 7.94h2.67v-4.43c0-.24.02-.48.09-.65.19-.48.63-.98 1.36-.98.96 0 1.35.73 1.35 1.8v4.26h2.67z" />
                </svg>
              </Social>
              <Social href={site.social.facebook} label="Facebook">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5H17V4.6c-.3-.04-1.3-.13-2.46-.13-2.43 0-4.1 1.49-4.1 4.22v2.36H7.7V14h2.74v8h3.06z" />
                </svg>
              </Social>
              <Social href={site.social.x} label="X">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.24 2H21l-6.56 7.5L22 22h-6.03l-4.7-6.15L5.9 22H3.14l7-8L2 2h6.19l4.25 5.62L18.24 2zm-1.06 18h1.67L7.9 3.9H6.1L17.18 20z" />
                </svg>
              </Social>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/70 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} SabioCast. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {site.languages.map((l) => (
              <span key={l} className="hover:text-white/80">
                {l}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
