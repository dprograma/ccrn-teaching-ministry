import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { BookCover3D, coverAccent } from "@/components/ebooks/book-cover";
import { Banner } from "@/components/ui/banner";

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
    <div className="mx-auto max-w-6xl px-4">
      <Banner
        kicker="A growing shelf"
        title="eBooks"
        emphasis="The ministry’s teacher-training material, in book form — read online or download as a PDF."
      />

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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
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
