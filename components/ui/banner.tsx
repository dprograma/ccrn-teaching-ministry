import type { ReactNode } from "react";

export function Banner({
  color,
  kicker,
  title,
  emphasis,
  children,
}: {
  color: string;
  kicker: string;
  title: string;
  emphasis?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className="rounded-2xl p-5 text-white mt-4 mb-2"
      style={{ background: color }}
    >
      <div className="text-[11px] tracking-[0.2em] uppercase opacity-80 font-bold">
        {kicker}
      </div>
      <h1 className="text-[26px] leading-[1.12] mt-1.5 mb-2 text-white font-display font-semibold">
        {title}
      </h1>
      {emphasis && (
        <div className="font-serif italic text-[16px] leading-relaxed opacity-95">
          {emphasis}
        </div>
      )}
      {children}
    </div>
  );
}
