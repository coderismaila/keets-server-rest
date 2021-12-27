/*
  Warnings:

  - A unique constraint covering the columns `[feeder33kvId]` on the table `PowerTransformer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "VoltageLevel" AS ENUM ('KV33', 'KV11');

-- AlterTable
ALTER TABLE "PowerTransformer" ADD COLUMN     "feeder33kvId" TEXT;

-- CreateTable
CREATE TABLE "Feeder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "voltageLevel" "VoltageLevel" NOT NULL,
    "routeLength" DOUBLE PRECISION DEFAULT 0,
    "kaedcoCode" TEXT NOT NULL,
    "nercCode" TEXT NOT NULL,
    "powerTransformerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feeder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Feeder_name_key" ON "Feeder"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Feeder_kaedcoCode_key" ON "Feeder"("kaedcoCode");

-- CreateIndex
CREATE UNIQUE INDEX "Feeder_nercCode_key" ON "Feeder"("nercCode");

-- CreateIndex
CREATE UNIQUE INDEX "PowerTransformer_feeder33kvId_key" ON "PowerTransformer"("feeder33kvId");

-- AddForeignKey
ALTER TABLE "PowerTransformer" ADD CONSTRAINT "PowerTransformer_feeder33kvId_fkey" FOREIGN KEY ("feeder33kvId") REFERENCES "Feeder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feeder" ADD CONSTRAINT "Feeder_powerTransformerId_fkey" FOREIGN KEY ("powerTransformerId") REFERENCES "PowerTransformer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
