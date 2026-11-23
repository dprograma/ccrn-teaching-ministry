"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/ebooks", label: "eBooks" },
  { href: "/admin/teachings", label: "Teachings" },
  { href: "/admin/selah", label: "Selah" },
  { href: "/admin/news", label: "News photos" },
];

export function AdminShell({
  children,
  userName,
}: {
  children: React.ReactNode;
  userName: string;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col sm:flex-row">
      <aside className="sm:w-56 shrink-0 bg-navy text-white sm:min-h-screen">
        <div className="p-4 font-display font-semibold text-lg">Committee admin</div>
        <nav className="flex sm:flex-col overflow-x-auto sm:overflow-visible px-2 pb-2 sm:pb-0 gap-1">
          {LINKS.map((l) => {
            const active = l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-2 rounded-lg text-[13.5px] whitespace-nowrap ${
                  active ? "bg-white/15 font-semibold" : "text-white/75 hover:bg-white/10"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto p-4 border-t border-white/10 hidden sm:block">
          <div className="text-[12.5px] text-white/70 mb-2 truncate">{userName}</div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-[12.5px] font-semibold text-goldl"
          >
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-5 sm:p-8 max-w-4xl">
        <div className="sm:hidden mb-4 flex items-center justify-between">
          <span className="text-[12.5px] text-muted truncate">{userName}</span>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-[12.5px] font-semibold text-claret"
          >
            Sign out
          </button>
        </div>
        {children}
      </main>
    </div>
  );
}
