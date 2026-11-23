import type { Metadata } from "next";
import { SCHOOL } from "@/lib/content/curriculum";

export const metadata: Metadata = { title: "Advanced Doctrine" };

export default function ElectivesPage() {
  const e = SCHOOL.electives;
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-2xl p-5 text-white mt-4 mb-4" style={{ background: "#6B3F8C" }}>
        <div className="text-[11px] tracking-[0.2em] uppercase opacity-80 font-bold">
          Track 4 · {e.level}
        </div>
        <h1 className="text-[26px] mt-1.5 mb-2 text-white font-display font-semibold">
          {e.name}
        </h1>
        <div className="font-serif italic text-[16px] leading-relaxed opacity-95">{e.blurb}</div>
        <div className="text-[13px] mt-3 pt-3 border-t border-white/20 leading-relaxed">
          <b className="font-semibold">{e.series.length} series</b>
          <br />
          {e.who}
        </div>
      </div>

      {e.series.map((s) => (
        <div key={s.t} className="bg-card border border-line rounded-2xl p-[17px] mb-[11px]">
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
      <div className="h-8" />
    </div>
  );
}
