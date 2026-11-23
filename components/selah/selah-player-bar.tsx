"use client";

import Link from "next/link";
import { useSelahPlayer } from "./player-context";

const LANGUAGE_LABEL: Record<string, string> = {
  LATIN: "Latin",
  YORUBA: "Yoruba",
  IGBO: "Igbo",
  HAUSA: "Hausa",
  ENGLISH: "English",
};

export function SelahPlayerBar() {
  const { current, playing, volume, kind, toggle, setVolume, clear } = useSelahPlayer();

  if (!current) {
    return null;
  }

  const controllable = kind === "audio" || kind === "youtube";

  return (
    <div className="fixed left-0 right-0 bottom-0 z-40 bg-card border-t border-line">
      <div className="mx-auto max-w-5xl px-3 py-2.5 flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-[13.5px] font-semibold truncate">{current.title}</div>
          <div className="text-[11px] text-muted truncate">
            {LANGUAGE_LABEL[current.language] ?? current.language}
            {kind === "external" && " · opened on its official site"}
          </div>
        </div>

        {controllable ? (
          <>
            <button
              onClick={toggle}
              aria-label={playing ? "Pause" : "Play"}
              className="w-10 h-10 shrink-0 rounded-full bg-navy text-white grid place-items-center"
            >
              {playing ? (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <rect x="6" y="5" width="4" height="14" />
                  <rect x="14" y="5" width="4" height="14" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M7 5l12 7-12 7z" />
                </svg>
              )}
            </button>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              aria-label="Volume"
              className="hidden sm:block w-20 accent-[var(--gold)]"
            />
          </>
        ) : (
          <Link
            href={current.embedUrl ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-full bg-soft text-[12.5px] font-semibold shrink-0"
          >
            Open ↗
          </Link>
        )}

        <button
          onClick={clear}
          aria-label="Close player"
          className="w-8 h-8 shrink-0 rounded-full hover:bg-soft grid place-items-center text-muted"
        >
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
