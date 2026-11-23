import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteEbook } from "@/lib/actions/ebooks";

export const dynamic = "force-dynamic";

export default async function AdminEbooksPage() {
  const books = await prisma.eBook.findMany({
    orderBy: { position: "asc" },
    include: { _count: { select: { chapters: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-display text-2xl font-semibold">eBooks</h1>
        <Link
          href="/admin/ebooks/new"
          className="px-4 py-2 rounded-full bg-navy text-white text-[13.5px] font-semibold"
        >
          + New eBook
        </Link>
      </div>

      {books.length === 0 && (
        <p className="text-muted text-sm">
          Nothing yet. Run the seed script for a starting shelf, or create one.
        </p>
      )}

      <div className="space-y-2.5">
        {books.map((b) => (
          <div
            key={b.id}
            className="flex items-center gap-3 bg-card border border-line rounded-xl p-3.5"
          >
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-[15px] truncate">{b.title}</div>
              <div className="text-[12px] text-muted mt-0.5">
                {b._count.chapters} chapter{b._count.chapters === 1 ? "" : "s"} ·{" "}
                <span className={b.status === "PUBLISHED" ? "text-ok" : "text-claret"}>
                  {b.status === "PUBLISHED" ? "Published" : "Draft"}
                </span>
              </div>
            </div>
            <Link
              href={`/admin/ebooks/${b.id}`}
              className="px-3 py-1.5 rounded-full bg-soft text-[12.5px] font-semibold"
            >
              Edit
            </Link>
            <form
              action={async () => {
                "use server";
                await deleteEbook(b.id);
              }}
            >
              <button className="px-3 py-1.5 rounded-full bg-claret/10 text-claret text-[12.5px] font-semibold">
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
