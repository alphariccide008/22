"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll-reveal as progressive enhancement.
 *
 * `.reveal` elements render visible by default. A blocking head script adds
 * `.js-anim` to <html> (unless reduced motion) which arms the hidden state,
 * plus a 3s safety timeout that force-reveals everything. This component then
 * runs the observer: anything already on screen is revealed immediately, the
 * rest transition in as they scroll into view.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!document.documentElement.classList.contains("js-anim")) return;
    if (!("IntersectionObserver" in window)) {
      document
        .querySelectorAll<HTMLElement>(".reveal")
        .forEach((el) => el.classList.add("in-view"));
      return;
    }

    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const vh = window.innerHeight;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = el.dataset.delay;
          if (delay) el.style.transitionDelay = `${delay}ms`;
          el.classList.add("in-view");
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh * 0.9) {
        el.classList.add("in-view");
      } else {
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
