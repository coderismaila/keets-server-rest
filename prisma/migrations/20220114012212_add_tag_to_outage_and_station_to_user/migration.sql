-- AlterTable
ALTER TABLE "Outage" ADD COLUMN     "tagHolderId" TEXT,
ADD COLUMN     "tagInTime" TIMESTAMP(3),
ADD COLUMN     "tagNumber" INTEGER,
ADD COLUMN     "tagOutTime" TIMESTAMP(3),
ADD COLUMN     "thirdPartyName" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "stationId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outage" ADD CONSTRAINT "Outage_tagHolderId_fkey" FOREIGN KEY ("tagHolderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
