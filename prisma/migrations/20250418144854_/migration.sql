-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_userId_fkey";

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
