import type { SourceRef, PopeRef } from "@/lib/content/types";

function Block({ label, quote, note }: { label: string; quote: string; note?: string }) {
  return (
    <div className="relative border border-line rounded-2xl p-4 px-[17px] my-4 bg-card">
      <div
        className="absolute left-0 top-3.5 bottom-3.5 w-[3px] rounded-[3px]"
        style={{ background: "var(--goldl)" }}
      />
      <div className="flex items-center gap-1.5 text-[10.5px] font-bold tracking-[0.13em] uppercase text-gold mb-1.5">
        {label}
      </div>
      <p className="font-serif italic text-[16.5px] leading-relaxed m-0">“{quote}”</p>
      {note && <div className="text-[12.5px] text-muted mt-1.5 not-italic">{note}</div>}
    </div>
  );
}

export function SourceBlock({ ccc, pope }: { ccc?: SourceRef; pope?: PopeRef }) {
  return (
    <>
      {ccc && <Block label={`From the Catechism · ${ccc.n}`} quote={ccc.q} note={ccc.note} />}
      {pope && (
        <Block
          label={`${pope.who} · ${pope.doc}, ${pope.yr}${pope.n ? ` · ${pope.n}` : ""}`}
          quote={pope.q}
          note={pope.note}
        />
      )}
    </>
  );
}
