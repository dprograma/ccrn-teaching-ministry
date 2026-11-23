import Link from "next/link";
import type { Metadata } from "next";
import { WORKSHOP } from "@/lib/content/curriculum";

export const metadata: Metadata = { title: "Bible Study Workshop & Special Sessions" };

export default function WorkshopPage() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-2xl p-5 text-white mt-4 mb-4" style={{ background: "var(--claret)" }}>
        <div className="text-[11px] tracking-[0.2em] uppercase opacity-80 font-bold">
          Advanced growth &amp; depth
        </div>
        <h1 className="text-[26px] mt-1.5 mb-2 text-white font-display font-semibold">
          Bible Study Workshop &amp; Special Sessions
        </h1>
        <div className="font-serif italic text-[16px] leading-relaxed opacity-95">
          Eight subjects, held three times in the year and taught by teachers within the
          fellowship.
        </div>
      </div>

      <p className="text-muted text-sm mb-4">{WORKSHOP.intro}</p>

      {WORKSHOP.sessions.map((s) => (
        <Link
          key={s.n}
          href={`/school/workshop/${s.n}`}
          className="block w-full text-left bg-card border border-line rounded-2xl p-[17px] mb-[11px]"
        >
          <span className="block text-[10.5px] font-bold tracking-[0.14em] uppercase text-claret">
            Session {s.n}
          </span>
          <h3 className="text-xl mt-1 mb-1 leading-tight font-display font-semibold">{s.t}</h3>
          <p className="m-0 text-sm text-muted leading-relaxed">{s.purpose}</p>
        </Link>
      ))}
      <div className="h-8" />
    </div>
  );
}
