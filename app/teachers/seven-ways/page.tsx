import type { Metadata } from "next";
import { DEFS, formatRef } from "@/lib/content/curriculum";
import { SourceBlock } from "@/components/ui/source-block";
import { Banner } from "@/components/ui/banner";

export const metadata: Metadata = { title: "The Seven Ways of Handling the Word" };

export default function SevenWaysPage() {
  return (
    <div className="mx-auto max-w-5xl px-4">
      <Banner
        kicker="Teacher formation · Module 1"
        title="Seven Ways of Handling the Word"
        emphasis="Every teacher in this ministry should know the difference, and be able to say which one he has been asked to do."
      />

      <p className="font-serif text-[17px] leading-relaxed max-w-2xl">{DEFS.intro}</p>

      <div className="grid lg:grid-cols-2 gap-4 mt-2">
        {DEFS.items.map((w, i) => (
          <div key={w.n} className="bg-card border border-line rounded-2xl p-[17px]">
          <div className="font-display text-[22px] font-bold leading-tight">
            {i + 1}. {w.n}
          </div>
          <div className="font-serif italic text-base leading-relaxed text-muted mt-1.5 mb-3">
            {w.one}
          </div>
          <p className="font-serif text-base leading-relaxed m-0">{w.what}</p>

          <div className="text-[10.5px] font-bold tracking-[0.12em] uppercase text-gold mt-3.5 mb-1">
            The aim
          </div>
          <p className="font-serif text-base leading-relaxed m-0">{w.aim}</p>

          <div className="text-[10.5px] font-bold tracking-[0.12em] uppercase text-gold mt-3.5 mb-1">
            Marks of it done well
          </div>
          <ul className="list-disc pl-[19px] text-[15px] leading-relaxed space-y-1">
            {w.marks.map((m, mi) => (
              <li key={mi}>{m}</li>
            ))}
          </ul>

          <div className="text-[10.5px] font-bold tracking-[0.12em] uppercase text-gold mt-3.5 mb-1">
            Scripture
          </div>
          <p className="text-[15px] m-0">{w.refs.map(formatRef).join(" · ")}</p>

          <div className="bg-soft rounded-[11px] p-3 px-3.5 mt-3.5 text-[15px] leading-relaxed">
            <b className="text-claret">Watch out:</b> {w.watch}
          </div>

          <SourceBlock pope={w.pope} />
        </div>
      ))}
      </div>

      <h3 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-muted mt-6 mb-2.5 pb-1.5 border-b border-line">
        At a glance
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13.5px] my-3">
          <thead>
            <tr>
              {DEFS.table.head.map((h, i) => (
                <th
                  key={i}
                  className="text-left py-2.5 px-2.5 border-b border-line text-[10.5px] tracking-[0.09em] uppercase text-muted font-bold"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DEFS.table.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`text-left py-2.5 px-2.5 border-b border-line align-top ${ci === 0 ? "font-bold whitespace-nowrap" : ""}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-soft rounded-2xl p-4 px-[18px] my-4">
        <p className="font-serif text-[16.5px] leading-relaxed m-0">{DEFS.close}</p>
      </div>
      <SourceBlock ccc={DEFS.ccc} />
      <div className="h-6" />
    </div>
  );
}
