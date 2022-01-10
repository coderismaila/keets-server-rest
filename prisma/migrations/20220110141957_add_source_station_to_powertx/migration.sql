-- AlterTable
ALTER TABLE "PowerTransformer" ADD COLUMN     "sourceStationId" TEXT;

-- AddForeignKey
ALTER TABLE "PowerTransformer" ADD CONSTRAINT "PowerTransformer_sourceStationId_fkey" FOREIGN KEY ("sourceStationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;
