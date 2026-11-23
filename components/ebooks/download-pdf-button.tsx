"use client";

import { useState } from "react";
import { generateEbookPdf, hexToRgb01, type PdfBook } from "@/lib/pdf/generate-ebook-pdf";

export function DownloadPdfButton({
  book,
  accent,
}: {
  book: Omit<PdfBook, "accent">;
  accent: string;
}) {
  const [busy, setBusy] = useState(false);

  const onClick = async () => {
    setBusy(true);
    try {
      const bytes = await generateEbookPdf({ ...book, accent: hexToRgb01(accent) });
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${book.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={busy}
      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-navy text-white font-semibold text-[14.5px] disabled:opacity-60"
    >
      {busy ? "Preparing PDF…" : "Download PDF"}
    </button>
  );
}
