import type { Metadata } from "next";
import { SCHOOL } from "@/lib/content/curriculum";
import { Banner } from "@/components/ui/banner";

export const metadata: Metadata = { title: "Advanced Doctrine" };

export default function ElectivesPage() {
  const e = SCHOOL.electives;
  return (
    <div className="mx-auto max-w-5xl px-4">
      <Banner
        color="#6B3F8C"
        kicker={`Track 4 · ${e.level}`}
        title={e.name}
        emphasis={e.blurb}
        meta={
          <>
            <b className="text-ink font-semibold">{e.series.length} series</b>
            <br />
            {e.who}
          </>
        }
      />

      <div className="grid sm:grid-cols-2 gap-4">
        {e.series.map((s) => (
          <div key={s.t} className="bg-card border border-line rounded-2xl p-[17px]">
            <h3 className="text-xl mb-1 leading-tight font-display font-semibold">
              {s.t}
              {s.n > 0 && (
                <span className="text-[13px] text-muted font-normal"> · {s.n} parts</span>
              )}
            </h3>
            <div className="text-sm text-muted leading-relaxed mb-2.5">{s.d}</div>
            <ol className="list-decimal pl-5 text-[15px] leading-relaxed space-y-1">
              {s.parts.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <div className="h-8" />
    </div>
  );
}
