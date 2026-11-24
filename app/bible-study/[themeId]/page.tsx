import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { findTheme, themeAccent, ALL_THEMES } from "@/lib/content/curriculum";
import { Banner } from "@/components/ui/banner";

export function generateStaticParams() {
  return ALL_THEMES.map((t) => ({ themeId: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ themeId: string }>;
}): Promise<Metadata> {
  const { themeId } = await params;
  const theme = findTheme(themeId);
  return { title: theme?.title ?? "Theme" };
}

export default async function ThemePage({
  params,
}: {
  params: Promise<{ themeId: string }>;
}) {
  const { themeId } = await params;
  const theme = findTheme(themeId);
  if (!theme) notFound();

  const isCommunity = theme.id.startsWith("c");

  return (
    <div className="mx-auto max-w-5xl px-4">
      <Banner
        color={themeAccent(theme)}
        kicker={isCommunity ? `Theme ${theme.n} of 8` : `Reserve theme ${theme.n}`}
        title={theme.title}
        emphasis={theme.emph}
        meta={
          <>
            <b className="text-ink font-semibold">Theme Scripture</b>
            <br />
            {theme.ts}
          </>
        }
      />

      <h3 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-muted mt-6 mb-2.5 pb-1.5 border-b border-line">
        Lessons
      </h3>
      <div className="grid sm:grid-cols-2 gap-2.5">
        {theme.lessons.map((lesson, i) => (
          <Link
            key={i}
            href={`/bible-study/${theme.id}/${i}`}
            className="flex items-center gap-3 w-full text-left bg-card border border-line rounded-2xl px-4 py-3"
          >
            <span className="w-8 h-8 rounded-full border-2 border-gold grid place-items-center font-bold text-[13px] text-gold shrink-0">
              {i + 1}
            </span>
            <span className="min-w-0">
              <span className="block font-semibold text-[15.5px] leading-snug">{lesson.t}</span>
              <span className="block text-[12.5px] text-muted mt-0.5">{lesson.key}</span>
            </span>
            <span className="ml-auto text-muted text-lg">›</span>
          </Link>
        ))}
      </div>
      <div className="h-8" />
    </div>
  );
}
