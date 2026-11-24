import type { Metadata } from "next";
import { SITE } from "@/lib/content/curriculum";
import { prisma } from "@/lib/db";
import { Banner } from "@/components/ui/banner";

export const metadata: Metadata = { title: "News" };
export const dynamic = "force-dynamic";

export default async function NewsPage() {
  let photos: Awaited<ReturnType<typeof prisma.newsPhoto.findMany>> = [];
  try {
    photos = await prisma.newsPhoto.findMany({ orderBy: { position: "asc" } });
  } catch {
    // The photo gallery degrades gracefully if the database isn't connected yet.
  }

  return (
    <div className="mx-auto max-w-5xl px-4">
      <Banner
        kicker="News · Events · Announcements"
        title="The Vineyard"
        emphasis="What is coming up in the ministry, and what we have done together."
      />

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        {SITE.news.map((n) => (
          <div key={n.t} className="bg-card border border-line rounded-2xl p-[17px]">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span
                className={`text-[10.5px] font-bold tracking-[0.11em] uppercase px-2.5 py-1 rounded-full bg-soft ${
                  n.tag === "soon" ? "text-claret" : "text-gold"
                }`}
              >
                {n.k}
              </span>
              <span className="text-[12.5px] text-muted font-semibold">{n.d}</span>
            </div>
            <h3 className="text-[19px] mb-1.5 leading-tight font-display font-semibold">{n.t}</h3>
            <p className="font-serif text-base leading-relaxed m-0">{n.b}</p>
          </div>
        ))}
      </div>

      {photos.length > 0 ? (
        <>
          <h2 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-muted mt-7 mb-2.5 pb-1.5 border-b border-line">
            Photographs
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map((p) => (
              <figure key={p.id} className="rounded-xl overflow-hidden border border-line bg-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt={p.caption ?? ""} className="w-full aspect-square object-cover" />
                {p.caption && (
                  <figcaption className="text-[11.5px] text-muted p-2">{p.caption}</figcaption>
                )}
              </figure>
            ))}
          </div>
        </>
      ) : (
        <div className="border border-dashed border-line rounded-2xl p-5 text-center text-muted text-sm leading-relaxed mt-3">
          Photographs from our programmes will appear here once the committee adds them through
          the admin area.
        </div>
      )}
      <div className="h-8" />
    </div>
  );
}
