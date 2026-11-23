import { Crest } from "@/components/crest";
import { Tile } from "@/components/ui/tile";
import { SITE, COMMUNITY } from "@/lib/content/curriculum";

const totalLessons = COMMUNITY.reduce((a, t) => a + t.lessons.length, 0);

const icon = {
  book: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round">
      <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z" />
      <path d="M5 17a3 3 0 0 1 3-3h11" />
    </svg>
  ),
  cap: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round">
      <path d="M2 9l10-5 10 5-10 5z" />
      <path d="M6 11v5c3 2 9 2 12 0v-5" />
    </svg>
  ),
  qa: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.3 2.4c-.5.2-.8.7-.8 1.2v.4M12 16.6v.2" />
    </svg>
  ),
  book3d: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round">
      <path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2z" />
      <path d="M18 3v18M7 7h7M7 10h7" />
    </svg>
  ),
  selah: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
      <path d="M9 18V5l11-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="17" cy="16" r="3" />
    </svg>
  ),
  news: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round">
      <path d="M4 5h13v14H5a1 1 0 0 1-1-1z" />
      <path d="M17 9h3v8a2 2 0 0 1-2 2M7 9h7M7 13h7M7 16h4" />
    </svg>
  ),
  teachings: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
      <path d="M12 3l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9L6.7 19.5l1.1-6L3.4 9.3l6-.8z" />
    </svg>
  ),
};

export default function Home() {
  return (
    <div>
      <div className="bg-gradient-to-b from-navy2 to-navy text-[#F0EADC] rounded-b-[26px] px-5 pt-6 pb-8 text-center relative overflow-hidden">
        <Crest className="w-[62px] h-[62px] mx-auto mb-2.5 text-[#F0EADC]" />
        <div className="text-[10.5px] tracking-[0.24em] uppercase text-goldl font-bold leading-relaxed">
          Teaching Ministry
          <br />
          Catholic Charismatic Renewal
        </div>
        <h1 className="font-display text-[clamp(26px,6.4vw,36px)] leading-[1.08] mt-2 font-bold tracking-tight text-white">
          Knowing Christ and Living the Christian Life
        </h1>
        <p className="font-serif italic text-[16.5px] opacity-90 mt-2">
          Bible Study · Teacher Formation · Workshops
        </p>
        <div className="mt-3.5 pt-3 border-t border-white/15 font-display italic text-[17px] text-goldl">
          Otito dịrị Jesu
        </div>
        <div className="text-[11.5px] tracking-[0.07em] opacity-70 mt-1.5 leading-relaxed uppercase">
          Catholic Church of Epiphany, Ologolo · Lekki, Lagos
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4">
        <section className="my-6">
          <h2 className="text-[13px] font-bold tracking-[0.13em] uppercase text-muted mb-2.5">
            {SITE.id.ministry}
          </h2>
          <div className="bg-card border border-line rounded-2xl p-[18px]">
            <p className="font-serif text-base leading-relaxed m-0">{SITE.welcome}</p>
          </div>
        </section>

        <section className="my-6">
          <h2 className="text-[13px] font-bold tracking-[0.13em] uppercase text-muted mb-2.5">
            Find your way around
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-[11px]">
            <Tile href="/teachings" icon={icon.teachings} title="Teachings" subtitle="A growing archive of messages" />
            <Tile href="/bible-study" icon={icon.book} title="Bible Study" subtitle={`For the whole community · ${totalLessons} lessons`} />
            <Tile href="/teachers" icon={icon.cap} title="Teach the Teacher" subtitle="Facilitator formation · 9 modules" />
            <Tile href="/qa" icon={icon.qa} title="Questions & Answers" subtitle="Answers for teachers in the hall" />
            <Tile href="/school" icon={icon.cap} title="School of the Word" subtitle="4 tracks · 336 classes" />
            <Tile href="/ebooks" icon={icon.book3d} title="eBooks" subtitle="Read online or download" />
            <Tile href="/selah" icon={icon.selah} title="Selah" subtitle="Music to pray and study by" />
            <Tile href="/news" icon={icon.news} title="News" subtitle="What's happening in the ministry" />
          </div>
        </section>

        <section className="my-6">
          <h2 className="text-[13px] font-bold tracking-[0.13em] uppercase text-muted mb-2.5">
            Teacher&rsquo;s guiding question
          </h2>
          <div className="bg-soft rounded-2xl p-4 px-[18px]">
            <p className="font-serif italic text-[16.5px] leading-relaxed m-0">
              &ldquo;{SITE.guiding}&rdquo;
            </p>
          </div>
        </section>

        <section className="my-6 space-y-3.5">
          {SITE.prayers.map((p) => (
            <div key={p.t} className="bg-navy text-[#F0EADC] rounded-2xl p-5 text-center">
              <div className="text-[10.5px] tracking-[0.2em] uppercase text-goldl font-bold">
                {p.t}
              </div>
              <p className="font-serif italic text-[17px] leading-relaxed mt-2 whitespace-pre-line">
                {p.b}
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
