"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Button, ArrowIcon } from "./ui";
import { primaryNav, type NavGroup } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "border-b border-ink-100 bg-paper/90 backdrop-blur-lg"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 md:h-[72px]">
        <Logo />

        {/* desktop nav */}
        <nav
          className="hidden items-center gap-1 lg:flex"
          onMouseLeave={() => setOpenMenu(null)}
        >
          {primaryNav.map((group) => (
            <NavItem
              key={group.label}
              group={group}
              open={openMenu === group.label}
              onOpen={() => setOpenMenu(group.label)}
              onClose={() => setOpenMenu(null)}
            />
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/contact"
            className="text-sm font-semibold text-ink-700 transition-colors hover:text-brand-700"
          >
            Sign in
          </Link>
          <Button href="/free-trial" size="md">
            Try now <ArrowIcon />
          </Button>
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-200 text-ink-800 lg:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-all ${
                mobileOpen ? "top-2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-2 block h-0.5 w-5 bg-current transition-all ${
                mobileOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-all ${
                mobileOpen ? "top-2 -rotate-45" : "top-4"
              }`}
            />
          </span>
        </button>
      </div>

      {mobileOpen && <MobileMenu />}
    </header>
  );
}

/* ---------------- desktop nav item ---------------- */

function NavItem({
  group,
  open,
  onOpen,
  onClose,
}: {
  group: NavGroup;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  if (!group.columns) {
    return (
      <Link
        href={group.href ?? "#"}
        className="rounded-lg px-3 py-2 text-sm font-semibold text-ink-700 transition-colors hover:text-brand-700"
      >
        {group.label}
      </Link>
    );
  }

  const wide = group.columns.length > 1;

  return (
    <div className="relative" onMouseEnter={onOpen}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => (open ? onClose() : onOpen())}
        className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
          open ? "text-brand-700" : "text-ink-700 hover:text-brand-700"
        }`}
      >
        {group.label}
        <svg
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="m4 6 4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 ${
            wide ? "w-[640px]" : "w-[320px]"
          }`}
        >
          <div
            className="reveal in-view overflow-hidden rounded-2xl border border-ink-100 bg-white p-3 shadow-[0_30px_80px_-30px_rgba(11,11,18,0.35)]"
            style={{ animationDuration: "0.2s" }}
          >
            <div className={`grid gap-1 ${wide ? "grid-cols-2" : "grid-cols-1"}`}>
              {group.columns.map((col, i) => (
                <div key={i} className="p-1">
                  {col.title && (
                    <p className="px-3 pb-1 pt-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink-400">
                      {col.title}
                    </p>
                  )}
                  {col.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      className="group block rounded-xl px-3 py-2.5 transition-colors hover:bg-brand-50"
                    >
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-ink-900 group-hover:text-brand-700">
                        {link.label}
                      </span>
                      {link.description && (
                        <span className="mt-0.5 block text-xs leading-snug text-ink-500">
                          {link.description}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- mobile menu ---------------- */

function MobileMenu() {
  return (
    <div className="lg:hidden">
      <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-ink-100 bg-paper px-5 pb-10 pt-4">
        <ul className="divide-y divide-ink-100">
          {primaryNav.map((group) => (
            <li key={group.label} className="py-1">
              {group.columns ? (
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-base font-semibold text-ink-900">
                    {group.label}
                    <svg
                      className="h-4 w-4 transition-transform group-open:rotate-180"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="m4 6 4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </summary>
                  <div className="pb-2">
                    {group.columns.flatMap((c) => c.links).map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink-600 hover:bg-brand-50 hover:text-brand-700"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  href={group.href ?? "#"}
                  className="block py-3 text-base font-semibold text-ink-900"
                >
                  {group.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-3">
          <Button href="/free-trial" size="lg" className="w-full">
            Try now <ArrowIcon />
          </Button>
          <Button href="/contact" variant="ghost" size="lg" className="w-full">
            Contact sales
          </Button>
        </div>
      </div>
    </div>
  );
}
