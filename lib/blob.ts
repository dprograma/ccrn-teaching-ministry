import { put, del } from "@vercel/blob";

/**
 * Thin wrapper around Vercel Blob, used for the only files this site serves
 * itself: uploaded book covers, the ministry's own Selah recordings, and
 * news photos. Everything else (Selah embeds) links to the official source
 * instead of being hosted here.
 */
export async function uploadBlob(path: string, file: File | Blob, contentType?: string) {
  const result = await put(path, file, {
    access: "public",
    addRandomSuffix: true,
    contentType,
  });
  return result.url;
}

export async function deleteBlob(url: string) {
  await del(url);
}
