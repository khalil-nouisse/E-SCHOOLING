-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('AGENT', 'STUDENT');

-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('PENDING', 'VALIDATED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "cin" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" INTEGER NOT NULL,
    "baccalaureateType" TEXT NOT NULL,
    "baccalaureateYear" INTEGER NOT NULL,
    "statusCodeStudent" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SchoolingAgent" (
    "id" INTEGER NOT NULL,
    "employmentDate" TIMESTAMP(3) NOT NULL,
    "position" TEXT,
    "department" TEXT,
    "salary" DOUBLE PRECISION,
    "phoneNumber" TEXT,

    CONSTRAINT "SchoolingAgent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inscription" (
    "id" SERIAL NOT NULL,
    "status" "STATUS" NOT NULL,
    "submissionDate" TIMESTAMP(3) NOT NULL,
    "validationDate" TIMESTAMP(3),
    "rejectionComment" TEXT,
    "isFirstInscription" BOOLEAN NOT NULL,
    "studentId" INTEGER NOT NULL,
    "agentId" INTEGER,
    "majorId" INTEGER NOT NULL,

    CONSTRAINT "Inscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Major" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "Major_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "isVerified" BOOLEAN NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "filePath" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "inscriptionId" INTEGER,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certification" (
    "id" SERIAL NOT NULL,
    "certificationNumber" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "generationDate" TIMESTAMP(3) NOT NULL,
    "inscriptionId" INTEGER,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cin_key" ON "User"("cin");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_id_key" ON "Student"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Major_code_key" ON "Major"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Certification_certificationNumber_key" ON "Certification"("certificationNumber");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolingAgent" ADD CONSTRAINT "SchoolingAgent_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscription" ADD CONSTRAINT "Inscription_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscription" ADD CONSTRAINT "Inscription_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "SchoolingAgent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscription" ADD CONSTRAINT "Inscription_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_inscriptionId_fkey" FOREIGN KEY ("inscriptionId") REFERENCES "Inscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_inscriptionId_fkey" FOREIGN KEY ("inscriptionId") REFERENCES "Inscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;
