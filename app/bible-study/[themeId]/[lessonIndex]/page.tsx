import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { findTheme, themeAccent, ALL_THEMES, QA } from "@/lib/content/curriculum";
import { SourceBlock } from "@/components/ui/source-block";

export function generateStaticParams() {
  return ALL_THEMES.flatMap((t) =>
    t.lessons.map((_, i) => ({ themeId: t.id, lessonIndex: String(i) })),
  );
}

function parse(params: { themeId: string; lessonIndex: string }) {
  const theme = findTheme(params.themeId);
  const index = Number(params.lessonIndex);
  const lesson = theme?.lessons[index];
  return { theme, lesson, index };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ themeId: string; lessonIndex: string }>;
}): Promise<Metadata> {
  const { lesson } = parse(await params);
  return { title: lesson?.t ?? "Lesson" };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ themeId: string; lessonIndex: string }>;
}) {
  const { theme, lesson, index } = parse(await params);
  if (!theme || !lesson) notFound();

  const accent = themeAccent(theme);
  const related = QA.items.filter((q) => q.rel?.includes(theme.id));
  const prev = index > 0 ? index - 1 : null;
  const next = index < theme.lessons.length - 1 ? index + 1 : null;

  return (
    <div className="mx-auto max-w-3xl px-4">
      <div className="mt-4 mb-1.5">
        <div className="text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: accent }}>
          {theme.title} · Lesson {index + 1} of {theme.lessons.length}
        </div>
        <h1 className="text-[28px] leading-[1.12] mt-1.5 font-display font-semibold tracking-tight">
          {lesson.t}
        </h1>
      </div>

      <div
        className="border border-line rounded-xl p-4 px-4 my-4 bg-card"
        style={{ borderLeftColor: accent, borderLeftWidth: 4 }}
      >
        <div className="text-[10.5px] font-bold tracking-[0.13em] uppercase text-muted">
          Key Scripture
        </div>
        <div className="font-display text-xl font-semibold mt-0.5">{lesson.key}</div>
      </div>

      <div className="bg-soft rounded-xl p-4 px-4 my-3 mb-5">
        <div className="text-[10.5px] font-bold tracking-[0.13em] uppercase text-claret mb-1">
          Teaching Focus · HINT
        </div>
        <p className="font-serif text-base leading-relaxed m-0">{lesson.hint}</p>
      </div>

      <h3 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-muted mt-6 mb-2.5 pb-1.5 border-b border-line">
        Objectives
      </h3>
      <ul className="font-serif text-[17px] leading-relaxed pl-5 list-disc space-y-2">
        {lesson.obj.map((o, i) => (
          <li key={i}>{o}</li>
        ))}
      </ul>

      <h3 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-muted mt-6 mb-2.5 pb-1.5 border-b border-line">
        Core Teaching Outline
      </h3>
      <ol className="font-serif text-[17px] leading-relaxed pl-5 list-decimal space-y-2">
        {lesson.out.map((o, i) => (
          <li key={i}>{o}</li>
        ))}
      </ol>

      <h3 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-muted mt-6 mb-2.5 pb-1.5 border-b border-line">
        Supporting Scriptures
      </h3>
      <div className="font-serif text-[16.5px] leading-relaxed bg-card border border-line rounded-xl p-3.5 px-4">
        {lesson.sup}
      </div>

      <h3 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-muted mt-6 mb-2.5 pb-1.5 border-b border-line">
        Practical Application
      </h3>
      <ul className="font-serif text-[17px] leading-relaxed pl-5 list-disc space-y-2">
        {lesson.app.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>

      <SourceBlock ccc={lesson.ccc} pope={lesson.pope} />

      <h3 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-muted mt-6 mb-2.5 pb-1.5 border-b border-line">
        Discussion prompts
      </h3>
      {lesson.faq.map((f, i) => (
        <div key={i} className="border border-line rounded-xl p-3.5 px-4 mb-2.5 bg-card">
          <div className="font-bold text-[15.5px] leading-snug">
            <span className="text-claret font-display">Q </span>
            {f.q}
          </div>
          <div className="font-serif text-base leading-relaxed mt-1.5">
            <span className="text-claret font-display font-bold">A </span>
            {f.a}
          </div>
        </div>
      ))}

      <div className="bg-navy text-[#F0EADC] rounded-xl p-4 px-[18px] my-5">
        <div className="text-[10.5px] tracking-[0.14em] uppercase text-goldl font-bold">
          Memory Verse
        </div>
        <div className="font-display text-xl font-semibold mt-0.5">{lesson.mem}</div>
      </div>

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
            href={`/bible-study/${theme.id}/${prev}`}
            className="flex-1 min-w-[140px] text-center px-4 py-3 rounded-full bg-soft font-semibold text-sm"
          >
            ‹ Previous
          </Link>
        )}
        {next !== null && (
          <Link
            href={`/bible-study/${theme.id}/${next}`}
            className="flex-1 min-w-[140px] text-center px-4 py-3 rounded-full bg-soft font-semibold text-sm"
          >
            Next lesson ›
          </Link>
        )}
      </div>
    </div>
  );
}
