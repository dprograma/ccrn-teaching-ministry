import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { TeacherForm } from "../teacher-form";

export default async function EditTeacherPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const teacher = await prisma.teacher.findUnique({ where: { id } });
  if (!teacher) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-5">Edit teacher</h1>
      <TeacherForm teacher={teacher} />
    </div>
  );
}
