/*
  Warnings:

  - You are about to drop the `Job` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Job";

-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL,
    "image_src" TEXT,
    "job_title" TEXT NOT NULL,
    "job_type" "JobType" NOT NULL,
    "date_posted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "salary" INTEGER,
    "job_description" TEXT NOT NULL,
    "experience" "Experience" NOT NULL,
    "position" "Position" NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);
