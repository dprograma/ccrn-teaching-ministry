import { saveSelahEntry } from "@/lib/actions/selah";

export function SelahForm({
  entry,
}: {
  entry?: {
    id: string;
    title: string;
    language: string;
    section: string;
    description: string;
    sourceType: string;
    embedUrl: string | null;
    audioUrl: string | null;
    published: boolean;
  };
}) {
  return (
    <form action={saveSelahEntry} className="space-y-5 max-w-xl">
      {entry && <input type="hidden" name="id" value={entry.id} />}

      <div>
        <label className="block text-[13px] font-semibold mb-1.5">Title</label>
        <input
          name="title"
          required
          defaultValue={entry?.title}
          className="w-full p-3 rounded-xl border border-line bg-card"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[13px] font-semibold mb-1.5">Section</label>
          <select
            name="section"
            defaultValue={entry?.section ?? "STUDY"}
            className="w-full p-3 rounded-xl border border-line bg-card"
          >
            <option value="STUDY">For study and quiet time</option>
            <option value="WORSHIP">For worship and praise</option>
          </select>
        </div>
        <div>
          <label className="block text-[13px] font-semibold mb-1.5">Language</label>
          <select
            name="language"
            defaultValue={entry?.language ?? "ENGLISH"}
            className="w-full p-3 rounded-xl border border-line bg-card"
          >
            <option value="LATIN">Latin</option>
            <option value="YORUBA">Yoruba</option>
            <option value="IGBO">Igbo</option>
            <option value="HAUSA">Hausa</option>
            <option value="ENGLISH">English</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-[13px] font-semibold mb-1.5">
          Description <span className="text-muted font-normal">(one line — what it is, or which truth it carries)</span>
        </label>
        <input
          name="description"
          required
          defaultValue={entry?.description}
          className="w-full p-3 rounded-xl border border-line bg-card"
        />
      </div>

      <div className="border border-line rounded-xl p-4 space-y-4">
        <div>
          <label className="block text-[13px] font-semibold mb-1.5">Source</label>
          <select
            name="sourceType"
            defaultValue={entry?.sourceType ?? "EMBED"}
            className="w-full p-3 rounded-xl border border-line bg-card"
          >
            <option value="EMBED">Official link (YouTube, Spotify, the artist&rsquo;s channel)</option>
            <option value="HOSTED">The ministry&rsquo;s own recording (uploaded here)</option>
          </select>
        </div>

        <div>
          <label className="block text-[13px] font-semibold mb-1.5">
            Official link <span className="text-muted font-normal">(required if Source is &ldquo;Official link&rdquo;)</span>
          </label>
          <input
            name="embedUrl"
            type="url"
            placeholder="https://www.youtube.com/watch?v=…"
            defaultValue={entry?.embedUrl ?? ""}
            className="w-full p-3 rounded-xl border border-line bg-card"
          />
        </div>

        <div>
          <label className="block text-[13px] font-semibold mb-1.5">
            Upload recording{" "}
            <span className="text-muted font-normal">
              (required if Source is &ldquo;the ministry&rsquo;s own recording&rdquo; — only the
              ministry&rsquo;s own copyrighted-free material)
            </span>
          </label>
          {entry?.audioUrl && (
            <audio controls src={entry.audioUrl} className="w-full mb-2" />
          )}
          <input type="file" name="audio" accept="audio/*" className="w-full text-sm" />
        </div>
      </div>

      <label className="flex items-center gap-2.5">
        <input type="checkbox" name="published" defaultChecked={entry?.published ?? false} />
        <span className="text-[13.5px] font-semibold">Published (visible on the Selah page)</span>
      </label>

      <button
        type="submit"
        className="px-5 py-3 rounded-full bg-navy text-white font-semibold text-[14.5px]"
      >
        Save
      </button>
    </form>
  );
}
