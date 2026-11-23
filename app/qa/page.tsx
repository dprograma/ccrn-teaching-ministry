import type { Metadata } from "next";
import { QA } from "@/lib/content/curriculum";
import { QaSearch } from "./qa-search";

export const metadata: Metadata = { title: "Questions & Answers" };

export default function QaPage() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <p className="text-muted text-sm my-4">
        {QA.intro} Every answer is numbered, so a teacher can simply say &ldquo;Question{" "}
        {QA.items.length}&rdquo; and everyone turns to the same page.
      </p>
      <QaSearch items={QA.items} />
      <div className="h-8" />
    </div>
  );
}
