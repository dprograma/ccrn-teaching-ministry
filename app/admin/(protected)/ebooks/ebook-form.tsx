import { saveEbook } from "@/lib/actions/ebooks";
import { chaptersToTextarea } from "@/lib/ebooks/chapters";

export function EbookForm({
  book,
}: {
  book?: {
    id: string;
    title: string;
    subtitle: string | null;
    description: string;
    seriesLabel: string | null;
    status: string;
    coverUrl: string | null;
    chapters: { title: string; content: string }[];
  };
}) {
  return (
    <form action={saveEbook} className="space-y-5 max-w-2xl">
      {book && <input type="hidden" name="id" value={book.id} />}

      <div>
        <label className="block text-[13px] font-semibold mb-1.5">Title</label>
        <input
          name="title"
          required
          defaultValue={book?.title}
          className="w-full p-3 rounded-xl border border-line bg-card"
        />
      </div>

      <div>
        <label className="block text-[13px] font-semibold mb-1.5">
          Subtitle <span className="text-muted font-normal">(optional)</span>
        </label>
        <input
          name="subtitle"
          defaultValue={book?.subtitle ?? ""}
          className="w-full p-3 rounded-xl border border-line bg-card"
        />
      </div>

      <div>
        <label className="block text-[13px] font-semibold mb-1.5">
          Series label <span className="text-muted font-normal">(shown on the cover, e.g. &ldquo;Teacher Formation&rdquo;)</span>
        </label>
        <input
          name="seriesLabel"
          defaultValue={book?.seriesLabel ?? ""}
          className="w-full p-3 rounded-xl border border-line bg-card"
        />
      </div>

      <div>
        <label className="block text-[13px] font-semibold mb-1.5">Description</label>
        <textarea
          name="description"
          required
          rows={3}
          defaultValue={book?.description}
          className="w-full p-3 rounded-xl border border-line bg-card"
        />
      </div>

      <div>
        <label className="block text-[13px] font-semibold mb-1.5">
          Cover image <span className="text-muted font-normal">(optional — leave blank to use the generated cover)</span>
        </label>
        {book?.coverUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={book.coverUrl} alt="" className="w-20 rounded mb-2 border border-line" />
        )}
        <input type="file" name="cover" accept="image/*" className="w-full text-sm" />
      </div>

      <div>
        <label className="block text-[13px] font-semibold mb-1.5">Chapters</label>
        <p className="text-[12.5px] text-muted mb-2">
          Start each chapter with a line beginning <code className="bg-soft px-1 rounded">## </code>{" "}
          followed by its title. Everything under it, until the next such line, is that chapter&rsquo;s
          content.
        </p>
        <textarea
          name="chaptersText"
          rows={18}
          defaultValue={book ? chaptersToTextarea(book.chapters) : "## Chapter one title\n\nChapter one content…"}
          className="w-full p-3 rounded-xl border border-line bg-card font-mono text-[13px] leading-relaxed"
        />
      </div>

      <div>
        <label className="block text-[13px] font-semibold mb-1.5">Status</label>
        <select
          name="status"
          defaultValue={book?.status ?? "DRAFT"}
          className="p-3 rounded-xl border border-line bg-card"
        >
          <option value="DRAFT">Draft (not visible on the public site)</option>
          <option value="PUBLISHED">Published</option>
        </select>
      </div>

      <button
        type="submit"
        className="px-5 py-3 rounded-full bg-navy text-white font-semibold text-[14.5px]"
      >
        Save
      </button>
    </form>
  );
}
