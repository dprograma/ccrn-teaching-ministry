import Link from "next/link";
import type { Metadata } from "next";
import { SCHOOL, WORKSHOP } from "@/lib/content/curriculum";
import { Banner } from "@/components/ui/banner";

export const metadata: Metadata = { title: "School of the Word" };

const TRACK_COLORS = ["#13294B", "#8C2F39", "#1E6B5B", "#6B3F8C"];

function TrackLink({
  href,
  color,
  kicker,
  title,
  meta,
  blurb,
}: {
  href: string;
  color: string;
  kicker: string;
  title: string;
  meta: string;
  blurb: string;
}) {
  return (
    <Link
      href={href}
      className="relative block w-full text-left border border-line rounded-2xl overflow-hidden bg-card p-[18px]"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: color }} aria-hidden="true" />
      <span className="block text-[10.5px] font-bold tracking-[0.16em] uppercase" style={{ color }}>
        {kicker}
      </span>
      <span className="block font-display text-[21px] font-semibold leading-tight mt-1">
        {title}
      </span>
      <span className="block text-[12.5px] mt-1.5 text-muted font-semibold">{meta}</span>
      <span className="block text-sm text-muted leading-relaxed mt-3">{blurb}</span>
    </Link>
  );
}

export default function SchoolPage() {
  const totalClasses = SCHOOL.tracks.reduce((a, t) => a + t.classes, 0);

  return (
    <div className="mx-auto max-w-5xl px-4">
      <Banner
        kicker={SCHOOL.tag}
        title="School of the Word"
        emphasis={SCHOOL.intro}
        meta={
          <>
            <b className="text-ink font-semibold">{totalClasses} classes</b> across three tracks,
            plus six elective series
          </>
        }
      />

      <div className="border border-claret rounded-2xl p-[17px] my-4 bg-card">
        <div className="flex items-center gap-2 text-[10.5px] font-bold tracking-[0.13em] uppercase text-claret mb-1.5">
          Please read this first
        </div>
        <div className="font-display text-xl font-semibold leading-snug mb-2.5">
          {SCHOOL.caveat.lead}
        </div>
        {SCHOOL.caveat.p.map((p, i) => (
          <p key={i} className="font-serif text-base leading-relaxed mb-2.5 last:mb-0 max-w-3xl">
            {p}
          </p>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SCHOOL.tracks.map((t, i) => (
          <TrackLink
            key={t.n}
            href={`/school/track/${t.n}`}
            color={TRACK_COLORS[i % TRACK_COLORS.length]}
            kicker={`Track ${t.n} · ${t.level}`}
            title={t.name}
            meta={`${t.weeks} weeks · ${t.classes} classes · 7 a week`}
            blurb={t.blurb}
          />
        ))}

        <TrackLink
          href="/school/electives"
          color={TRACK_COLORS[3]}
          kicker={`Track 4 · ${SCHOOL.electives.level}`}
          title={SCHOOL.electives.name}
          meta={`${SCHOOL.electives.series.length} elective series · open enrolment`}
          blurb={SCHOOL.electives.blurb}
        />

        <TrackLink
          href="/school/workshop"
          color="var(--claret)"
          kicker="Advanced growth & depth"
          title="Bible Study Workshop & Special Sessions"
          meta={`${WORKSHOP.sessions.length} subjects · held three times a year`}
          blurb={WORKSHOP.intro}
        />
      </div>

      <div className="bg-soft rounded-2xl p-4 px-[18px] my-4">
        <div className="text-[10.5px] font-bold tracking-[0.13em] uppercase text-claret mb-1.5">
          Truth That Sets Free
        </div>
        <p className="font-serif text-[16.5px] leading-relaxed m-0 max-w-3xl">{SCHOOL.note}</p>
      </div>

      <h3 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-muted mt-6 mb-2.5 pb-1.5 border-b border-line">
        {SCHOOL.vision.t}
      </h3>
      <p className="font-serif text-[17px] leading-relaxed max-w-2xl">{SCHOOL.vision.lead}</p>
      <div className="grid sm:grid-cols-2 gap-x-6">
        {SCHOOL.vision.items.map((v, i) => (
          <div key={i} className="border-l-[3px] border-gold pl-3.5 mb-4">
            <b className="block font-display text-[17.5px] font-semibold mb-0.5">
              {i + 1}. {v.t}
            </b>
            <span className="font-serif text-[15.5px] leading-snug text-muted">{v.d}</span>
          </div>
        ))}
      </div>
      <div className="h-8" />
    </div>
  );
}
