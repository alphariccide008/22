"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type VideoFrameProps = {
  /** YouTube / Vimeo video id. When empty the play button links to `fallbackHref`. */
  youTubeId?: string;
  poster: string;
  label?: string;
  /** Where the play button goes when no video id is set (gated demo, like the reference site). */
  fallbackHref?: string;
  className?: string;
};

/**
 * A real video embed slot. With a `youTubeId` it lazy-loads the privacy-mode
 * YouTube player on click (no third-party script until then). Without one it
 * behaves like the reference site's gated demo and sends people to the trial.
 */
export function VideoFrame({
  youTubeId,
  poster,
  label = "Watch the multilingual player demo",
  fallbackHref = "/free-trial",
  className = "",
}: VideoFrameProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={`relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)] ${className}`}
    >
      {playing && youTubeId ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youTubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          <Image
            src={poster}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-ink-950/80 via-ink-950/30 to-brand-700/30" />

          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-white backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-400" />
            Live demo
          </div>

          {youTubeId ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={label}
              className="group absolute inset-0 flex items-center justify-center"
            >
              <PlayGlyph />
            </button>
          ) : (
            <Link
              href={fallbackHref}
              aria-label={label}
              className="group absolute inset-0 flex flex-col items-center justify-center gap-3"
            >
              <PlayGlyph />
              <span className="rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                Live demos require a trial account
              </span>
            </Link>
          )}

          {/* faux control bar + language menu */}
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10">
            <div className="flex h-1 flex-1 overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-1/2 rounded-full bg-accent-500" />
            </div>
            {["EN", "ES", "FR", "DE"].map((l, i) => (
              <span
                key={l}
                className={`rounded px-1.5 py-0.5 text-[0.65rem] font-bold ${
                  i === 1 ? "bg-accent-500 text-white" : "bg-white/15 text-white/70"
                }`}
              >
                {l}
              </span>
            ))}
            <span className="rounded bg-white/15 px-1.5 py-0.5 text-[0.65rem] font-semibold text-white">
              CC
            </span>
          </div>
        </>
      )}
    </div>
  );
}

function PlayGlyph() {
  return (
    <span className="relative flex h-16 w-16 items-center justify-center">
      <span className="absolute inline-flex h-full w-full rounded-full bg-accent-500/40 [animation:pulse-ring_2.4s_ease-out_infinite]" />
      <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent-500 text-white transition-transform group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </span>
  );
}
