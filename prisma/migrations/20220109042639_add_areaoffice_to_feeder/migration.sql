/*
  Warnings:

  - Added the required column `areaOfficeId` to the `Feeder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feeder" ADD COLUMN     "areaOfficeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Feeder" ADD CONSTRAINT "Feeder_areaOfficeId_fkey" FOREIGN KEY ("areaOfficeId") REFERENCES "AreaOffice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
