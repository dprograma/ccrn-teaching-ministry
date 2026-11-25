import { prisma } from "@/lib/db";
import { TalkAssignmentForm } from "../assignment-form";

export default async function NewTalkAssignmentPage() {
  const teachers = await prisma.teacher.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-5">New talk assignment</h1>
      <TalkAssignmentForm teachers={teachers} />
    </div>
  );
}
