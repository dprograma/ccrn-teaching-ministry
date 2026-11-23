import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { SelahForm } from "../selah-form";

export default async function EditSelahEntryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const entry = await prisma.selahEntry.findUnique({ where: { id } });
  if (!entry) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-5">Edit Selah entry</h1>
      <SelahForm entry={entry} />
    </div>
  );
}
