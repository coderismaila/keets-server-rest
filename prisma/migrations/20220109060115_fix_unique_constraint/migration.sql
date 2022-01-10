/*
  Warnings:

  - A unique constraint covering the columns `[nercCode,stationId]` on the table `Feeder` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Feeder_nercCode_key";

-- CreateIndex
CREATE UNIQUE INDEX "Feeder_nercCode_stationId_key" ON "Feeder"("nercCode", "stationId");
