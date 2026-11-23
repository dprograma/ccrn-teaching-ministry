-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('ADMIN', 'EDITOR');

-- CreateEnum
CREATE TYPE "EBookStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "TeachingStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "SelahSection" AS ENUM ('STUDY', 'WORSHIP');

-- CreateEnum
CREATE TYPE "SelahLanguage" AS ENUM ('LATIN', 'YORUBA', 'IGBO', 'HAUSA', 'ENGLISH');

-- CreateEnum
CREATE TYPE "SelahSourceType" AS ENUM ('EMBED', 'HOSTED');

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'EDITOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EBook" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT NOT NULL,
    "seriesLabel" TEXT,
    "coverUrl" TEXT,
    "status" "EBookStatus" NOT NULL DEFAULT 'DRAFT',
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EBookChapter" (
    "id" TEXT NOT NULL,
    "ebookId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "EBookChapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teaching" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "speaker" TEXT,
    "scripture" TEXT,
    "summary" TEXT NOT NULL,
    "body" TEXT,
    "videoUrl" TEXT,
    "status" "TeachingStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Teaching_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelahEntry" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "language" "SelahLanguage" NOT NULL,
    "section" "SelahSection" NOT NULL,
    "description" TEXT NOT NULL,
    "sourceType" "SelahSourceType" NOT NULL,
    "embedUrl" TEXT,
    "audioUrl" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SelahEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsPhoto" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EBook_slug_key" ON "EBook"("slug");

-- CreateIndex
CREATE INDEX "EBook_status_position_idx" ON "EBook"("status", "position");

-- CreateIndex
CREATE INDEX "EBookChapter_ebookId_position_idx" ON "EBookChapter"("ebookId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Teaching_slug_key" ON "Teaching"("slug");

-- CreateIndex
CREATE INDEX "Teaching_status_publishedAt_idx" ON "Teaching"("status", "publishedAt");

-- CreateIndex
CREATE INDEX "SelahEntry_section_language_published_idx" ON "SelahEntry"("section", "language", "published");

-- AddForeignKey
ALTER TABLE "EBook" ADD CONSTRAINT "EBook_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EBookChapter" ADD CONSTRAINT "EBookChapter_ebookId_fkey" FOREIGN KEY ("ebookId") REFERENCES "EBook"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teaching" ADD CONSTRAINT "Teaching_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelahEntry" ADD CONSTRAINT "SelahEntry_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsPhoto" ADD CONSTRAINT "NewsPhoto_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

