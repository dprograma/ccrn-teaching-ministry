import Link from "next/link";
import type { Metadata } from "next";
import { COMMUNITY, RESERVE, themeAccent } from "@/lib/content/curriculum";
import type { Theme } from "@/lib/content/types";

export const metadata: Metadata = { title: "Bible Study" };

function ThemeCard({ theme }: { theme: Theme }) {
  const accent = themeAccent(theme);
  return (
    <Link
      href={`/bible-study/${theme.id}`}
      className="relative block w-full border border-line rounded-2xl overflow-hidden bg-card p-4"
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ background: accent }}
        aria-hidden="true"
      />
      <div className="flex items-start gap-3">
        <span
          className="shrink-0 w-9 h-9 rounded-full border-2 grid place-items-center font-display font-bold text-[15px]"
          style={{ borderColor: accent, color: accent }}
        >
          {theme.n}
        </span>
        <span className="font-display text-[17.5px] font-semibold leading-tight mt-1">
          {theme.title}
        </span>
      </div>
      <span className="block text-[14px] text-muted leading-snug mt-3">{theme.emph}</span>
      <span className="flex items-center gap-2 mt-2.5 text-[12px] text-muted font-semibold">
        {theme.lessons.length} lessons
      </span>
    </Link>
  );
}

export default function BibleStudyPage() {
  return (
    <div className="mx-auto max-w-5xl px-4">
      <p className="text-muted text-sm my-4 max-w-2xl">
        For the whole community. Eight themes, four lessons in each — one theme a month, two a
        quarter.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {COMMUNITY.map((t) => (
          <ThemeCard key={t.id} theme={t} />
        ))}
      </div>

      <h3 className="text-[13px] font-bold tracking-[0.13em] uppercase text-muted mt-10 mb-2.5 pb-1.5 border-b border-line">
        Special sessions &amp; reserve
      </h3>
      <p className="text-muted text-sm -mt-0.5 mb-3 max-w-2xl">
        Four further themes from the manual, kept for retreats, special sessions and the seasons
        of the Church year.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {RESERVE.map((t) => (
          <ThemeCard key={t.id} theme={t} />
        ))}
      </div>
    </div>
  );
}
