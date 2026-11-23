"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/lib/nav-items";
import { Crest } from "@/components/crest";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the drawer whenever the route changes (adjusting state during
  // render rather than in an effect, per React's guidance for this case).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-bg/95 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <Crest className="w-7 h-7 text-navy" />
          <span className="font-display font-semibold text-[15px] leading-tight text-ink hidden sm:block">
            Teaching Ministry
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-auto">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-full text-[13.5px] font-medium transition-colors ${
                isActive(pathname, item.href)
                  ? "bg-soft text-gold"
                  : "text-ink/80 hover:bg-soft hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className="lg:hidden ml-auto w-11 h-11 grid place-items-center rounded-xl hover:bg-soft"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-navy/40"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-[82vw] max-w-sm bg-card shadow-2xl transition-transform duration-200 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-16 flex items-center gap-2 px-5 border-b border-line">
            <Crest className="w-6 h-6 text-navy" />
            <span className="font-display font-semibold text-ink">Menu</span>
          </div>
          <nav className="p-3 flex flex-col">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-3 rounded-xl text-[15.5px] font-medium ${
                  isActive(pathname, item.href) ? "bg-soft text-gold" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="px-5 py-4 mt-auto text-[13px] text-muted border-t border-line">
            <em className="font-serif not-italic">Otito dịrị Jesu</em>
          </div>
        </div>
      </div>
    </header>
  );
}
