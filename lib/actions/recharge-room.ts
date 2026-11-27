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

const LANGUAGES = ["LATIN", "YORUBA", "IGBO", "HAUSA", "ENGLISH"] as const;
const SECTIONS = ["STUDY", "WORSHIP"] as const;

export async function saveRechargeEntry(formData: FormData) {
  const user = await requireAdmin();

  const id = (formData.get("id") as string) || undefined;
  const title = (formData.get("title") as string)?.trim();
  if (!title) throw new Error("Title is required.");

  const language = formData.get("language") as string;
  if (!LANGUAGES.includes(language as (typeof LANGUAGES)[number])) {
    throw new Error("Choose a valid language.");
  }
  const section = formData.get("section") as string;
  if (!SECTIONS.includes(section as (typeof SECTIONS)[number])) {
    throw new Error("Choose a valid section.");
  }
  const description = ((formData.get("description") as string) || "").trim();
  const sourceType = formData.get("sourceType") === "HOSTED" ? "HOSTED" : "EMBED";
  const published = formData.get("published") === "on";

  let embedUrl: string | null = null;
  let audioUrl: string | null = null;

  if (sourceType === "EMBED") {
    embedUrl = ((formData.get("embedUrl") as string) || "").trim();
    if (!embedUrl) throw new Error("An official link is required for an embedded entry.");
  } else {
    const audioFile = formData.get("audio") as File | null;
    if (audioFile && audioFile.size > 0) {
      try {
        audioUrl = await uploadBlob(
          `selah-audio/${Date.now()}-${audioFile.name}`,
          audioFile,
          audioFile.type,
        );
      } catch (e) {
        throw new Error(
          `Could not upload the recording — file storage isn't configured yet (${(e as Error).message}).`,
        );
      }
    } else if (id) {
      const existing = await prisma.selahEntry.findUnique({ where: { id } });
      audioUrl = existing?.audioUrl ?? null;
    }
    if (!audioUrl) throw new Error("Upload the ministry's recording for a hosted entry.");
  }

  const data = {
    title,
    language: language as (typeof LANGUAGES)[number],
    section: section as (typeof SECTIONS)[number],
    description,
    sourceType: sourceType as "EMBED" | "HOSTED",
    embedUrl,
    audioUrl,
    published,
  };

  if (id) {
    await prisma.selahEntry.update({ where: { id }, data });
  } else {
    const count = await prisma.selahEntry.count();
    await prisma.selahEntry.create({ data: { ...data, position: count, createdById: user.id } });
  }

  revalidatePath("/admin/recharge-room");
  revalidatePath("/recharge-room");
  redirect("/admin/recharge-room");
}

export async function deleteRechargeEntry(id: string) {
  await requireAdmin();
  const existing = await prisma.selahEntry.findUnique({ where: { id } });
  await prisma.selahEntry.delete({ where: { id } });
  if (existing?.sourceType === "HOSTED" && existing.audioUrl) {
    try {
      await deleteBlob(existing.audioUrl);
    } catch {
      // best-effort cleanup; the row is already gone either way
    }
  }
  revalidatePath("/admin/recharge-room");
  revalidatePath("/recharge-room");
}
