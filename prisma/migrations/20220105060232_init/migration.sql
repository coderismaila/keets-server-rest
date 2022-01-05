-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER', 'USER', 'MOD', 'ADMIN');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "StationType" AS ENUM ('TRANSMISSION', 'DISTRIBUTION');

-- CreateEnum
CREATE TYPE "VoltageLevel" AS ENUM ('KV33', 'KV11');

-- CreateEnum
CREATE TYPE "Designation" AS ENUM ('CHIEF_TECHNICAL_OFFICER', 'HEAD_OF_UNIT', 'TECHNICAL_MANAGER', 'TEAM_LEAD', 'TEAM_MEMBER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'USER',
    "designation" "Designation" NOT NULL,
    "jobDescriptionId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT,
    "gender" "Gender" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "birthDate" TIMESTAMP(3),
    "phoneNumber" TEXT,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "stateOfOrigin" TEXT,
    "country" TEXT DEFAULT E'nigeria',
    "areaOfficeId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobDescription" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "JobDescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AreaOffice" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "technicalManagerId" TEXT,
    "areaManagerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "AreaOffice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Station" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "areaOfficeId" TEXT,
    "stationType" "StationType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PowerTransformer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacityKVA" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "stationId" TEXT NOT NULL,
    "feeder33kvId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PowerTransformer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feeder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "voltageLevel" "VoltageLevel" NOT NULL,
    "routeLength" DOUBLE PRECISION DEFAULT 0,
    "kaedcoCode" TEXT NOT NULL,
    "nercCode" TEXT NOT NULL,
    "powerTransformerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feeder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_staffId_key" ON "User"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE INDEX "User_email_username_staffId_phoneNumber_idx" ON "User"("email", "username", "staffId", "phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "JobDescription_name_key" ON "JobDescription"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AreaOffice_name_key" ON "AreaOffice"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AreaOffice_technicalManagerId_key" ON "AreaOffice"("technicalManagerId");

-- CreateIndex
CREATE UNIQUE INDEX "AreaOffice_areaManagerId_key" ON "AreaOffice"("areaManagerId");

-- CreateIndex
CREATE UNIQUE INDEX "Station_name_key" ON "Station"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PowerTransformer_feeder33kvId_key" ON "PowerTransformer"("feeder33kvId");

-- CreateIndex
CREATE UNIQUE INDEX "PowerTransformer_name_stationId_key" ON "PowerTransformer"("name", "stationId");

-- CreateIndex
CREATE UNIQUE INDEX "Feeder_name_key" ON "Feeder"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Feeder_kaedcoCode_key" ON "Feeder"("kaedcoCode");

-- CreateIndex
CREATE UNIQUE INDEX "Feeder_nercCode_key" ON "Feeder"("nercCode");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_jobDescriptionId_fkey" FOREIGN KEY ("jobDescriptionId") REFERENCES "JobDescription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_areaOfficeId_fkey" FOREIGN KEY ("areaOfficeId") REFERENCES "AreaOffice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreaOffice" ADD CONSTRAINT "AreaOffice_technicalManagerId_fkey" FOREIGN KEY ("technicalManagerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreaOffice" ADD CONSTRAINT "AreaOffice_areaManagerId_fkey" FOREIGN KEY ("areaManagerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Station" ADD CONSTRAINT "Station_areaOfficeId_fkey" FOREIGN KEY ("areaOfficeId") REFERENCES "AreaOffice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PowerTransformer" ADD CONSTRAINT "PowerTransformer_feeder33kvId_fkey" FOREIGN KEY ("feeder33kvId") REFERENCES "Feeder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PowerTransformer" ADD CONSTRAINT "PowerTransformer_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feeder" ADD CONSTRAINT "Feeder_powerTransformerId_fkey" FOREIGN KEY ("powerTransformerId") REFERENCES "PowerTransformer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
