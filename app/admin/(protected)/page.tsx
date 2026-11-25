import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

async function counts() {
  try {
    const [ebooks, pastTalks, selah, photos, teachers, upcomingTalks] = await Promise.all([
      prisma.eBook.count(),
      prisma.teaching.count(),
      prisma.selahEntry.count(),
      prisma.newsPhoto.count(),
      prisma.teacher.count(),
      prisma.talkAssignment.count(),
    ]);
    return { ebooks, pastTalks, selah, photos, teachers, upcomingTalks, ok: true as const };
  } catch {
    return {
      ebooks: 0,
      pastTalks: 0,
      selah: 0,
      photos: 0,
      teachers: 0,
      upcomingTalks: 0,
      ok: false as const,
    };
  }
}

export default async function AdminDashboard() {
  const c = await counts();

  const tiles = [
    { href: "/admin/ebooks", label: "eBooks", count: c.ebooks },
    { href: "/admin/past-talks", label: "Past Talks", count: c.pastTalks },
    { href: "/admin/upcoming-talks", label: "Upcoming Talks", count: c.upcomingTalks },
    { href: "/admin/teachers", label: "Teach the Teacher roster", count: c.teachers },
    { href: "/admin/selah", label: "Selah entries", count: c.selah },
    { href: "/admin/news", label: "News photos", count: c.photos },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-1">Dashboard</h1>
      <p className="text-muted text-sm mb-6">What the committee can publish from here.</p>

      {!c.ok && (
        <div className="border border-dashed border-claret/50 bg-soft rounded-xl p-4 text-sm text-claret mb-6">
          The database isn&rsquo;t connected yet — counts below are placeholders.
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {tiles.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="bg-card border border-line rounded-2xl p-4 hover:border-gold"
          >
            <div className="font-display text-2xl font-semibold">{t.count}</div>
            <div className="text-[12.5px] text-muted mt-0.5">{t.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
