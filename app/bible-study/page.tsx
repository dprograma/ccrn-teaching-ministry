import Link from "next/link";
import type { Metadata } from "next";
import { COMMUNITY, RESERVE, themeAccent } from "@/lib/content/curriculum";
import type { Theme } from "@/lib/content/types";

export const metadata: Metadata = { title: "Bible Study" };

function ThemeCard({ theme }: { theme: Theme }) {
  return (
    <Link
      href={`/bible-study/${theme.id}`}
      className="block w-full border border-line rounded-2xl overflow-hidden bg-card mb-[11px]"
    >
      <div
        className="px-4 py-3.5 flex items-center gap-3 text-white"
        style={{ background: themeAccent(theme) }}
      >
        <span className="font-display text-[23px] font-bold opacity-70 leading-none">
          {theme.n}
        </span>
        <span className="font-display text-[18.5px] font-semibold leading-tight">
          {theme.title}
        </span>
      </div>
      <div className="px-4 pt-3 pb-3.5">
        <span className="block text-[14px] text-muted leading-snug">{theme.emph}</span>
        <span className="flex items-center gap-2 mt-2.5 text-[12px] text-muted font-semibold">
          {theme.lessons.length} lessons
        </span>
      </div>
    </Link>
  );
}

export default function BibleStudyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4">
      <p className="text-muted text-sm my-4">
        For the whole community. Eight themes, four lessons in each — one theme a month, two a
        quarter.
      </p>
      {COMMUNITY.map((t) => (
        <ThemeCard key={t.id} theme={t} />
      ))}

      <h3 className="text-[13px] font-bold tracking-[0.13em] uppercase text-muted mt-8 mb-2.5 pb-1.5 border-b border-line">
        Special sessions &amp; reserve
      </h3>
      <p className="text-muted text-sm -mt-0.5 mb-3">
        Four further themes from the manual, kept for retreats, special sessions and the seasons
        of the Church year.
      </p>
      {RESERVE.map((t) => (
        <ThemeCard key={t.id} theme={t} />
      ))}
    </div>
  );
}
