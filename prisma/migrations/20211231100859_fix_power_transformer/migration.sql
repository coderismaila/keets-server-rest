/*
  Warnings:

  - A unique constraint covering the columns `[name,stationId]` on the table `PowerTransformer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PowerTransformer_name_key";

-- DropIndex
DROP INDEX "PowerTransformer_stationId_key";

-- CreateIndex
CREATE UNIQUE INDEX "PowerTransformer_name_stationId_key" ON "PowerTransformer"("name", "stationId");
