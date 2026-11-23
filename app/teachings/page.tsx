import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";

export const metadata: Metadata = { title: "Teachings" };
export const dynamic = "force-dynamic";

export default async function TeachingsPage() {
  let teachings: Awaited<ReturnType<typeof prisma.teaching.findMany>> = [];
  let dbError = false;
  try {
    teachings = await prisma.teaching.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    dbError = true;
  }

  return (
    <div className="mx-auto max-w-2xl px-4">
      <div
        className="rounded-2xl p-5 text-white mt-4 mb-6"
        style={{ background: "linear-gradient(160deg, var(--navy2), var(--navy))" }}
      >
        <div className="text-[11px] tracking-[0.2em] uppercase opacity-80 font-bold">
          A growing archive
        </div>
        <h1 className="text-[26px] mt-1.5 mb-2 text-white font-display font-semibold">
          Teachings
        </h1>
        <div className="font-serif italic text-[16px] leading-relaxed opacity-95">
          Individual messages given in the ministry — added as they are preached, so nothing
          taught once is lost.
        </div>
      </div>

      {dbError && (
        <div className="border border-dashed border-line rounded-2xl p-5 text-center text-muted text-sm leading-relaxed">
          The Teachings archive isn&rsquo;t connected yet. Once the database is live, published
          messages will appear here.
        </div>
      )}

      {!dbError && teachings.length === 0 && (
        <div className="border border-dashed border-line rounded-2xl p-5 text-center text-muted text-sm leading-relaxed">
          No teachings published yet. The committee can add the first one from the admin area.
        </div>
      )}

      {teachings.map((t) => (
        <Link
          key={t.id}
          href={`/teachings/${t.slug}`}
          className="block w-full text-left bg-card border border-line rounded-2xl p-[17px] mb-3"
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
      <div className="h-8" />
    </div>
  );
}
