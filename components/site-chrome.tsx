"use client";

import { usePathname } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SelahPlayerBar } from "@/components/selah/selah-player-bar";

/**
 * The admin area has its own sidebar/nav (AdminShell) and its own
 * full-height layout, so it must not also get the main site's top nav,
 * footer, and floating player bar from the root layout.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Nav />
      <main className="flex-1 pb-24">{children}</main>
      <Footer />
      <SelahPlayerBar />
    </>
  );
}
