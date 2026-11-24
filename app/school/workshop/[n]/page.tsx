import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { WORKSHOP, findSession, formatRef, QA } from "@/lib/content/curriculum";
import { SourceBlock } from "@/components/ui/source-block";
import { Banner } from "@/components/ui/banner";

const ACCENTS = ["#13294B", "#8C2F39", "#5B4B8A", "#1E6B5B", "#8E6318", "#2A5A86", "#6B3F8C", "#2E6B3A"];

export function generateStaticParams() {
  return WORKSHOP.sessions.map((s) => ({ n: String(s.n) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ n: string }>;
}): Promise<Metadata> {
  const { n } = await params;
  const s = findSession(Number(n));
  return { title: s?.t ?? "Session" };
}

export default async function SessionPage({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const num = Number(n);
  const s = findSession(num);
  if (!s) notFound();

  const accent = ACCENTS[(s.n + 2) % ACCENTS.length];
  const related = QA.items.filter((q) => q.rel?.includes(`w${s.n}`));
  const prev = s.n > 1 ? s.n - 1 : null;
  const next = s.n < 8 ? s.n + 1 : null;

  return (
    <div className="mx-auto max-w-3xl px-4">
      <Banner
        color={accent}
        kicker={`Workshop session ${s.n} of 8`}
        title={s.t}
        emphasis={s.purpose}
      />

      <h3 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-muted mt-6 mb-2.5 pb-1.5 border-b border-line">
        Outline
      </h3>
      <ol className="font-serif text-[17px] leading-relaxed pl-5 list-decimal space-y-2">
        {s.out.map((o, i) => (
          <li key={i}>{o}</li>
        ))}
      </ol>

      <h3 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-muted mt-6 mb-2.5 pb-1.5 border-b border-line">
        Scripture
      </h3>
      <div className="font-serif text-[16.5px] leading-relaxed bg-card border border-line rounded-xl p-3.5 px-4">
        {s.refs.map(formatRef).join(" · ")}
      </div>

      <h3 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-muted mt-6 mb-2.5 pb-1.5 border-b border-line">
        For discussion
      </h3>
      <ul className="font-serif text-[17px] leading-relaxed pl-5 list-disc space-y-2">
        {s.discuss.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>

      <SourceBlock ccc={s.ccc} pope={s.pope} />

      {related.length > 0 && (
        <>
          <h3 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-muted mt-6 mb-2.5 pb-1.5 border-b border-line">
            Questions you may be asked
          </h3>
          {related.map((q) => (
            <Link
              key={q.id}
              href={`/qa/${q.id}`}
              className="block w-full text-left px-3.5 py-3 rounded-xl bg-card border border-line mb-2 font-semibold text-[15px] leading-snug"
            >
              <b className="text-gold font-display">Q{q.n}</b> {q.q}
            </Link>
          ))}
        </>
      )}

      <div className="flex gap-2.5 flex-wrap my-5">
        {prev !== null && (
          <Link
            href={`/school/workshop/${prev}`}
            className="flex-1 min-w-[140px] text-center px-4 py-3 rounded-full bg-soft font-semibold text-sm"
          >
            ‹ Session {prev}
          </Link>
        )}
        {next !== null && (
          <Link
            href={`/school/workshop/${next}`}
            className="flex-1 min-w-[140px] text-center px-4 py-3 rounded-full bg-soft font-semibold text-sm"
          >
            Session {next} ›
          </Link>
        )}
      </div>
    </div>
  );
}
