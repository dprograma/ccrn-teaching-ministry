import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getTeaching(slug: string) {
  return prisma.teaching.findUnique({ where: { slug } });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const t = await getTeaching(slug);
    return { title: t?.title ?? "Teaching" };
  } catch {
    return { title: "Teaching" };
  }
}

export default async function TeachingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let teaching;
  try {
    teaching = await getTeaching(slug);
  } catch {
    notFound();
  }
  if (!teaching || teaching.status !== "PUBLISHED") notFound();

  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="mt-5 mb-4">
        <div className="flex items-center gap-2 text-[12.5px] text-muted font-semibold mb-1.5">
          {teaching.publishedAt && (
            <span>
              {new Intl.DateTimeFormat("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(teaching.publishedAt)}
            </span>
          )}
          {teaching.speaker && <span>· {teaching.speaker}</span>}
        </div>
        <h1 className="font-display text-[28px] font-semibold leading-[1.15]">
          {teaching.title}
        </h1>
        {teaching.scripture && (
          <div className="text-gold font-semibold text-[15px] mt-1.5">{teaching.scripture}</div>
        )}
      </div>

      <p className="font-serif italic text-[17px] leading-relaxed text-muted">
        {teaching.summary}
      </p>

      {teaching.videoUrl && (
        <div className="my-5">
          <a
            href={teaching.videoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-navy text-white font-semibold text-[14.5px]"
          >
            Watch the message ↗
          </a>
        </div>
      )}

      {teaching.body && (
        <div className="font-serif text-[17px] leading-[1.7] space-y-4 mt-5">
          {teaching.body.split(/\n{2,}/).map((para, i) => (
            <p key={i}>{para.trim()}</p>
          ))}
        </div>
      )}
      <div className="h-8" />
    </div>
  );
}
