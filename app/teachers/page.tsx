import Link from "next/link";
import type { Metadata } from "next";
import { TEACHERS } from "@/lib/content/curriculum";

export const metadata: Metadata = { title: "Teach the Teacher" };

const ACCENTS = [
  "#13294B", "#8C2F39", "#5B4B8A", "#1E6B5B", "#8E6318",
  "#2A5A86", "#6B3F8C", "#2E6B3A", "#3F5166",
];

export default function TeachersPage() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div
        className="rounded-2xl p-5 text-white mt-4 mb-5"
        style={{ background: "linear-gradient(160deg, var(--navy2), var(--navy))" }}
      >
        <div className="text-[11px] tracking-[0.2em] uppercase opacity-80 font-bold">
          Bible facilitators&rsquo; training
        </div>
        <h1 className="text-[26px] mt-1.5 mb-2 text-white font-display font-semibold">
          Teach the Teacher
        </h1>
        <div className="font-serif italic text-[16px] leading-relaxed opacity-95">
          Basic to advanced. Nine modules to ground and equip every teacher of this ministry.
        </div>
      </div>

      <p className="text-muted text-sm mb-4">{TEACHERS.intro}</p>

      <Link
        href="/teachers/seven-ways"
        className="block w-full text-left bg-navy text-white rounded-2xl p-4 mb-4"
      >
        <span className="block text-[10.5px] font-bold tracking-[0.14em] uppercase text-goldl">
          Module 1 · Foundation
        </span>
        <span className="block font-display text-[19px] font-semibold mt-1">
          The Seven Ways of Handling the Word
        </span>
        <span className="block text-[13.5px] text-white/70 mt-1">
          Bible study, teaching, preaching, exhortation, sharing, saying the word, evangelising —
          what every teacher must know before standing anywhere.
        </span>
      </Link>

      {TEACHERS.modules.map((m) => (
        <Link
          key={m.n}
          href={`/teachers/${m.n}`}
          className="block w-full text-left bg-card border border-line rounded-2xl p-[17px] mb-[11px]"
        >
          <span
            className="block text-[10.5px] font-bold tracking-[0.14em] uppercase"
            style={{ color: ACCENTS[(m.n - 1) % ACCENTS.length] }}
          >
            Module {m.n} · {m.lvl}
          </span>
          <h3 className="text-xl mt-1 mb-1 leading-tight font-display font-semibold">{m.t}</h3>
          <p className="m-0 text-sm text-muted leading-relaxed">{m.purpose}</p>
        </Link>
      ))}
    </div>
  );
}
