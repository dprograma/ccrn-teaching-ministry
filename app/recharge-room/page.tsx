import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { RechargeBrowser } from "./recharge-browser";

export const metadata: Metadata = { title: "Recharge Room" };
export const dynamic = "force-dynamic";

export default async function RechargeRoomPage() {
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
    <div className="mx-auto max-w-5xl px-4">
      <div className="bg-soft rounded-2xl p-8 mt-4 mb-6 text-center border border-line">
        <h1 className="text-[34px] mb-2 text-ink font-display font-semibold tracking-wide">
          RECHARGE ROOM
        </h1>
        <p className="font-serif italic text-[17px] leading-relaxed text-muted m-0 max-w-md mx-auto">
          Music to pray and study by
        </p>
      </div>

      <div className="max-w-2xl mx-auto text-center mb-8">
        <p className="font-serif text-[17px] leading-relaxed">
          This room takes its spirit from &ldquo;Selah&rdquo; — a word that appears seventy-one
          times in the Psalms and three times in Habakkuk. It is a musical direction, and the old
          readers understood it as a pause — a lifting up, an instruction to stop and weigh what
          has just been said. That is what this page is for.
        </p>
        <p className="font-serif text-[17px] leading-relaxed">
          Nothing plays until you ask it to. Tap once to begin, and it will keep playing while you
          move through the site.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-8">
        <div className="bg-card border border-line rounded-2xl p-5">
          <div className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-gold mb-1.5">
            For study and quiet time
          </div>
          <p className="font-serif text-base leading-relaxed m-0">
            <b>A word on silence.</b> The best preparation is sometimes no sound at all.{" "}
            <em>Be still, and know that I am God</em> (Psalm 46:10). Use the music where it helps
            you settle, and the silence where it helps you more. A teacher who can sit quietly
            with an open Bible for twenty minutes has a gift worth more than any playlist.
          </p>
        </div>
        <div className="bg-card border border-line rounded-2xl p-5">
          <div className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-claret mb-1.5">
            For worship and praise
          </div>
          <p className="font-serif text-base leading-relaxed m-0">
            Songs that preach. Every song gathered here points to Christ and to his finished work
            — not to our striving, not to our fear, not to what we must do to be accepted. Sing
            them in the car, in the kitchen, before the meeting, and let the doctrine go in with
            the melody. People remember what they sing long after they forget what they were
            told.
          </p>
        </div>
      </div>

      {dbError && (
        <div className="border border-dashed border-line rounded-2xl p-5 text-center text-muted text-sm leading-relaxed">
          The listening library isn&rsquo;t connected yet. Once the database is live, entries the
          committee adds will appear here.
        </div>
      )}

      {!dbError && study.length === 0 && worship.length === 0 && (
        <div className="border border-dashed border-line rounded-2xl p-5 text-center text-muted text-sm leading-relaxed">
          Nothing published yet. The committee can add the first entries from the admin area.
        </div>
      )}

      {!dbError && (study.length > 0 || worship.length > 0) && (
        <RechargeBrowser study={study} worship={worship} />
      )}

      <div className="h-8" />
    </div>
  );
}
