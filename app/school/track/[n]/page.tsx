import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SCHOOL, findTrack } from "@/lib/content/curriculum";
import { Banner } from "@/components/ui/banner";

const TRACK_COLORS = ["#13294B", "#8C2F39", "#1E6B5B", "#6B3F8C"];

export function generateStaticParams() {
  return SCHOOL.tracks.map((t) => ({ n: String(t.n) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ n: string }>;
}): Promise<Metadata> {
  const { n } = await params;
  const t = findTrack(Number(n));
  return { title: t?.name ?? "Track" };
}

export default async function TrackPage({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const t = findTrack(Number(n));
  if (!t) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4">
      <Banner
        color={TRACK_COLORS[(t.n - 1) % TRACK_COLORS.length]}
        kicker={`Track ${t.n} · ${t.level}`}
        title={t.name}
        emphasis={t.blurb}
        meta={
          <>
            <b className="text-ink font-semibold">
              {t.weeks} weeks · {t.classes} classes
            </b>
            <br />
            {t.who}
          </>
        }
      />

      <div className="flex gap-2.5 items-start border-l-[3px] border-claret bg-soft rounded-r-xl p-3 px-3.5 my-3.5 text-[14.5px] leading-snug max-w-2xl">
        <b className="text-claret">Syllabus, not the full lesson.</b> {SCHOOL.caveat.short}
      </div>

      <h3 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-muted mt-6 mb-2.5 pb-1.5 border-b border-line">
        The weeks
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {t.w.map((w, i) => (
          <Link
            key={i}
            href={`/school/track/${t.n}/${i}`}
            className="flex items-center gap-3 w-full text-left bg-card border border-line rounded-2xl px-4 py-3"
          >
            <span className="w-10 h-10 rounded-[11px] bg-soft text-gold grid place-items-center font-display font-bold text-[15px] shrink-0">
              {i + 1}
            </span>
            <span className="min-w-0">
              <span className="block font-semibold text-[15.5px] leading-snug">{w.t}</span>
              <span className="block text-[12.5px] text-muted mt-0.5">{w.c.length} classes</span>
            </span>
            <span className="ml-auto text-muted text-lg">›</span>
          </Link>
        ))}
      </div>
      <div className="h-8" />
    </div>
  );
}
