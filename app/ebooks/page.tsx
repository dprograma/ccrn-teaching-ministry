import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { BookCover3D, coverAccent } from "@/components/ebooks/book-cover";

export const metadata: Metadata = { title: "eBooks" };
export const dynamic = "force-dynamic";

export default async function EbooksPage() {
  let books: Awaited<ReturnType<typeof prisma.eBook.findMany>> = [];
  let dbError = false;
  try {
    books = await prisma.eBook.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { position: "asc" },
    });
  } catch {
    dbError = true;
  }

  return (
    <div className="mx-auto max-w-5xl px-4">
      <div
        className="rounded-2xl p-5 text-white mt-4 mb-6"
        style={{ background: "linear-gradient(160deg, var(--navy2), var(--navy))" }}
      >
        <div className="text-[11px] tracking-[0.2em] uppercase opacity-80 font-bold">
          A growing shelf
        </div>
        <h1 className="text-[26px] mt-1.5 mb-2 text-white font-display font-semibold">eBooks</h1>
        <div className="font-serif italic text-[16px] leading-relaxed opacity-95">
          The ministry&rsquo;s teacher-training material, in book form — read online or download
          as a PDF.
        </div>
      </div>

      {dbError && (
        <div className="border border-dashed border-line rounded-2xl p-5 text-center text-muted text-sm leading-relaxed">
          The eBook shelf isn&rsquo;t connected yet. Once the database is live, published books
          will appear here.
        </div>
      )}

      {!dbError && books.length === 0 && (
        <div className="border border-dashed border-line rounded-2xl p-5 text-center text-muted text-sm leading-relaxed">
          No books published yet. The committee can add the first one from the admin area.
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {books.map((b) => (
          <Link key={b.id} href={`/ebooks/${b.slug}`} className="block">
            <BookCover3D
              title={b.title}
              seriesLabel={b.seriesLabel}
              accent={coverAccent(b.id)}
            />
            <div className="mt-2.5">
              <div className="font-display font-semibold text-[15px] leading-tight">{b.title}</div>
              {b.subtitle && <div className="text-[12.5px] text-muted mt-0.5">{b.subtitle}</div>}
            </div>
          </Link>
        ))}
      </div>
      <div className="h-8" />
    </div>
  );
}
