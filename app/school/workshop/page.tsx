import Link from "next/link";
import type { Metadata } from "next";
import { WORKSHOP } from "@/lib/content/curriculum";
import { Banner } from "@/components/ui/banner";

export const metadata: Metadata = { title: "Bible Study Workshop & Special Sessions" };

export default function WorkshopPage() {
  return (
    <div className="mx-auto max-w-5xl px-4">
      <Banner
        color="var(--claret)"
        kicker="Advanced growth & depth"
        title="Bible Study Workshop & Special Sessions"
        emphasis="Eight subjects, held three times in the year and taught by teachers within the fellowship."
      />

      <p className="text-muted text-sm mb-5 max-w-2xl">{WORKSHOP.intro}</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {WORKSHOP.sessions.map((s) => (
          <Link
            key={s.n}
            href={`/school/workshop/${s.n}`}
            className="block w-full text-left bg-card border border-line rounded-2xl p-[17px]"
          >
            <span className="block text-[10.5px] font-bold tracking-[0.14em] uppercase text-claret">
              Session {s.n}
            </span>
            <h3 className="text-xl mt-1 mb-1 leading-tight font-display font-semibold">{s.t}</h3>
            <p className="m-0 text-sm text-muted leading-relaxed">{s.purpose}</p>
          </Link>
        ))}
      </div>
      <div className="h-8" />
    </div>
  );
}
