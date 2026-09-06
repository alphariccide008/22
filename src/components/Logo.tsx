import Link from "next/link";

type LogoProps = {
  /** "dark" = for use on dark backgrounds (light text) */
  tone?: "light" | "dark";
  className?: string;
  showWord?: boolean;
  href?: string | null;
};

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="SabioCast"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sc-grad" x1="4" y1="6" x2="44" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5a3fe4" />
          <stop offset="1" stopColor="#ff5a36" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="46" height="46" rx="13" fill="url(#sc-grad)" />
      {/* broadcast node + radiating arcs, bottom-left origin */}
      <g stroke="#fff" strokeWidth="3.4" strokeLinecap="round">
        <path d="M15 33a0 0 0 0 1 0 0" />
        <path d="M14.5 24.5a12 12 0 0 1 12 12" opacity="0.95" />
        <path d="M14.5 16.5a20 20 0 0 1 20 20" opacity="0.7" />
        <path d="M14.5 8.5a28 28 0 0 1 28 28" opacity="0.45" />
      </g>
      <circle cx="15" cy="36" r="4.4" fill="#fff" />
    </svg>
  );
}

export function Logo({
  tone = "light",
  className = "",
  showWord = true,
  href = "/",
}: LogoProps) {
  const content = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      {showWord && (
        <span className="font-display text-xl font-bold tracking-tight">
          <span className={tone === "dark" ? "text-white" : "text-ink-900"}>Sabio</span>
          <span className="text-accent-500">Cast</span>
        </span>
      )}
    </span>
  );

  if (href === null) return content;

  return (
    <Link href={href} aria-label="SabioCast home" className="shrink-0">
      {content}
    </Link>
  );
}
