import { saveTalk } from "@/lib/actions/past-talks";

export function TalkForm({
  talk,
}: {
  talk?: {
    id: string;
    title: string;
    speaker: string | null;
    scripture: string | null;
    summary: string;
    body: string | null;
    videoUrl: string | null;
    status: string;
  };
}) {
  return (
    <form action={saveTalk} className="space-y-5 max-w-2xl">
      {talk && <input type="hidden" name="id" value={talk.id} />}

      <div>
        <label className="block text-[13px] font-semibold mb-1.5">Title</label>
        <input
          name="title"
          required
          defaultValue={talk?.title}
          className="w-full p-3 rounded-xl border border-line bg-card"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[13px] font-semibold mb-1.5">
            Speaker <span className="text-muted font-normal">(optional)</span>
          </label>
          <input
            name="speaker"
            defaultValue={talk?.speaker ?? ""}
            className="w-full p-3 rounded-xl border border-line bg-card"
          />
        </div>
        <div>
          <label className="block text-[13px] font-semibold mb-1.5">
            Scripture <span className="text-muted font-normal">(optional)</span>
          </label>
          <input
            name="scripture"
            defaultValue={talk?.scripture ?? ""}
            className="w-full p-3 rounded-xl border border-line bg-card"
          />
        </div>
      </div>

      <div>
        <label className="block text-[13px] font-semibold mb-1.5">Summary</label>
        <textarea
          name="summary"
          required
          rows={2}
          defaultValue={talk?.summary}
          className="w-full p-3 rounded-xl border border-line bg-card"
        />
      </div>

      <div>
        <label className="block text-[13px] font-semibold mb-1.5">
          Video link <span className="text-muted font-normal">(optional — official YouTube/Facebook/etc. link)</span>
        </label>
        <input
          name="videoUrl"
          type="url"
          defaultValue={talk?.videoUrl ?? ""}
          className="w-full p-3 rounded-xl border border-line bg-card"
        />
      </div>

      <div>
        <label className="block text-[13px] font-semibold mb-1.5">
          Write-up <span className="text-muted font-normal">(optional — separate paragraphs with a blank line)</span>
        </label>
        <textarea
          name="body"
          rows={10}
          defaultValue={talk?.body ?? ""}
          className="w-full p-3 rounded-xl border border-line bg-card"
        />
      </div>

      <div>
        <label className="block text-[13px] font-semibold mb-1.5">Status</label>
        <select
          name="status"
          defaultValue={talk?.status ?? "DRAFT"}
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
