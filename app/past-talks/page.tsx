import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { Banner } from "@/components/ui/banner";

export const metadata: Metadata = { title: "Past Talks" };
export const dynamic = "force-dynamic";

export default async function PastTalksPage() {
  let talks: Awaited<ReturnType<typeof prisma.teaching.findMany>> = [];
  let dbError = false;
  try {
    talks = await prisma.teaching.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    dbError = true;
  }

  return (
    <div className="mx-auto max-w-5xl px-4">
      <Banner
        kicker="A growing archive"
        title="Past Talks"
        emphasis="Individual messages given in the ministry — added as they are preached, so nothing taught once is lost."
      />

      {dbError && (
        <div className="border border-dashed border-line rounded-2xl p-5 text-center text-muted text-sm leading-relaxed">
          The Past Talks archive isn&rsquo;t connected yet. Once the database is live, published
          messages will appear here.
        </div>
      )}

      {!dbError && talks.length === 0 && (
        <div className="border border-dashed border-line rounded-2xl p-5 text-center text-muted text-sm leading-relaxed">
          No talks published yet. The committee can add the first one from the admin area.
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {talks.map((t) => (
          <Link
            key={t.id}
            href={`/past-talks/${t.slug}`}
            className="block w-full text-left bg-card border border-line rounded-2xl p-[17px]"
          >
            <div className="flex items-center gap-2 text-[12px] text-muted font-semibold mb-1">
              {t.publishedAt && (
                <span>
                  {new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(
                    t.publishedAt,
                  )}
                </span>
              )}
              {t.speaker && <span>· {t.speaker}</span>}
            </div>
            <h3 className="text-xl mb-1 leading-tight font-display font-semibold">{t.title}</h3>
            {t.scripture && (
              <div className="text-[13px] text-gold font-semibold mb-1.5">{t.scripture}</div>
            )}
            <p className="m-0 text-sm text-muted leading-relaxed">{t.summary}</p>
          </Link>
        ))}
      </div>
      <div className="h-8" />
    </div>
  );
}
