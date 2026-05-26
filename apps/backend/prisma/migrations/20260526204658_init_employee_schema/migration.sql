-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('FULL_TIME', 'CONTRACT', 'INTERN');

-- CreateEnum
CREATE TYPE "EmployeeStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "employmentType" "EmploymentType" NOT NULL,
    "dateOfJoining" TIMESTAMP(3) NOT NULL,
    "managerName" TEXT,
    "status" "EmployeeStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employeeId_key" ON "Employee"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE INDEX "Employee_country_idx" ON "Employee"("country");

-- CreateIndex
CREATE INDEX "Employee_jobTitle_idx" ON "Employee"("jobTitle");

-- CreateIndex
CREATE INDEX "Employee_country_jobTitle_idx" ON "Employee"("country", "jobTitle");
