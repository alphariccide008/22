"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Progressive scroll-reveal. Any element with the `reveal` class animates in
 * once when it enters the viewport. Respects prefers-reduced-motion via CSS.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in-view"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay;
            if (delay) el.style.animationDelay = `${delay}ms`;
            el.classList.add("in-view");
            io.unobserve(el);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
