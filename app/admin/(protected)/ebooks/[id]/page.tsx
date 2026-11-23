import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { EbookForm } from "../ebook-form";

export default async function EditEbookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = await prisma.eBook.findUnique({
    where: { id },
    include: { chapters: { orderBy: { position: "asc" } } },
  });
  if (!book) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-5">Edit eBook</h1>
      <EbookForm book={book} />
    </div>
  );
}
