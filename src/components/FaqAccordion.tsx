"use client";

import { useState } from "react";
import type { Faq } from "@/content/solutions";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink-200/70 border-y border-ink-200/70">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-4 py-5 text-left"
            >
              <span className="text-[0.98rem] font-semibold text-ink-900">
                {f.q}
              </span>
              <span
                className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all ${
                  isOpen
                    ? "rotate-45 border-brand-600 bg-brand-600 text-white"
                    : "border-ink-300 text-ink-500"
                }`}
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                  <path
                    d="M8 3v10M3 8h10"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl text-[0.95rem] leading-relaxed text-ink-600">
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
