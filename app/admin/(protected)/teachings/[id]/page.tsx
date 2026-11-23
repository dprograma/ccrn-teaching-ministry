import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { TeachingForm } from "../teaching-form";

export default async function EditTeachingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const teaching = await prisma.teaching.findUnique({ where: { id } });
  if (!teaching) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-5">Edit teaching</h1>
      <TeachingForm teaching={teaching} />
    </div>
  );
}
