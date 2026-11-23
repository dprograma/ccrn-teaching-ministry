import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteSelahEntry } from "@/lib/actions/selah";

export const dynamic = "force-dynamic";

export default async function AdminSelahPage() {
  const entries = await prisma.selahEntry.findMany({
    orderBy: [{ section: "asc" }, { position: "asc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-display text-2xl font-semibold">Selah entries</h1>
        <Link
          href="/admin/selah/new"
          className="px-4 py-2 rounded-full bg-navy text-white text-[13.5px] font-semibold"
        >
          + New entry
        </Link>
      </div>

      {entries.length === 0 && <p className="text-muted text-sm">Nothing yet.</p>}

      <div className="space-y-2.5">
        {entries.map((e) => (
          <div
            key={e.id}
            className="flex items-center gap-3 bg-card border border-line rounded-xl p-3.5"
          >
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-[15px] truncate">{e.title}</div>
              <div className="text-[12px] text-muted mt-0.5">
                {e.section === "STUDY" ? "Study" : "Worship"} · {e.language} ·{" "}
                {e.sourceType === "HOSTED" ? "Our own recording" : "Official embed"} ·{" "}
                <span className={e.published ? "text-ok" : "text-claret"}>
                  {e.published ? "Published" : "Unpublished"}
                </span>
              </div>
            </div>
            <Link
              href={`/admin/selah/${e.id}`}
              className="px-3 py-1.5 rounded-full bg-soft text-[12.5px] font-semibold"
            >
              Edit
            </Link>
            <form
              action={async () => {
                "use server";
                await deleteSelahEntry(e.id);
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
