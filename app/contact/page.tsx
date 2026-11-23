import type { Metadata } from "next";
import { SITE } from "@/lib/content/curriculum";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-4">
      <div
        className="rounded-2xl p-5 text-white mt-4 mb-5"
        style={{ background: "linear-gradient(160deg, var(--navy2), var(--navy))" }}
      >
        <div className="text-[11px] tracking-[0.2em] uppercase opacity-80 font-bold">
          Get in touch
        </div>
        <h1 className="text-[26px] mt-1.5 mb-2 text-white font-display font-semibold">Contact</h1>
        <div className="font-serif italic text-[16px] leading-relaxed opacity-95">
          {SITE.id.parish} · {SITE.id.place}
        </div>
      </div>

      <div className="bg-card border border-line rounded-2xl p-[18px] space-y-4">
        <div>
          <div className="text-[10.5px] font-bold tracking-[0.13em] uppercase text-muted mb-1">
            Bible Study Committee
          </div>
          <p className="font-serif text-base leading-relaxed m-0">
            To fix dates for the School of the Word, invite a guest teacher, or ask about anything
            on this site, speak to the Bible Study Committee.
          </p>
        </div>

        <div className="border border-dashed border-claret/40 bg-soft rounded-xl p-3.5 text-[13.5px] leading-relaxed">
          <b className="text-claret">Placeholder — awaiting confirmed details.</b> Replace with the
          parish-approved contact email and phone number.
          <div className="font-mono mt-2 text-ink/70">
            email: [PLACEHOLDER — committee email]
            <br />
            phone: [PLACEHOLDER — committee phone]
          </div>
        </div>

        <div>
          <div className="text-[10.5px] font-bold tracking-[0.13em] uppercase text-muted mb-1">
            Parish
          </div>
          <p className="font-serif text-base leading-relaxed m-0">
            {SITE.id.parish}
            <br />
            {SITE.id.place}
          </p>
        </div>
      </div>
      <div className="h-8" />
    </div>
  );
}
