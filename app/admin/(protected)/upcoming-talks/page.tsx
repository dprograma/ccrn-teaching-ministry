import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteTalkAssignment } from "@/lib/actions/talk-assignments";

export const dynamic = "force-dynamic";

export default async function AdminUpcomingTalksPage() {
  const assignments = await prisma.talkAssignment.findMany({
    orderBy: { scheduledAt: "asc" },
    include: { teacher: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-display text-2xl font-semibold">Upcoming Talks</h1>
        <Link
          href="/admin/upcoming-talks/new"
          className="px-4 py-2 rounded-full bg-navy text-white text-[13.5px] font-semibold"
        >
          + New assignment
        </Link>
      </div>

      {assignments.length === 0 && <p className="text-muted text-sm">Nothing yet.</p>}

      <div className="space-y-2.5">
        {assignments.map((a) => (
          <div
            key={a.id}
            className="flex items-center gap-3 bg-card border border-line rounded-xl p-3.5"
          >
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-[15px] truncate">{a.topic}</div>
              <div className="text-[12px] text-muted mt-0.5">
                {a.teacher.name} ·{" "}
                {new Intl.DateTimeFormat("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                }).format(a.scheduledAt)}
              </div>
            </div>
            <Link
              href={`/admin/upcoming-talks/${a.id}`}
              className="px-3 py-1.5 rounded-full bg-soft text-[12.5px] font-semibold"
            >
              Edit
            </Link>
            <form
              action={async () => {
                "use server";
                await deleteTalkAssignment(a.id);
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
