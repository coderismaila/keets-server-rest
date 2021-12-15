/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gender` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "gender" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Profile_userId_phoneNumber_idx" ON "Profile"("userId", "phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_phoneNumber_key" ON "Profile"("phoneNumber");
