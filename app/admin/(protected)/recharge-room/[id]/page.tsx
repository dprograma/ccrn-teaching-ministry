import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { RechargeForm } from "../recharge-form";

export default async function EditRechargeEntryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const entry = await prisma.selahEntry.findUnique({ where: { id } });
  if (!entry) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-5">Edit Recharge Room entry</h1>
      <RechargeForm entry={entry} />
    </div>
  );
}
