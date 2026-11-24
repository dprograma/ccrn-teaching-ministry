import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { SelahBrowser } from "./selah-browser";

export const metadata: Metadata = { title: "Selah" };
export const dynamic = "force-dynamic";

export default async function SelahPage() {
  let study: Awaited<ReturnType<typeof prisma.selahEntry.findMany>> = [];
  let worship: Awaited<ReturnType<typeof prisma.selahEntry.findMany>> = [];
  let dbError = false;

  try {
    [study, worship] = await Promise.all([
      prisma.selahEntry.findMany({
        where: { section: "STUDY", published: true },
        orderBy: { position: "asc" },
      }),
      prisma.selahEntry.findMany({
        where: { section: "WORSHIP", published: true },
        orderBy: { position: "asc" },
      }),
    ]);
  } catch {
    dbError = true;
  }

  return (
    <div className="mx-auto max-w-3xl px-4">
      <div className="bg-soft rounded-2xl p-7 mt-4 mb-5 text-center border border-line">
        <h1 className="text-[32px] mb-2 text-navy font-display font-semibold tracking-wide">
          SELAH
        </h1>
        <p className="font-serif italic text-[17px] leading-relaxed text-muted m-0">
          Music to pray and study by
        </p>
      </div>

      <p className="font-serif text-[17px] leading-relaxed max-w-2xl">
        Selah appears seventy-one times in the Psalms and three times in Habakkuk. It is a musical
        direction, and the old readers understood it as a pause — a lifting up, an instruction to
        stop and weigh what has just been said. That is what this page is for.
      </p>
      <p className="font-serif text-[17px] leading-relaxed max-w-2xl">
        Nothing plays until you ask it to. Tap once to begin, and it will keep playing while you
        move through the site.
      </p>

      <div className="bg-soft rounded-2xl p-5 my-5 max-w-2xl">
        <p className="font-serif text-base leading-relaxed m-0">
          <b>A word on silence.</b> The best preparation is sometimes no sound at all.{" "}
          <em>Be still, and know that I am God</em> (Psalm 46:10). Use the music where it helps
          you settle, and the silence where it helps you more. A teacher who can sit quietly with
          an open Bible for twenty minutes has a gift worth more than any playlist.
        </p>
      </div>

      <p className="font-serif text-[17px] leading-relaxed max-w-2xl">
        Songs that preach. Every song gathered here points to Christ and to his finished work —
        not to our striving, not to our fear, not to what we must do to be accepted. Sing them in
        the car, in the kitchen, before the meeting, and let the doctrine go in with the melody.
        People remember what they sing long after they forget what they were told.
      </p>

      {dbError && (
        <div className="border border-dashed border-line rounded-2xl p-5 text-center text-muted text-sm leading-relaxed mt-4">
          The listening library isn&rsquo;t connected yet. Once the database is live, entries the
          committee adds will appear here.
        </div>
      )}

      {!dbError && study.length === 0 && worship.length === 0 && (
        <div className="border border-dashed border-line rounded-2xl p-5 text-center text-muted text-sm leading-relaxed mt-4">
          Nothing published yet. The committee can add the first entries from the admin area.
        </div>
      )}

      {!dbError && (study.length > 0 || worship.length > 0) && (
        <SelahBrowser study={study} worship={worship} />
      )}

      <div className="h-8" />
    </div>
  );
}
