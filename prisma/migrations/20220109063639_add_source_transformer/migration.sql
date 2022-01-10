-- AlterTable
ALTER TABLE "PowerTransformer" ADD COLUMN     "ratedCurrent" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "sourcePowerTransformerId" TEXT,
ADD COLUMN     "transformerPeakLoadMW" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "voltageRating" TEXT;

-- AddForeignKey
ALTER TABLE "PowerTransformer" ADD CONSTRAINT "PowerTransformer_sourcePowerTransformerId_fkey" FOREIGN KEY ("sourcePowerTransformerId") REFERENCES "PowerTransformer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
