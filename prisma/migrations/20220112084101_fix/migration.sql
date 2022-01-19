-- AlterTable
ALTER TABLE "PowerTransformer" ALTER COLUMN "ratedCurrent" DROP NOT NULL,
ALTER COLUMN "ratedCurrent" DROP DEFAULT,
ALTER COLUMN "ratedCurrent" SET DATA TYPE TEXT;
