import Link from "next/link";
import type { Metadata } from "next";
import { SCHOOL, WORKSHOP } from "@/lib/content/curriculum";
import { Banner } from "@/components/ui/banner";

export const metadata: Metadata = { title: "School of the Word" };

const TRACK_COLORS = ["#13294B", "#8C2F39", "#1E6B5B", "#6B3F8C"];

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

      <div className="border border-claret rounded-2xl p-[17px] my-4 bg-card max-w-2xl">
        <div className="flex items-center gap-2 text-[10.5px] font-bold tracking-[0.13em] uppercase text-claret mb-1.5">
          Please read this first
        </div>
        <div className="font-display text-xl font-semibold leading-snug mb-2.5">
          {SCHOOL.caveat.lead}
        </div>
        {SCHOOL.caveat.p.map((p, i) => (
          <p key={i} className="font-serif text-base leading-relaxed mb-2.5 last:mb-0">
            {p}
          </p>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {SCHOOL.tracks.map((t, i) => (
        <Link
          key={t.n}
          href={`/school/track/${t.n}`}
          className="block w-full text-left border border-line rounded-[18px] overflow-hidden bg-card"
        >
          <div className="p-4 text-white" style={{ background: TRACK_COLORS[i % TRACK_COLORS.length] }}>
            <span className="block text-[10.5px] font-bold tracking-[0.16em] uppercase opacity-85">
              Track {t.n} · {t.level}
            </span>
            <span className="block font-display text-[23px] font-semibold leading-tight mt-0.5">
              {t.name}
            </span>
            <span className="block text-[12.5px] mt-1.5 opacity-90 font-semibold">
              {t.weeks} weeks · {t.classes} classes · 7 a week
            </span>
          </div>
          <div className="p-4 text-sm text-muted leading-relaxed">{t.blurb}</div>
        </Link>
      ))}

      <Link
        href="/school/electives"
        className="block w-full text-left border border-line rounded-[18px] overflow-hidden bg-card"
      >
        <div className="p-4 text-white" style={{ background: TRACK_COLORS[3] }}>
          <span className="block text-[10.5px] font-bold tracking-[0.16em] uppercase opacity-85">
            Track 4 · {SCHOOL.electives.level}
          </span>
          <span className="block font-display text-[23px] font-semibold leading-tight mt-0.5">
            {SCHOOL.electives.name}
          </span>
          <span className="block text-[12.5px] mt-1.5 opacity-90 font-semibold">
            {SCHOOL.electives.series.length} elective series · open enrolment
          </span>
        </div>
        <div className="p-4 text-sm text-muted leading-relaxed">{SCHOOL.electives.blurb}</div>
      </Link>

      <Link
        href="/school/workshop"
        className="block w-full text-left border border-line rounded-[18px] overflow-hidden bg-card"
      >
        <div className="p-4" style={{ background: "var(--claret)" }}>
          <span className="block text-[10.5px] font-bold tracking-[0.16em] uppercase text-white/85">
            Advanced growth &amp; depth
          </span>
          <span className="block font-display text-[23px] font-semibold leading-tight mt-0.5 text-white">
            Bible Study Workshop &amp; Special Sessions
          </span>
          <span className="block text-[12.5px] mt-1.5 text-white/90 font-semibold">
            {WORKSHOP.sessions.length} subjects · held three times a year
          </span>
        </div>
        <div className="p-4 text-sm text-muted leading-relaxed">{WORKSHOP.intro}</div>
      </Link>
      </div>

      <div className="bg-soft rounded-2xl p-4 px-[18px] my-4 max-w-2xl">
        <div className="text-[10.5px] font-bold tracking-[0.13em] uppercase text-claret mb-1.5">
          Truth That Sets Free
        </div>
        <p className="font-serif text-[16.5px] leading-relaxed m-0">{SCHOOL.note}</p>
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
