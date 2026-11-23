import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteTeaching } from "@/lib/actions/teachings";

export const dynamic = "force-dynamic";

export default async function AdminTeachingsPage() {
  const teachings = await prisma.teaching.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-display text-2xl font-semibold">Teachings</h1>
        <Link
          href="/admin/teachings/new"
          className="px-4 py-2 rounded-full bg-navy text-white text-[13.5px] font-semibold"
        >
          + New teaching
        </Link>
      </div>

      {teachings.length === 0 && <p className="text-muted text-sm">Nothing yet.</p>}

      <div className="space-y-2.5">
        {teachings.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-3 bg-card border border-line rounded-xl p-3.5"
          >
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-[15px] truncate">{t.title}</div>
              <div className="text-[12px] text-muted mt-0.5">
                {t.speaker && <>{t.speaker} · </>}
                <span className={t.status === "PUBLISHED" ? "text-ok" : "text-claret"}>
                  {t.status === "PUBLISHED" ? "Published" : "Draft"}
                </span>
              </div>
            </div>
            <Link
              href={`/admin/teachings/${t.id}`}
              className="px-3 py-1.5 rounded-full bg-soft text-[12.5px] font-semibold"
            >
              Edit
            </Link>
            <form
              action={async () => {
                "use server";
                await deleteTeaching(t.id);
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
