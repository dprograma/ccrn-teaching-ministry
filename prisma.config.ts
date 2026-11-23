import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  // Used only by the Prisma CLI (migrate/studio/db push), e.g. against Neon's
  // direct (non-pooled) connection string. The running app never reads this —
  // it talks to Neon through the driver adapter in lib/db.ts instead.
  datasource: {
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  },
});
