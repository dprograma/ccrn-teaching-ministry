"use client";

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export type PdfChapter = { title: string; content: string };

export type PdfBook = {
  title: string;
  subtitle?: string | null;
  description: string;
  seriesLabel?: string | null;
  accent: [number, number, number]; // 0–1 rgb
  chapters: PdfChapter[];
};

const PAGE_W = 432; // 6in at 72dpi
const PAGE_H = 648; // 9in at 72dpi
const MARGIN = 56;

function wrapText(text: string, font: import("pdf-lib").PDFFont, size: number, maxWidth: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const trial = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(trial, size) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = trial;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export async function generateEbookPdf(book: PdfBook): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(book.title);
  doc.setSubject(book.description);
  doc.setProducer("Teaching Ministry");

  const serif = await doc.embedFont(StandardFonts.TimesRoman);
  const serifBold = await doc.embedFont(StandardFonts.TimesRomanBold);
  const serifItalic = await doc.embedFont(StandardFonts.TimesRomanItalic);
  const sans = await doc.embedFont(StandardFonts.Helvetica);

  const [r, g, b] = book.accent;
  const accent = rgb(r, g, b);
  const gold = rgb(0.69, 0.54, 0.19);
  const ivory = rgb(0.969, 0.957, 0.929);
  const ink = rgb(0.078, 0.102, 0.141);

  // ── Cover page ────────────────────────────────────────────────
  const cover = doc.addPage([PAGE_W, PAGE_H]);
  cover.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: accent });
  cover.drawRectangle({
    x: 14,
    y: 14,
    width: PAGE_W - 28,
    height: PAGE_H - 28,
    borderColor: gold,
    borderWidth: 1,
    borderOpacity: 0.5,
  });

  if (book.seriesLabel) {
    const label = book.seriesLabel.toUpperCase();
    const w = sans.widthOfTextAtSize(label, 10);
    cover.drawText(label, {
      x: (PAGE_W - w) / 2,
      y: PAGE_H - 140,
      size: 10,
      font: sans,
      color: gold,
    });
  }

  const titleLines = wrapText(book.title, serifBold, 26, PAGE_W - MARGIN * 2);
  let ty = PAGE_H / 2 + (titleLines.length * 30) / 2;
  for (const line of titleLines) {
    const w = serifBold.widthOfTextAtSize(line, 26);
    cover.drawText(line, { x: (PAGE_W - w) / 2, y: ty, size: 26, font: serifBold, color: ivory });
    ty -= 32;
  }

  const imprint = "TEACHING MINISTRY";
  const iw = sans.widthOfTextAtSize(imprint, 9);
  cover.drawText(imprint, { x: (PAGE_W - iw) / 2, y: 60, size: 9, font: sans, color: gold });

  // ── Title / description page ─────────────────────────────────
  const titlePage = doc.addPage([PAGE_W, PAGE_H]);
  let y = PAGE_H - 120;
  const twLines = wrapText(book.title, serifBold, 22, PAGE_W - MARGIN * 2);
  for (const line of twLines) {
    titlePage.drawText(line, { x: MARGIN, y, size: 22, font: serifBold, color: ink });
    y -= 28;
  }
  if (book.subtitle) {
    y -= 6;
    const subLines = wrapText(book.subtitle, serifItalic, 14, PAGE_W - MARGIN * 2);
    for (const line of subLines) {
      titlePage.drawText(line, { x: MARGIN, y, size: 14, font: serifItalic, color: ink });
      y -= 18;
    }
  }
  y -= 24;
  const descLines = wrapText(book.description, serif, 11, PAGE_W - MARGIN * 2);
  for (const line of descLines) {
    titlePage.drawText(line, { x: MARGIN, y, size: 11, font: serif, color: ink });
    y -= 16;
  }

  y -= 30;
  titlePage.drawText("CONTENTS", { x: MARGIN, y, size: 10, font: sans, color: gold });
  y -= 20;
  book.chapters.forEach((ch, i) => {
    if (y < MARGIN) return;
    titlePage.drawText(`${i + 1}.  ${ch.title}`, {
      x: MARGIN,
      y,
      size: 11,
      font: serif,
      color: ink,
    });
    y -= 17;
  });

  // ── Chapters ──────────────────────────────────────────────────
  for (const [i, ch] of book.chapters.entries()) {
    let page = doc.addPage([PAGE_W, PAGE_H]);
    let cy = PAGE_H - 70;

    const kicker = `CHAPTER ${i + 1}`;
    page.drawText(kicker, { x: MARGIN, y: cy, size: 9, font: sans, color: gold });
    cy -= 22;

    const headLines = wrapText(ch.title, serifBold, 18, PAGE_W - MARGIN * 2);
    for (const line of headLines) {
      page.drawText(line, { x: MARGIN, y: cy, size: 18, font: serifBold, color: ink });
      cy -= 24;
    }
    cy -= 10;

    const paragraphs = ch.content.split(/\n{2,}/).filter(Boolean);
    for (const para of paragraphs) {
      const lines = wrapText(para.trim(), serif, 10.5, PAGE_W - MARGIN * 2);
      for (const line of lines) {
        if (cy < MARGIN) {
          page = doc.addPage([PAGE_W, PAGE_H]);
          cy = PAGE_H - 60;
        }
        page.drawText(line, { x: MARGIN, y: cy, size: 10.5, font: serif, color: ink });
        cy -= 15;
      }
      cy -= 10;
    }
  }

  // ── Page numbers (skip cover) ────────────────────────────────
  const pages = doc.getPages();
  pages.forEach((p, i) => {
    if (i === 0) return;
    const label = String(i);
    const w = sans.widthOfTextAtSize(label, 9);
    p.drawText(label, { x: (PAGE_W - w) / 2, y: 28, size: 9, font: sans, color: rgb(0.5, 0.5, 0.5) });
  });

  return doc.save();
}

export function hexToRgb01(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return [r, g, b];
}
