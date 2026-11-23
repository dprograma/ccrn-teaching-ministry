"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { uploadBlob } from "@/lib/blob";
import { parseChapters } from "@/lib/ebooks/chapters";

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

export async function saveEbook(formData: FormData) {
  const user = await requireAdmin();

  const id = (formData.get("id") as string) || undefined;
  const title = (formData.get("title") as string)?.trim();
  if (!title) throw new Error("Title is required.");

  const subtitle = ((formData.get("subtitle") as string) || "").trim() || null;
  const description = ((formData.get("description") as string) || "").trim();
  const seriesLabel = ((formData.get("seriesLabel") as string) || "").trim() || null;
  const status = formData.get("status") === "PUBLISHED" ? "PUBLISHED" : "DRAFT";
  const chaptersRaw = (formData.get("chaptersText") as string) || "";
  const chapters = parseChapters(chaptersRaw);

  let coverUrl: string | undefined;
  const coverFile = formData.get("cover") as File | null;
  if (coverFile && coverFile.size > 0) {
    try {
      coverUrl = await uploadBlob(`ebook-covers/${Date.now()}-${coverFile.name}`, coverFile, coverFile.type);
    } catch (e) {
      throw new Error(
        `Could not upload cover — file storage isn't configured yet (${(e as Error).message}).`,
      );
    }
  }

  const slugBase = slugify(title);

  if (id) {
    const existing = await prisma.eBook.findUnique({ where: { id } });
    if (!existing) throw new Error("Book not found.");
    await prisma.eBookChapter.deleteMany({ where: { ebookId: id } });
    await prisma.eBook.update({
      where: { id },
      data: {
        title,
        subtitle,
        description,
        seriesLabel,
        status,
        ...(coverUrl ? { coverUrl } : {}),
        chapters: {
          create: chapters.map((c, i) => ({ position: i, title: c.title, content: c.content })),
        },
      },
    });
  } else {
    let slug = slugBase;
    let n = 1;
    while (await prisma.eBook.findUnique({ where: { slug } })) {
      slug = `${slugBase}-${++n}`;
    }
    const count = await prisma.eBook.count();
    await prisma.eBook.create({
      data: {
        slug,
        title,
        subtitle,
        description,
        seriesLabel,
        status,
        coverUrl,
        position: count,
        createdById: user.id,
        chapters: {
          create: chapters.map((c, i) => ({ position: i, title: c.title, content: c.content })),
        },
      },
    });
  }

  revalidatePath("/admin/ebooks");
  revalidatePath("/ebooks");
  redirect("/admin/ebooks");
}

export async function deleteEbook(id: string) {
  await requireAdmin();
  await prisma.eBook.delete({ where: { id } });
  revalidatePath("/admin/ebooks");
  revalidatePath("/ebooks");
}
