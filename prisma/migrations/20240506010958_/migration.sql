-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('fulltime', 'parttime', 'internship', 'volunteer', 'contract');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('Employer', 'JobSeeker');

-- CreateEnum
CREATE TYPE "Experience" AS ENUM ('Fresh', 'Beginner', 'Intermediate', 'Expert', 'Guru');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('Onsite', 'Remote', 'Hybrid');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otp" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "otp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "email" TEXT,
    "user_type" "UserType" NOT NULL DEFAULT 'JobSeeker',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email_verified" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL,
    "image_src" TEXT,
    "job_title" TEXT NOT NULL,
    "job_type" "JobType" NOT NULL,
    "date_posted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "salary" INTEGER,
    "job_description" TEXT NOT NULL,
    "jobRole" TEXT,
    "skills" TEXT,
    "compensation" TEXT,
    "hired" INTEGER,
    "process" TEXT,
    "location" TEXT,
    "experience" "Experience" NOT NULL,
    "position" "Position" NOT NULL,
    "companyName" TEXT,
    "aboutCompany" TEXT,
    "country" TEXT,
    "applicationLink" TEXT,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_provider_account_id_key" ON "Account"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "otp" ADD CONSTRAINT "otp_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
