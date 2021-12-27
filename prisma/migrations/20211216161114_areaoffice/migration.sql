-- DropForeignKey
ALTER TABLE "AreaOffice" DROP CONSTRAINT "AreaOffice_areaManagerId_fkey";

-- DropForeignKey
ALTER TABLE "AreaOffice" DROP CONSTRAINT "AreaOffice_technicalManagerId_fkey";

-- AlterTable
ALTER TABLE "AreaOffice" ALTER COLUMN "areaManagerId" DROP NOT NULL,
ALTER COLUMN "technicalManagerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "AreaOffice" ADD CONSTRAINT "AreaOffice_technicalManagerId_fkey" FOREIGN KEY ("technicalManagerId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreaOffice" ADD CONSTRAINT "AreaOffice_areaManagerId_fkey" FOREIGN KEY ("areaManagerId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
