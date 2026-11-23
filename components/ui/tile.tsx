import Link from "next/link";
import type { ReactNode } from "react";

export function Tile({
  href,
  icon,
  title,
  subtitle,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <Link
      href={href}
      className="bg-card border border-line rounded-2xl px-3.5 py-4 flex flex-col items-start gap-2.5 text-left min-h-[106px]"
    >
      <span className="w-[38px] h-[38px] rounded-[11px] bg-navy text-goldl grid place-items-center">
        {icon}
      </span>
      <b className="block text-[14.5px] font-bold leading-tight">{title}</b>
      <small className="block text-muted text-[12.5px] leading-snug -mt-1.5">{subtitle}</small>
    </Link>
  );
}
