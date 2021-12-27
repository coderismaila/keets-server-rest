/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `AreaOffice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AreaOffice_name_key" ON "AreaOffice"("name");
