/**
 * Seeds the eBook shelf from content already authored in the curriculum
 * (lib/content/curriculum.ts) — no new doctrinal text is invented here,
 * only reassembled into chapter form. The six Advanced Doctrine elective
 * books are seeded as skeletons (syllabus only, per SCHOOL.caveat) for the
 * committee to fill in through the admin area.
 *
 * Run with: npx prisma db seed   (after DATABASE_URL/DIRECT_URL point at a
 * real Neon database and `npx prisma migrate deploy` has been run).
 */
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { TEACHERS, DEFS, SCHOOL } from "../lib/content/curriculum";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set.");
}
const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function upsertBook(opts: {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  seriesLabel?: string;
  position: number;
  chapters: { title: string; content: string }[];
}) {
  const existing = await prisma.eBook.findUnique({ where: { slug: opts.slug } });
  if (existing) {
    await prisma.eBookChapter.deleteMany({ where: { ebookId: existing.id } });
    await prisma.eBook.update({
      where: { id: existing.id },
      data: {
        title: opts.title,
        subtitle: opts.subtitle,
        description: opts.description,
        seriesLabel: opts.seriesLabel,
        position: opts.position,
        status: "PUBLISHED",
        chapters: {
          create: opts.chapters.map((c, i) => ({ position: i, title: c.title, content: c.content })),
        },
      },
    });
    console.log(`Updated: ${opts.title}`);
    return;
  }
  await prisma.eBook.create({
    data: {
      slug: opts.slug,
      title: opts.title,
      subtitle: opts.subtitle,
      description: opts.description,
      seriesLabel: opts.seriesLabel,
      position: opts.position,
      status: "PUBLISHED",
      chapters: {
        create: opts.chapters.map((c, i) => ({ position: i, title: c.title, content: c.content })),
      },
    },
  });
  console.log(`Created: ${opts.title}`);
}

function teachTheTeacherChapters() {
  return TEACHERS.modules.map((m) => ({
    title: `Module ${m.n}: ${m.t}`,
    content: [
      m.purpose,
      `By the end, the teacher must be able to:\n${m.must.map((x) => `• ${x}`).join("\n")}`,
      `Core content:\n${m.out.map((x, i) => `${i + 1}. ${x}`).join("\n")}`,
      `Errors to avoid:\n${m.errors.map((x) => `• ${x}`).join("\n")}`,
      `Practice: ${m.practice}`,
      `Scripture: ${m.refs.join("; ")}`,
      m.ccc ? `From the Catechism (${m.ccc.n}): "${m.ccc.q}"${m.ccc.note ? ` — ${m.ccc.note}` : ""}` : "",
    ]
      .filter(Boolean)
      .join("\n\n"),
  }));
}

function sevenWaysChapters() {
  const intro = { title: "Introduction", content: DEFS.intro };
  const items = DEFS.items.map((w, i) => ({
    title: `${i + 1}. ${w.n}`,
    content: [
      w.one,
      w.what,
      `The aim: ${w.aim}`,
      `Marks of it done well:\n${w.marks.map((m) => `• ${m}`).join("\n")}`,
      `Scripture: ${w.refs.join("; ")}`,
      `Watch out: ${w.watch}`,
    ].join("\n\n"),
  }));
  const close = { title: "Closing word", content: DEFS.close };
  return [intro, ...items, close];
}

function electiveSkeletonChapters(parts: string[]) {
  return parts.map((p) => ({
    title: p,
    content:
      "This chapter's full content is still to be written by the Bible Study Committee — add it here through the admin area.",
  }));
}

async function main() {
  await upsertBook({
    slug: "teach-the-teacher",
    title: "Teach the Teacher",
    subtitle: "Nine Modules for Bible Facilitators",
    description:
      "The ministry's full teacher-formation curriculum, basic to advanced, gathered into one volume — what a Bible teacher is, how to handle the text soundly, and how to carry a lesson from explanation to transformation.",
    seriesLabel: "Teacher Formation",
    position: 1,
    chapters: teachTheTeacherChapters(),
  });

  await upsertBook({
    slug: "seven-ways-of-handling-the-word",
    title: "The Seven Ways of Handling the Word",
    description:
      "Bible study, teaching, preaching, exhortation, sharing the word, saying the word and evangelising with the word — what each one is, what it is for, and how to tell them apart.",
    seriesLabel: "Teacher Formation",
    position: 2,
    chapters: sevenWaysChapters(),
  });

  await Promise.all(
    SCHOOL.electives.series.map((s, i) =>
      upsertBook({
        slug: slugify(s.t),
        title: s.t,
        description: s.d,
        seriesLabel: "Advanced Doctrine",
        position: 3 + i,
        chapters: electiveSkeletonChapters(s.parts),
      }),
    ),
  );

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
