"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  return session.user;
}

export async function saveTalkAssignment(formData: FormData) {
  const user = await requireAdmin();

  const id = (formData.get("id") as string) || undefined;
  const topic = (formData.get("topic") as string)?.trim();
  if (!topic) throw new Error("Topic is required.");
  const description = (formData.get("description") as string)?.trim();
  if (!description) throw new Error("A brief description is required.");
  const teacherId = formData.get("teacherId") as string;
  if (!teacherId) throw new Error("Choose the teacher this talk is assigned to.");
  const scheduledAtRaw = formData.get("scheduledAt") as string;
  if (!scheduledAtRaw) throw new Error("Date and time of delivery is required.");
  const scheduledAt = new Date(scheduledAtRaw);
  if (Number.isNaN(scheduledAt.getTime())) throw new Error("Invalid date and time.");

  const data = { topic, description, teacherId, scheduledAt };

  if (id) {
    await prisma.talkAssignment.update({ where: { id }, data });
  } else {
    await prisma.talkAssignment.create({ data: { ...data, createdById: user.id } });
  }

  revalidatePath("/admin/upcoming-talks");
  revalidatePath("/upcoming-talks");
  redirect("/admin/upcoming-talks");
}

export async function deleteTalkAssignment(id: string) {
  await requireAdmin();
  await prisma.talkAssignment.delete({ where: { id } });
  revalidatePath("/admin/upcoming-talks");
  revalidatePath("/upcoming-talks");
}
