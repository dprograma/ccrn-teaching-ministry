import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteTeacher } from "@/lib/actions/teachers";

export const dynamic = "force-dynamic";

export default async function AdminTeachersPage() {
  const teachers = await prisma.teacher.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { talks: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-display text-2xl font-semibold">Teach the Teacher — roster</h1>
        <Link
          href="/admin/teachers/new"
          className="px-4 py-2 rounded-full bg-navy text-white text-[13.5px] font-semibold"
        >
          + New teacher
        </Link>
      </div>
      <p className="text-muted text-sm mb-5 max-w-xl">
        This roster is who Upcoming Talks can be assigned to. It is separate from the nine-module
        Teach the Teacher curriculum shown on the public page.
      </p>

      {teachers.length === 0 && <p className="text-muted text-sm">Nothing yet.</p>}

      <div className="space-y-2.5">
        {teachers.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-3 bg-card border border-line rounded-xl p-3.5"
          >
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-[15px] truncate">{t.name}</div>
              <div className="text-[12px] text-muted mt-0.5">
                <span className={t.active ? "text-ok" : "text-claret"}>
                  {t.active ? "Active" : "Inactive"}
                </span>
                {" · "}
                {t._count.talks} talk{t._count.talks === 1 ? "" : "s"} assigned
              </div>
            </div>
            <Link
              href={`/admin/teachers/${t.id}`}
              className="px-3 py-1.5 rounded-full bg-soft text-[12.5px] font-semibold"
            >
              Edit
            </Link>
            <form
              action={async () => {
                "use server";
                await deleteTeacher(t.id);
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
