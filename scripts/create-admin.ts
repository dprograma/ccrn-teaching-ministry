/**
 * Creates (or updates the password of) a committee admin account.
 *
 * Usage:
 *   npx tsx scripts/create-admin.ts "Full Name" email@example.com
 *
 * Prompts for a password on stdin (not echoed to the terminal).
 */
import "dotenv/config";
import { createInterface } from "node:readline";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";

const [, , name, email] = process.argv;

if (!name || !email) {
  console.error('Usage: npx tsx scripts/create-admin.ts "Full Name" email@example.com');
  process.exit(1);
}

function askPasswordHidden(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    // @ts-expect-error — accessing the internal writer to suppress echo.
    const writeOriginal = rl._writeToOutput.bind(rl);
    let hide = false;
    // @ts-expect-error — same as above.
    rl._writeToOutput = (text: string) => {
      writeOriginal(hide ? "" : text);
    };
    rl.question(prompt, (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer);
    });
    hide = true;
  });
}

async function main() {
  const password = await askPasswordHidden(`Password for ${email}: `);
  if (password.length < 10) {
    console.error("Password must be at least 10 characters.");
    process.exit(1);
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not set.");
  const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.adminUser.upsert({
    where: { email },
    update: { name, passwordHash },
    create: { name, email, passwordHash, role: "ADMIN" },
  });

  console.log(`Admin account ready: ${user.email} (${user.role})`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
