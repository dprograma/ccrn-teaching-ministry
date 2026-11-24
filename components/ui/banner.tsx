import type { ReactNode } from "react";

/**
 * The page header used across the site: white/card background with a
 * coloured accent (left rule + kicker label), rather than a full-bleed
 * colour fill. Keeps the brand colour (navy, or a theme/module accent)
 * as a marker rather than as most of the page's visual weight.
 */
export function Banner({
  color = "var(--navy)",
  kicker,
  title,
  emphasis,
  meta,
}: {
  color?: string;
  kicker: string;
  title: string;
  emphasis?: string;
  meta?: ReactNode;
}) {
  return (
    <div className="relative bg-card border border-line rounded-2xl pl-6 pr-5 py-6 mt-4 mb-6 overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: color }} />
      <div className="text-[11px] tracking-[0.2em] uppercase font-bold" style={{ color }}>
        {kicker}
      </div>
      <h1 className="text-[28px] sm:text-[32px] leading-[1.12] mt-2 mb-2 font-display font-semibold tracking-tight">
        {title}
      </h1>
      {emphasis && (
        <div className="font-serif italic text-[16px] sm:text-[17px] leading-relaxed text-muted max-w-2xl">
          {emphasis}
        </div>
      )}
      {meta && (
        <div className="text-[13px] mt-4 pt-3.5 border-t border-line leading-relaxed text-muted">
          {meta}
        </div>
      )}
    </div>
  );
}
