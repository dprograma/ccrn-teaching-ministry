import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { Banner } from "@/components/ui/banner";

export const metadata: Metadata = { title: "Upcoming Talks" };
export const dynamic = "force-dynamic";

async function getUpcomingTalks() {
  return prisma.talkAssignment.findMany({
    where: { scheduledAt: { gte: new Date() } },
    orderBy: { scheduledAt: "asc" },
    include: { teacher: true },
  });
}

export default async function UpcomingTalksPage() {
  let talks: Awaited<ReturnType<typeof getUpcomingTalks>> = [];
  let dbError = false;
  try {
    talks = await getUpcomingTalks();
  } catch {
    dbError = true;
  }

  return (
    <div className="mx-auto max-w-5xl px-4">
      <Banner
        kicker="What&rsquo;s coming next"
        title="Upcoming Talks"
        emphasis="Messages assigned to our teachers — the topic, who is delivering it, and when."
      />

      {dbError && (
        <div className="border border-dashed border-line rounded-2xl p-5 text-center text-muted text-sm leading-relaxed">
          Upcoming Talks isn&rsquo;t connected yet. Once the database is live, scheduled messages
          will appear here.
        </div>
      )}

      {!dbError && talks.length === 0 && (
        <div className="border border-dashed border-line rounded-2xl p-5 text-center text-muted text-sm leading-relaxed">
          Nothing scheduled yet. Check back soon.
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {talks.map((a) => (
          <div key={a.id} className="bg-card border border-line rounded-2xl p-[17px]">
            <div className="text-[12px] text-muted font-semibold mb-1">
              {new Intl.DateTimeFormat("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              }).format(a.scheduledAt)}
            </div>
            <h3 className="text-xl mb-1 leading-tight font-display font-semibold">{a.topic}</h3>
            <div className="text-[13px] text-gold font-semibold mb-1.5">{a.teacher.name}</div>
            <p className="m-0 text-sm text-muted leading-relaxed">{a.description}</p>
          </div>
        ))}
      </div>
      <div className="h-8" />
    </div>
  );
}
