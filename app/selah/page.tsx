import type { Metadata } from "next";

export const metadata: Metadata = { title: "Selah" };

export default function SelahPage() {
  return (
    <div className="mx-auto max-w-xl px-4">
      <div
        className="rounded-2xl p-6 text-white mt-4 mb-5 text-center"
        style={{ background: "linear-gradient(160deg, var(--navy2), var(--navy))" }}
      >
        <h1 className="text-[30px] mb-2 text-white font-display font-semibold tracking-wide">
          SELAH
        </h1>
        <p className="font-serif italic text-[17px] leading-relaxed opacity-95 m-0">
          Music to pray and study by
        </p>
      </div>

      <p className="font-serif text-[17px] leading-relaxed">
        Selah appears seventy-one times in the Psalms and three times in Habakkuk. It is a musical
        direction, and the old readers understood it as a pause — a lifting up, an instruction to
        stop and weigh what has just been said. That is what this page is for.
      </p>
      <p className="font-serif text-[17px] leading-relaxed">
        Nothing plays until you ask it to. Tap once to begin, and it will keep playing while you
        move through the site.
      </p>

      <div className="bg-soft rounded-2xl p-5 my-5">
        <div className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-gold mb-1.5">
          For study and quiet time
        </div>
        <p className="font-serif text-base leading-relaxed">
          Music to keep underneath the work. These are instrumental and gentle, chosen so that
          they do not compete with the text in front of you. Start it, leave it, and let it hold
          the room while you prepare.
        </p>
        <p className="font-serif text-base leading-relaxed m-0">
          <b>A word on silence.</b> The best preparation is sometimes no sound at all.{" "}
          <em>Be still, and know that I am God</em> (Psalm 46:10). Use the music where it helps
          you settle, and the silence where it helps you more. A teacher who can sit quietly with
          an open Bible for twenty minutes has a gift worth more than any playlist.
        </p>
      </div>

      <div className="bg-soft rounded-2xl p-5 my-5">
        <div className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-claret mb-1.5">
          For worship and praise
        </div>
        <p className="font-serif text-base leading-relaxed m-0">
          Songs that preach. Every song gathered here points to Christ and to his finished work —
          not to our striving, not to our fear, not to what we must do to be accepted. Sing them
          in the car, in the kitchen, before the meeting, and let the doctrine go in with the
          melody. People remember what they sing long after they forget what they were told.
        </p>
      </div>

      <div className="border border-dashed border-line rounded-2xl p-5 text-center text-muted text-sm leading-relaxed">
        The listening library — organised by language, with the persistent player — is being
        built. Every entry will link to its official source, except the ministry&rsquo;s own
        recordings, which we host ourselves.
      </div>
      <div className="h-8" />
    </div>
  );
}
