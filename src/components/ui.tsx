import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/* ---------------- Container ---------------- */

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={`container-x ${className}`}>{children}</div>;
}

/* ---------------- Section ---------------- */

export function Section({
  className = "",
  tone = "paper",
  children,
  id,
}: {
  className?: string;
  tone?: "paper" | "ink" | "brand" | "muted";
  children: ReactNode;
  id?: string;
}) {
  const tones: Record<string, string> = {
    paper: "bg-paper text-ink-900",
    muted: "bg-ink-50 text-ink-900",
    ink: "bg-ink-950 text-white",
    brand: "bg-brand-700 text-white",
  };
  return (
    <section id={id} className={`py-20 md:py-28 ${tones[tone]} ${className}`}>
      {children}
    </section>
  );
}

/* ---------------- Eyebrow ---------------- */

export function Eyebrow({
  children,
  className = "",
  tone = "brand",
}: {
  children: ReactNode;
  className?: string;
  tone?: "brand" | "light";
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${
        tone === "light" ? "text-brand-200" : "text-brand-600"
      } ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          tone === "light" ? "bg-accent-400" : "bg-accent-500"
        }`}
      />
      {children}
    </span>
  );
}

/* ---------------- SectionHeading ---------------- */

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow && (
        <Eyebrow tone={tone === "light" ? "light" : "brand"} className="mb-4">
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={`text-balance text-3xl font-bold sm:text-4xl md:text-[2.75rem] md:leading-[1.05] ${
          tone === "light" ? "text-white" : "text-ink-900"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-5 text-lg leading-relaxed ${
            tone === "light" ? "text-ink-200" : "text-ink-600"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

/* ---------------- Button ---------------- */

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "light";
  size?: "md" | "lg";
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className">;

export function Button({
  href,
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500";
  const sizes = {
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };
  const variants = {
    primary:
      "bg-accent-500 text-white shadow-[0_10px_30px_-10px_rgba(255,90,54,0.6)] hover:bg-accent-600 hover:-translate-y-0.5",
    secondary:
      "bg-brand-600 text-white hover:bg-brand-700 hover:-translate-y-0.5 shadow-[0_10px_30px_-12px_rgba(90,63,228,0.7)]",
    ghost:
      "border border-ink-200 bg-white text-ink-800 hover:border-brand-300 hover:text-brand-700",
    light:
      "bg-white text-ink-900 hover:bg-ink-100 hover:-translate-y-0.5",
  };
  return (
    <Link
      href={href}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

/* ---------------- Card ---------------- */

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-ink-100 bg-white p-6 shadow-[0_1px_2px_rgba(11,11,18,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_24px_50px_-24px_rgba(90,63,228,0.28)] ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------------- ArrowIcon ---------------- */

export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 10h12m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="m5 10.5 3.5 3.5L15 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
