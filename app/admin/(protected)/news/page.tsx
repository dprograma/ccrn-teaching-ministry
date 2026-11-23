import { prisma } from "@/lib/db";
import { addNewsPhoto, deleteNewsPhoto } from "@/lib/actions/news-photos";

export const dynamic = "force-dynamic";

export default async function AdminNewsPage() {
  const photos = await prisma.newsPhoto.findMany({ orderBy: { position: "asc" } });

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-5">News photos</h1>

      <form action={addNewsPhoto} className="border border-line rounded-xl p-4 mb-6 max-w-md space-y-3">
        <div>
          <label className="block text-[13px] font-semibold mb-1.5">Photo</label>
          <input type="file" name="photo" accept="image/*" required className="w-full text-sm" />
        </div>
        <div>
          <label className="block text-[13px] font-semibold mb-1.5">
            Caption <span className="text-muted font-normal">(optional)</span>
          </label>
          <input name="caption" className="w-full p-3 rounded-xl border border-line bg-card" />
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-full bg-navy text-white text-[13.5px] font-semibold"
        >
          Upload
        </button>
      </form>

      {photos.length === 0 && <p className="text-muted text-sm">No photos yet.</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {photos.map((p) => (
          <div key={p.id} className="border border-line rounded-xl overflow-hidden bg-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.url} alt={p.caption ?? ""} className="w-full aspect-square object-cover" />
            <div className="p-2 flex items-center justify-between gap-2">
              <span className="text-[11.5px] text-muted truncate">{p.caption ?? "—"}</span>
              <form
                action={async () => {
                  "use server";
                  await deleteNewsPhoto(p.id);
                }}
              >
                <button className="text-[11.5px] font-semibold text-claret">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
