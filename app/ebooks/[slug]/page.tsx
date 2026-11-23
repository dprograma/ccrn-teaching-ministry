import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { BookCoverArt, coverAccent } from "@/components/ebooks/book-cover";
import { DownloadPdfButton } from "@/components/ebooks/download-pdf-button";

export const dynamic = "force-dynamic";

async function getBook(slug: string) {
  return prisma.eBook.findUnique({
    where: { slug },
    include: { chapters: { orderBy: { position: "asc" } } },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const book = await getBook(slug);
    return { title: book?.title ?? "eBook" };
  } catch {
    return { title: "eBook" };
  }
}

export default async function EbookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let book;
  try {
    book = await getBook(slug);
  } catch {
    notFound();
  }
  if (!book || book.status !== "PUBLISHED") notFound();

  const accent = coverAccent(book.id);

  return (
    <div className="mx-auto max-w-3xl px-4">
      <div className="grid sm:grid-cols-[180px_1fr] gap-6 mt-5 mb-8 items-start">
        <div className="w-[160px] sm:w-full mx-auto sm:mx-0">
          <BookCoverArt
            title={book.title}
            seriesLabel={book.seriesLabel}
            accent={accent}
            className="w-full rounded-md shadow-[0_14px_30px_rgba(16,22,36,0.25)]"
          />
        </div>
        <div>
          {book.seriesLabel && (
            <div className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-gold mb-1.5">
              {book.seriesLabel}
            </div>
          )}
          <h1 className="font-display text-[28px] font-semibold leading-[1.15]">{book.title}</h1>
          {book.subtitle && (
            <p className="font-serif italic text-[16px] text-muted mt-1.5">{book.subtitle}</p>
          )}
          <p className="font-serif text-[16px] leading-relaxed mt-3">{book.description}</p>

          <div className="flex flex-wrap gap-2.5 mt-5">
            <DownloadPdfButton
              book={{
                title: book.title,
                subtitle: book.subtitle,
                description: book.description,
                seriesLabel: book.seriesLabel,
                chapters: book.chapters.map((c) => ({ title: c.title, content: c.content })),
              }}
              accent={accent}
            />
            <a
              href="#read"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-soft font-semibold text-[14.5px]"
            >
              Read online ↓
            </a>
          </div>
        </div>
      </div>

      <h2 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-muted mb-2.5 pb-1.5 border-b border-line">
        What this book covers
      </h2>
      <ol className="font-serif text-base leading-relaxed pl-5 list-decimal space-y-1.5 mb-8">
        {book.chapters.map((c) => (
          <li key={c.id}>{c.title}</li>
        ))}
      </ol>

      <div id="read" className="scroll-mt-24">
        {book.chapters.map((c, i) => (
          <section key={c.id} className="mb-10">
            <div className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-gold mb-1">
              Chapter {i + 1}
            </div>
            <h3 className="font-display text-2xl font-semibold mb-3">{c.title}</h3>
            <div className="font-serif text-[17px] leading-[1.7] space-y-4">
              {c.content.split(/\n{2,}/).map((para, pi) => (
                <p key={pi}>{para.trim()}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
