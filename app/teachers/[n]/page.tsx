import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TEACHERS, findModule, formatRef, QA } from "@/lib/content/curriculum";
import { SourceBlock } from "@/components/ui/source-block";
import { Banner } from "@/components/ui/banner";

const ACCENTS = [
  "#13294B", "#8C2F39", "#5B4B8A", "#1E6B5B", "#8E6318",
  "#2A5A86", "#6B3F8C", "#2E6B3A", "#3F5166",
];

export function generateStaticParams() {
  return TEACHERS.modules.map((m) => ({ n: String(m.n) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ n: string }>;
}): Promise<Metadata> {
  const { n } = await params;
  const m = findModule(Number(n));
  return { title: m ? `Module ${m.n}: ${m.t}` : "Module" };
}

export default async function ModulePage({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const num = Number(n);
  const m = findModule(num);
  if (!m) notFound();

  const accent = ACCENTS[(m.n - 1) % ACCENTS.length];
  const related = QA.items.filter((q) => q.rel?.includes(`t${m.n}`));
  const nextModule = TEACHERS.modules.find((x) => x.n === m.n + 1);

  return (
    <div className="mx-auto max-w-3xl px-4">
      <Banner
        color={accent}
        kicker={`Module ${m.n} · ${m.lvl}`}
        title={m.t}
        emphasis={m.purpose}
      />

      {m.seven && (
        <Link
          href="/teachers/seven-ways"
          className="block w-full text-center bg-navy text-white rounded-full py-3 font-semibold mb-1"
        >
          Open the seven ways of handling the Word ›
        </Link>
      )}

      <h3 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-muted mt-6 mb-2.5 pb-1.5 border-b border-line">
        By the end, the teacher must be able to
      </h3>
      <ul className="font-serif text-[17px] leading-relaxed pl-5 list-disc space-y-2">
        {m.must.map((x, i) => (
          <li key={i}>{x}</li>
        ))}
      </ul>

      <h3 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-muted mt-6 mb-2.5 pb-1.5 border-b border-line">
        Core content
      </h3>
      <ol className="font-serif text-[17px] leading-relaxed pl-5 list-decimal space-y-2">
        {m.out.map((x, i) => (
          <li key={i}>{x}</li>
        ))}
      </ol>

      <h3 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-muted mt-6 mb-2.5 pb-1.5 border-b border-line">
        Errors to avoid
      </h3>
      <ul className="font-serif text-[17px] leading-relaxed pl-5 list-disc space-y-2">
        {m.errors.map((x, i) => (
          <li key={i}>{x}</li>
        ))}
      </ul>

      <h3 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-muted mt-6 mb-2.5 pb-1.5 border-b border-line">
        Practice
      </h3>
      <div className="bg-soft rounded-xl p-4">
        <p className="font-serif text-base leading-relaxed m-0">{m.practice}</p>
      </div>

      <h3 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-muted mt-6 mb-2.5 pb-1.5 border-b border-line">
        Scripture
      </h3>
      <div className="font-serif text-[16.5px] leading-relaxed bg-card border border-line rounded-xl p-3.5 px-4">
        {m.refs.map(formatRef).join(" · ")}
      </div>

      <SourceBlock ccc={m.ccc} />

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
        {nextModule && (
          <Link
            href={`/teachers/${nextModule.n}`}
            className="flex-1 min-w-[140px] text-center px-4 py-3 rounded-full bg-soft font-semibold text-sm"
          >
            Module {nextModule.n} ›
          </Link>
        )}
      </div>
    </div>
  );
}
