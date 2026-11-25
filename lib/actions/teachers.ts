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

export async function saveTeacher(formData: FormData) {
  await requireAdmin();

  const id = (formData.get("id") as string) || undefined;
  const name = (formData.get("name") as string)?.trim();
  if (!name) throw new Error("Name is required.");
  const active = formData.get("active") === "on";

  if (id) {
    await prisma.teacher.update({ where: { id }, data: { name, active } });
  } else {
    await prisma.teacher.create({ data: { name, active } });
  }

  revalidatePath("/admin/teachers");
  revalidatePath("/upcoming-talks");
  redirect("/admin/teachers");
}

export async function deleteTeacher(id: string) {
  await requireAdmin();
  try {
    await prisma.teacher.delete({ where: { id } });
  } catch {
    throw new Error("This teacher has talks assigned — reassign or delete those first.");
  }
  revalidatePath("/admin/teachers");
  revalidatePath("/upcoming-talks");
}
