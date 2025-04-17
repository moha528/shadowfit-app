-- DropForeignKey
ALTER TABLE "ProgramDay" DROP CONSTRAINT "ProgramDay_programId_fkey";

-- AddForeignKey
ALTER TABLE "ProgramDay" ADD CONSTRAINT "ProgramDay_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;
