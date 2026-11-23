"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { uploadBlob, deleteBlob } from "@/lib/blob";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  return session.user;
}

export async function addNewsPhoto(formData: FormData) {
  const user = await requireAdmin();

  const file = formData.get("photo") as File | null;
  if (!file || file.size === 0) throw new Error("Choose a photo to upload.");
  const caption = ((formData.get("caption") as string) || "").trim() || null;

  let url: string;
  try {
    url = await uploadBlob(`news-photos/${Date.now()}-${file.name}`, file, file.type);
  } catch (e) {
    throw new Error(
      `Could not upload the photo — file storage isn't configured yet (${(e as Error).message}).`,
    );
  }

  const count = await prisma.newsPhoto.count();
  await prisma.newsPhoto.create({
    data: { url, caption, position: count, createdById: user.id },
  });

  revalidatePath("/admin/news");
  revalidatePath("/news");
  redirect("/admin/news");
}

export async function deleteNewsPhoto(id: string) {
  await requireAdmin();
  const existing = await prisma.newsPhoto.findUnique({ where: { id } });
  await prisma.newsPhoto.delete({ where: { id } });
  if (existing?.url) {
    try {
      await deleteBlob(existing.url);
    } catch {
      // best-effort cleanup
    }
  }
  revalidatePath("/admin/news");
  revalidatePath("/news");
}
