import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SCHOOL, findTrack, formatRef } from "@/lib/content/curriculum";

const TRACK_COLORS = ["#13294B", "#8C2F39", "#1E6B5B", "#6B3F8C"];

export function generateStaticParams() {
  return SCHOOL.tracks.flatMap((t) =>
    t.w.map((_, i) => ({ n: String(t.n), week: String(i) })),
  );
}

function parse(p: { n: string; week: string }) {
  const track = findTrack(Number(p.n));
  const wi = Number(p.week);
  const week = track?.w[wi];
  return { track, week, wi };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ n: string; week: string }>;
}): Promise<Metadata> {
  const { week } = parse(await params);
  return { title: week?.t ?? "Week" };
}

export default async function WeekPage({
  params,
}: {
  params: Promise<{ n: string; week: string }>;
}) {
  const { track, week, wi } = parse(await params);
  if (!track || !week) notFound();

  const accent = TRACK_COLORS[(track.n - 1) % TRACK_COLORS.length];
  const prev = wi > 0 ? wi - 1 : null;
  const next = wi < track.weeks - 1 ? wi + 1 : null;

  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="mt-4 mb-1.5">
        <div className="text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: accent }}>
          {track.name} · Week {wi + 1} of {track.weeks}
        </div>
        <h1 className="text-[28px] leading-[1.12] mt-1.5 font-display font-semibold tracking-tight">
          {week.t}
        </h1>
      </div>

      <div className="flex gap-2.5 items-start border-l-[3px] border-claret bg-soft rounded-r-xl p-3 px-3.5 my-3.5 text-[14.5px] leading-snug">
        <b className="text-claret">Syllabus, not the full lesson.</b> The teaching is given live
        in the ministry&rsquo;s training sessions.
      </div>
      <p className="text-muted text-sm mt-2.5 mb-4">
        Seven classes this week.
      </p>

      {week.c.map((cl, i) => {
        const isTsf = cl[0].startsWith("TRUTH THAT SETS FREE");
        const title = isTsf ? cl[0].replace("TRUTH THAT SETS FREE: ", "") : cl[0];
        return (
          <div
            key={i}
            className={`flex gap-3 items-start rounded-2xl p-3.5 px-4 mb-2 border ${
              isTsf ? "border-claret bg-soft" : "border-line bg-card"
            }`}
          >
            <span className="w-7 h-7 rounded-lg border-2 border-line grid place-items-center text-[12.5px] font-bold text-muted shrink-0 mt-0.5">
              {i + 1}
            </span>
            <div>
              {isTsf && (
                <div className="text-[10.5px] font-bold tracking-[0.12em] uppercase text-claret mb-0.5">
                  Truth That Sets Free
                </div>
              )}
              <div className={`font-semibold text-[15.5px] leading-snug ${isTsf ? "text-claret" : ""}`}>
                {title}
              </div>
              <div className="font-display text-sm font-semibold text-gold mt-0.5">
                {formatRef(cl[1])}
              </div>
              <div className="font-serif text-[15px] leading-snug text-muted mt-0.5">{cl[2]}</div>
            </div>
          </div>
        );
      })}

      <div className="flex gap-2.5 flex-wrap my-5">
        {prev !== null && (
          <Link
            href={`/school/track/${track.n}/${prev}`}
            className="flex-1 min-w-[140px] text-center px-4 py-3 rounded-full bg-soft font-semibold text-sm"
          >
            ‹ Week {prev + 1}
          </Link>
        )}
        {next !== null && (
          <Link
            href={`/school/track/${track.n}/${next}`}
            className="flex-1 min-w-[140px] text-center px-4 py-3 rounded-full bg-soft font-semibold text-sm"
          >
            Week {next + 1} ›
          </Link>
        )}
      </div>
    </div>
  );
}
