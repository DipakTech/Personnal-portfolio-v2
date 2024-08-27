/*
  Warnings:

  - You are about to drop the column `category` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `thumnail` on the `Post` table. All the data in the column will be lost.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postId` on the `Tag` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postCategoryId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_postId_fkey";

-- DropIndex
DROP INDEX "Tag_postId_idx";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "category",
DROP COLUMN "thumnail",
ADD COLUMN     "postCategoryId" TEXT NOT NULL,
ADD COLUMN     "thumbnail" TEXT;

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
DROP COLUMN "postId",
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "PostCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PostCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostTag" (
    "postId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "PostTag_pkey" PRIMARY KEY ("postId","tagId")
);

-- CreateIndex
CREATE INDEX "PostTag_postId_idx" ON "PostTag"("postId");

-- CreateIndex
CREATE INDEX "PostTag_tagId_idx" ON "PostTag"("tagId");

-- CreateIndex
CREATE INDEX "Post_postCategoryId_idx" ON "Post"("postCategoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_postCategoryId_fkey" FOREIGN KEY ("postCategoryId") REFERENCES "PostCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
