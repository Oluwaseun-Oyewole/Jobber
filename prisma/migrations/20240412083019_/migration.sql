/*
  Warnings:

  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('FullTime', 'ParTime', 'Internship', 'Volunterr', 'Contract');

-- CreateEnum
CREATE TYPE "Experience" AS ENUM ('Fresh', 'Beginner', 'Intermediate', 'Expert', 'Guru');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('onSite', 'Remote', 'Hybrid');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "image_src" TEXT,
    "job_title" TEXT NOT NULL,
    "job_type" "JobType" NOT NULL,
    "date_posted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "salary" INTEGER,
    "job_description" TEXT NOT NULL,
    "experience" "Experience" NOT NULL,
    "position" "Position" NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);
