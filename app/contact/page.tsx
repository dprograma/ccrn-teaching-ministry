import type { Metadata } from "next";
import { SITE } from "@/lib/content/curriculum";
import { Banner } from "@/components/ui/banner";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <Banner
        kicker="Get in touch"
        title="Contact"
        emphasis={`${SITE.id.parish} · ${SITE.id.place}`}
      />

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
