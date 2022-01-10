/*
  Warnings:

  - Added the required column `stationId` to the `Feeder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feeder" ADD COLUMN     "stationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Feeder" ADD CONSTRAINT "Feeder_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
