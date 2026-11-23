/**
 * Chapters are authored as one textarea: a line starting with "## " begins a
 * new chapter (its title is the rest of that line); everything after it,
 * until the next such line, is that chapter's content. Keeps the editor to
 * a single field instead of a repeating form-field-array widget.
 */
export function parseChapters(raw: string): { title: string; content: string }[] {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const chapters: { title: string; content: string[] }[] = [];
  for (const line of lines) {
    const m = line.match(/^##\s+(.+)$/);
    if (m) {
      chapters.push({ title: m[1].trim(), content: [] });
    } else if (chapters.length > 0) {
      chapters[chapters.length - 1].content.push(line);
    }
  }
  return chapters.map((c) => ({ title: c.title, content: c.content.join("\n").trim() }));
}

export function chaptersToTextarea(chapters: { title: string; content: string }[]) {
  return chapters.map((c) => `## ${c.title}\n\n${c.content}`).join("\n\n");
}
