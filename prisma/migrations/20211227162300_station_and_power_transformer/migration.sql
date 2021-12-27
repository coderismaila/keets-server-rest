-- CreateEnum
CREATE TYPE "StationType" AS ENUM ('TRANSMISSION', 'DISTRIBUTION');

-- CreateTable
CREATE TABLE "Station" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "areaOfficeId" TEXT,
    "stationType" "StationType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PowerTransformer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stationId" TEXT NOT NULL,
    "capacityKVA" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PowerTransformer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Station_name_key" ON "Station"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Station_areaOfficeId_key" ON "Station"("areaOfficeId");

-- CreateIndex
CREATE UNIQUE INDEX "PowerTransformer_name_key" ON "PowerTransformer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PowerTransformer_stationId_key" ON "PowerTransformer"("stationId");

-- AddForeignKey
ALTER TABLE "Station" ADD CONSTRAINT "Station_areaOfficeId_fkey" FOREIGN KEY ("areaOfficeId") REFERENCES "AreaOffice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PowerTransformer" ADD CONSTRAINT "PowerTransformer_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
