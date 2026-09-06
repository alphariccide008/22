/**
 * Stylised multilingual player mockup used in hero sections.
 * Pure markup + CSS — no video, no external assets.
 */
export function PlayerMock({ className = "" }: { className?: string }) {
  const bars = [12, 28, 40, 22, 34, 48, 30, 18, 26, 42, 20, 32, 14, 38, 24, 30, 16, 44, 22, 28];
  return (
    <div
      className={`relative rounded-2xl border border-white/10 bg-ink-900 p-3 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)] ${className}`}
    >
      <div className="overflow-hidden rounded-xl bg-gradient-to-br from-brand-800 via-ink-900 to-ink-950">
        {/* stage */}
        <div className="relative aspect-video">
          <div className="bg-grid absolute inset-0 opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="relative flex h-16 w-16 items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent-500/40 [animation:pulse-ring_2.4s_ease-out_infinite]" />
              <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent-500 text-white">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </div>

          {/* live badge */}
          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-white backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-400" />
            Live
          </div>

          {/* caption */}
          <div className="absolute inset-x-4 bottom-14">
            <p className="inline-block rounded-md bg-black/65 px-3 py-1.5 text-sm font-medium text-white backdrop-blur">
              …y esto se traduce en tiempo real para todos los idiomas.
            </p>
          </div>

          {/* control bar */}
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-8">
            <div className="flex h-1 flex-1 overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-2/3 rounded-full bg-accent-500" />
            </div>
            <span className="rounded bg-white/15 px-1.5 py-0.5 text-[0.65rem] font-semibold text-white">
              CC
            </span>
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-white/80" fill="currentColor">
              <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zm-7 9a7 7 0 0 0 6 6.92V21h2v-2.08A7 7 0 0 0 19 12h-2a5 5 0 0 1-10 0H5z" />
            </svg>
          </div>
        </div>
      </div>

      {/* language chips + waveform */}
      <div className="flex items-center justify-between gap-4 px-1.5 pb-1 pt-3">
        <div className="flex flex-wrap gap-1.5">
          {["EN", "ES", "FR", "DE", "NL"].map((l, i) => (
            <span
              key={l}
              className={`rounded-md px-1.5 py-0.5 text-[0.68rem] font-bold ${
                i === 1
                  ? "bg-accent-500 text-white"
                  : "bg-white/10 text-white/60"
              }`}
            >
              {l}
            </span>
          ))}
        </div>
        <div className="flex h-6 items-end gap-[3px]">
          {bars.map((h, i) => (
            <span
              key={i}
              className="w-[3px] rounded-full bg-brand-400/70"
              style={{
                height: `${h}%`,
                animation: `float ${1.2 + (i % 5) * 0.2}s ease-in-out ${i * 0.05}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
