/*
  Warnings:

  - A unique constraint covering the columns `[areaOfficeId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `areaOfficeId` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "areaOfficeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AreaOffice" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "areaManagerId" TEXT NOT NULL,
    "technicalManagerId" TEXT NOT NULL,

    CONSTRAINT "AreaOffice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AreaOffice_areaManagerId_key" ON "AreaOffice"("areaManagerId");

-- CreateIndex
CREATE UNIQUE INDEX "AreaOffice_technicalManagerId_key" ON "AreaOffice"("technicalManagerId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_areaOfficeId_key" ON "Profile"("areaOfficeId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_areaOfficeId_fkey" FOREIGN KEY ("areaOfficeId") REFERENCES "AreaOffice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreaOffice" ADD CONSTRAINT "AreaOffice_technicalManagerId_fkey" FOREIGN KEY ("technicalManagerId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreaOffice" ADD CONSTRAINT "AreaOffice_areaManagerId_fkey" FOREIGN KEY ("areaManagerId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
