-- DropForeignKey
ALTER TABLE "PowerTransformer" DROP CONSTRAINT "PowerTransformer_stationId_fkey";

-- AlterTable
ALTER TABLE "PowerTransformer" ALTER COLUMN "stationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PowerTransformer" ADD CONSTRAINT "PowerTransformer_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;
