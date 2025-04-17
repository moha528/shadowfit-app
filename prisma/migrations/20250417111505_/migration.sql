/*
  Warnings:

  - The `type` column on the `Exercise` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "image" TEXT,
DROP COLUMN "type",
ADD COLUMN     "type" "Gender" NOT NULL DEFAULT 'MALE';
