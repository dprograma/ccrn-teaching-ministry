"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { QaItem } from "@/lib/content/types";

export function QaSearch({ items }: { items: QaItem[] }) {
  const [q, setQ] = useState("");

  const groups = useMemo(() => {
    const needle = q.toLowerCase().trim();
    const filtered = needle
      ? items.filter((f) => `${f.q} ${f.a} ${f.p.join(" ")}`.toLowerCase().includes(needle))
      : items;
    const byCat = new Map<string, QaItem[]>();
    for (const f of filtered) {
      const list = byCat.get(f.cat) ?? [];
      list.push(f);
      byCat.set(f.cat, list);
    }
    return Array.from(byCat.entries()).map(([cat, list]) => ({ cat, list }));
  }, [items, q]);

  const total = groups.reduce((a, g) => a + g.list.length, 0);

  return (
    <div>
      <input
        type="search"
        placeholder="Search, e.g. grace, tongues, Mary, prosperity"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search questions"
        className="w-full p-3.5 rounded-2xl border border-line bg-card text-ink text-base"
      />
      <div className="mt-3">
        {total === 0 && (
          <div className="text-center text-muted py-11 px-4 leading-relaxed">
            <b className="block font-display text-xl text-ink mb-1">Nothing found</b>
            Try another word.
          </div>
        )}
        {groups.map((g) => (
          <div key={g.cat} className="mb-5">
            <div className="text-[11.5px] font-bold tracking-[0.13em] uppercase text-gold mb-2">
              {g.cat}
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              {g.list.map((f) => (
                <Link
                  key={f.id}
                  href={`/qa/${f.id}`}
                  className="flex gap-3 items-start w-full text-left bg-card border border-line rounded-2xl p-3.5"
                >
                  <span className="w-[29px] h-[29px] rounded-full bg-navy text-goldl grid place-items-center font-display font-bold text-[17px] shrink-0">
                    {f.n}
                  </span>
                  <span className="font-semibold text-[15.5px] leading-snug">{f.q}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
