-- CreateEnum
CREATE TYPE "OutageType" AS ENUM ('FORCED', 'EMERGENCY', 'PLANNED', 'SBT_COMPLIANCE', 'FREQUENCY_CONTROL', 'SYSTEM_COLLAPSE');

-- CreateTable
CREATE TABLE "Outage" (
    "id" TEXT NOT NULL,
    "feederId" TEXT NOT NULL,
    "timeOut" TIMESTAMP(3) NOT NULL,
    "timeIn" TIMESTAMP(3),
    "outageType" "OutageType" NOT NULL,
    "relayIndication" TEXT,
    "loadLoss" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cause" TEXT,
    "resolution" TEXT,
    "staffNameTCN" TEXT,
    "staffId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Outage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Outage" ADD CONSTRAINT "Outage_feederId_fkey" FOREIGN KEY ("feederId") REFERENCES "Feeder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outage" ADD CONSTRAINT "Outage_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
