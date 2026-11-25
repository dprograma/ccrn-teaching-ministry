import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { TalkAssignmentForm } from "../assignment-form";

export default async function EditTalkAssignmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [assignment, teachers] = await Promise.all([
    prisma.talkAssignment.findUnique({ where: { id } }),
    prisma.teacher.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!assignment) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-5">Edit talk assignment</h1>
      <TalkAssignmentForm assignment={assignment} teachers={teachers} />
    </div>
  );
}
