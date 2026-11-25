import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { TalkForm } from "../talk-form";

export default async function EditTalkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const talk = await prisma.teaching.findUnique({ where: { id } });
  if (!talk) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-5">Edit talk</h1>
      <TalkForm talk={talk} />
    </div>
  );
}
