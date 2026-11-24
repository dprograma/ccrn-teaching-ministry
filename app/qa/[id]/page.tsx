import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { QA, findQa, findTheme, findModule, findSession, formatRef } from "@/lib/content/curriculum";
import { SourceBlock } from "@/components/ui/source-block";

export function generateStaticParams() {
  return QA.items.map((q) => ({ id: q.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const f = findQa(id);
  return { title: f ? `Question ${f.n}: ${f.q}` : "Question" };
}

function relLink(r: string) {
  if (r.startsWith("c") || r.startsWith("r")) {
    const t = findTheme(r);
    if (t) return { href: `/bible-study/${r}`, label: t.title };
  } else if (r.startsWith("t")) {
    const m = findModule(Number(r.slice(1)));
    if (m) return { href: `/teachers/${m.n}`, label: `Module ${m.n}: ${m.t}` };
  } else if (r.startsWith("w")) {
    const s = findSession(Number(r.slice(1)));
    if (s) return { href: `/school/workshop/${s.n}`, label: `Workshop ${s.n}: ${s.t}` };
  }
  return null;
}

export default async function QaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const f = findQa(id);
  if (!f) notFound();

  const others = QA.items.filter((x) => x.cat === f.cat && x.id !== f.id);
  const links = (f.rel ?? []).map(relLink).filter(Boolean) as { href: string; label: string }[];

  return (
    <div className="mx-auto max-w-3xl px-4">
      <div className="text-[11.5px] font-bold tracking-[0.13em] uppercase text-gold mt-4 mb-2">
        {f.cat}
      </div>
      <div className="inline-block text-[11px] font-bold tracking-[0.1em] uppercase text-gold bg-soft rounded-full px-2.5 py-1 mb-2.5">
        Question {f.n} of {QA.items.length}
      </div>
      <h1 className="text-[26px] leading-[1.18] mb-3 font-display font-semibold">{f.q}</h1>
      <div className="bg-soft rounded-2xl p-3.5 px-4 text-[16.5px] leading-snug font-semibold my-1 mb-4">
        {f.a}
      </div>
      {f.p.map((x, i) => (
        <p key={i} className="font-serif text-[17px] leading-relaxed mb-3.5">
          {x}
        </p>
      ))}

      <h3 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-muted mt-6 mb-2.5 pb-1.5 border-b border-line">
        Scripture answering Scripture
      </h3>
      <div className="bg-card border border-line rounded-2xl p-[18px]">
        {f.chain.map((c, i) => (
          <div
            key={i}
            className={`flex flex-col sm:flex-row gap-1 sm:gap-3 py-3 ${i < f.chain.length - 1 ? "border-b border-line" : ""}`}
          >
            <div className="sm:w-[106px] shrink-0">
              <b className="block font-display text-[15.5px] font-semibold text-gold leading-snug">
                {formatRef(c.r)}
              </b>
            </div>
            <div>
              <div className="font-serif italic text-base leading-relaxed">&ldquo;{c.t}&rdquo;</div>
              <div className="text-sm leading-relaxed text-muted mt-1">{c.s}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-navy text-[#F0EADC] rounded-2xl p-[18px] my-[18px]">
        <div className="text-[10.5px] font-bold tracking-[0.16em] uppercase text-goldl mb-1.5">
          And it ends in Christ
        </div>
        <p className="font-serif text-[16.5px] leading-relaxed m-0">{f.christ}</p>
      </div>

      <SourceBlock ccc={f.ccc} pope={f.pope} />

      <h3 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-muted mt-6 mb-2.5 pb-1.5 border-b border-line">
        Scripture
      </h3>
      <div className="font-serif text-[16.5px] leading-relaxed bg-card border border-line rounded-xl p-3.5 px-4">
        {f.refs.map(formatRef).join(" · ")}
      </div>

      {links.length > 0 && (
        <>
          <h3 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-muted mt-6 mb-2.5 pb-1.5 border-b border-line">
            Where this is taught
          </h3>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block w-full text-left px-3.5 py-3 rounded-xl bg-card border border-line mb-2 font-semibold text-[15px] leading-snug"
            >
              <span className="text-gold font-display mr-1">›</span>
              {l.label}
            </Link>
          ))}
        </>
      )}

      {others.length > 0 && (
        <>
          <h3 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-muted mt-6 mb-2.5 pb-1.5 border-b border-line">
            More in this group
          </h3>
          {others.map((o) => (
            <Link
              key={o.id}
              href={`/qa/${o.id}`}
              className="block w-full text-left px-3.5 py-3 rounded-xl bg-card border border-line mb-2 font-semibold text-[15px] leading-snug"
            >
              <b className="text-gold font-display">Q{o.n}</b> {o.q}
            </Link>
          ))}
        </>
      )}
      <div className="h-8" />
    </div>
  );
}
