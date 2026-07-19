/*
  Warnings:

  - Added the required column `analysis` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atsScore` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extractedText` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "analysis" JSONB NOT NULL,
ADD COLUMN     "atsScore" INTEGER NOT NULL,
ADD COLUMN     "extractedText" TEXT NOT NULL;
