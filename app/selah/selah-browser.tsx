"use client";

import { useMemo, useState } from "react";
import { useSelahPlayer } from "@/components/selah/player-context";
import type { PlayableEntry } from "@/lib/selah/types";

const LANGUAGES = ["LATIN", "YORUBA", "IGBO", "HAUSA", "ENGLISH"] as const;
const LANGUAGE_LABEL: Record<string, string> = {
  LATIN: "Latin",
  YORUBA: "Yoruba",
  IGBO: "Igbo",
  HAUSA: "Hausa",
  ENGLISH: "English",
};

function EntryRow({ entry }: { entry: PlayableEntry }) {
  const { current, playing, play, toggle } = useSelahPlayer();
  const isCurrent = current?.id === entry.id;

  return (
    <div className="flex items-center gap-3 bg-card border border-line rounded-2xl px-4 py-3 mb-2">
      <button
        onClick={() => (isCurrent ? toggle() : play(entry))}
        aria-label={isCurrent && playing ? "Pause" : "Play"}
        className="w-11 h-11 shrink-0 rounded-full bg-navy text-white grid place-items-center"
      >
        {isCurrent && playing ? (
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
      <div className="min-w-0">
        <div className="font-semibold text-[15px] leading-snug truncate">{entry.title}</div>
        <div className="text-[12.5px] text-muted mt-0.5">
          <span className="text-gold font-semibold">
            {LANGUAGE_LABEL[entry.language] ?? entry.language}
          </span>{" "}
          · {entry.description}
        </div>
      </div>
    </div>
  );
}

export function SelahBrowser({
  study,
  worship,
}: {
  study: PlayableEntry[];
  worship: PlayableEntry[];
}) {
  const [lang, setLang] = useState<string | null>(null);

  const filteredStudy = useMemo(
    () => (lang ? study.filter((e) => e.language === lang) : study),
    [study, lang],
  );
  const filteredWorship = useMemo(
    () => (lang ? worship.filter((e) => e.language === lang) : worship),
    [worship, lang],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 my-5">
        <button
          onClick={() => setLang(null)}
          className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold border ${
            lang === null ? "bg-navy text-white border-navy" : "bg-card border-line text-ink"
          }`}
        >
          All languages
        </button>
        {LANGUAGES.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold border ${
              lang === l ? "bg-navy text-white border-navy" : "bg-card border-line text-ink"
            }`}
          >
            {LANGUAGE_LABEL[l]}
          </button>
        ))}
      </div>

      <h2 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-gold mt-6 mb-2.5">
        For study and quiet time
      </h2>
      {filteredStudy.length === 0 && (
        <p className="text-muted text-sm mb-4">Nothing in this language yet.</p>
      )}
      {filteredStudy.map((e) => (
        <EntryRow key={e.id} entry={e} />
      ))}

      <h2 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-claret mt-8 mb-2.5">
        For worship and praise
      </h2>
      {filteredWorship.length === 0 && (
        <p className="text-muted text-sm mb-4">Nothing in this language yet.</p>
      )}
      {filteredWorship.map((e) => (
        <EntryRow key={e.id} entry={e} />
      ))}
    </div>
  );
}
