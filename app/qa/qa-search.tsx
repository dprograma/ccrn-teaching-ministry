"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { QaItem } from "@/lib/content/types";

export function QaSearch({ items }: { items: QaItem[] }) {
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const needle = q.toLowerCase().trim();
    const filtered = needle
      ? items.filter((f) => `${f.q} ${f.a} ${f.p.join(" ")}`.toLowerCase().includes(needle))
      : items;
    return filtered.map((f, i) => ({
      item: f,
      showCat: i === 0 || filtered[i - 1].cat !== f.cat,
    }));
  }, [items, q]);

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
        {rows.length === 0 && (
          <div className="text-center text-muted py-11 px-4 leading-relaxed">
            <b className="block font-display text-xl text-ink mb-1">Nothing found</b>
            Try another word.
          </div>
        )}
        {rows.map(({ item: f, showCat }) => (
          <div key={f.id}>
            {showCat && (
              <div className="text-[11.5px] font-bold tracking-[0.13em] uppercase text-gold mt-5 mb-2">
                {f.cat}
              </div>
            )}
            <Link
              href={`/qa/${f.id}`}
              className="flex gap-3 items-start w-full text-left bg-card border border-line rounded-2xl p-3.5 mb-2"
            >
              <span className="w-[29px] h-[29px] rounded-full bg-navy text-goldl grid place-items-center font-display font-bold text-[17px] shrink-0">
                {f.n}
              </span>
              <span className="font-semibold text-[15.5px] leading-snug">{f.q}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
