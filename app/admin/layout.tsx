import type { Metadata } from "next";
import { AuthSessionProvider } from "@/components/providers/auth-session-provider";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s — Admin — Teaching Ministry" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AuthSessionProvider>{children}</AuthSessionProvider>;
}
