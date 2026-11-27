import type { Metadata, Viewport } from "next";
import { Fraunces, Source_Serif_4, Inter } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "@/components/selah/player-context";
import { SiteChrome } from "@/components/site-chrome";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Teaching Ministry — Catholic Charismatic Renewal",
    template: "%s — Teaching Ministry",
  },
  description:
    "Knowing Christ and Living the Christian Life — Bible Study, Teacher Formation, Workshops and the Recharge Room from the Teaching Ministry, Catholic Charismatic Renewal, Catholic Church of Epiphany, Ologolo, Lekki, Lagos.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#13294B",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${sourceSerif.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-bg text-ink">
        <PlayerProvider>
          <SiteChrome>{children}</SiteChrome>
        </PlayerProvider>
      </body>
    </html>
  );
}
