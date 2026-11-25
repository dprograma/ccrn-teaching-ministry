"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  return session.user;
}

export async function saveTalk(formData: FormData) {
  const user = await requireAdmin();

  const id = (formData.get("id") as string) || undefined;
  const title = (formData.get("title") as string)?.trim();
  if (!title) throw new Error("Title is required.");

  const speaker = ((formData.get("speaker") as string) || "").trim() || null;
  const scripture = ((formData.get("scripture") as string) || "").trim() || null;
  const summary = ((formData.get("summary") as string) || "").trim();
  const body = ((formData.get("body") as string) || "").trim() || null;
  const videoUrl = ((formData.get("videoUrl") as string) || "").trim() || null;
  const status = formData.get("status") === "PUBLISHED" ? "PUBLISHED" : "DRAFT";
  const publishedAt = status === "PUBLISHED" ? new Date() : null;

  if (id) {
    const existing = await prisma.teaching.findUnique({ where: { id } });
    if (!existing) throw new Error("Talk not found.");
    await prisma.teaching.update({
      where: { id },
      data: {
        title,
        speaker,
        scripture,
        summary,
        body,
        videoUrl,
        status,
        publishedAt: existing.publishedAt ?? publishedAt,
      },
    });
  } else {
    const slugBase = slugify(title);
    let slug = slugBase;
    let n = 1;
    while (await prisma.teaching.findUnique({ where: { slug } })) {
      slug = `${slugBase}-${++n}`;
    }
    await prisma.teaching.create({
      data: {
        slug,
        title,
        speaker,
        scripture,
        summary,
        body,
        videoUrl,
        status,
        publishedAt,
        createdById: user.id,
      },
    });
  }

  revalidatePath("/admin/past-talks");
  revalidatePath("/past-talks");
  redirect("/admin/past-talks");
}

export async function deleteTalk(id: string) {
  await requireAdmin();
  await prisma.teaching.delete({ where: { id } });
  revalidatePath("/admin/past-talks");
  revalidatePath("/past-talks");
}
