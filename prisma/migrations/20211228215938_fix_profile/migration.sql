-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_areaOfficeId_fkey";

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "phoneNumber" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "areaOfficeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_areaOfficeId_fkey" FOREIGN KEY ("areaOfficeId") REFERENCES "AreaOffice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
