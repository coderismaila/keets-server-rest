/*
  Warnings:

  - A unique constraint covering the columns `[areaManagerId]` on the table `AreaOffice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[technicalManagerId]` on the table `AreaOffice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AreaOffice_areaManagerId_key" ON "AreaOffice"("areaManagerId");

-- CreateIndex
CREATE UNIQUE INDEX "AreaOffice_technicalManagerId_key" ON "AreaOffice"("technicalManagerId");
