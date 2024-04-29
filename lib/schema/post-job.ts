import { z } from "zod";

export const jobPostValidationSchema = z.object({
  agreement: z.literal<boolean>(false),
  email: z.string(),
  hired: z.number(),
  imageSrc: z.string(),
  jobRole: z.string(),
  skills: z.string(),
  compensation: z.string(),
  process: z.string(),
  aboutCompany: z.string(),
  applicationLink: z.string(),
  location: z.string(),
  country: z.string(),
  companyName: z.string().min(2, "Company name required"),
  jobTitle: z.string().min(5, "Job title should be at-least 5 characters"),
  jobType: z.enum([
    "fulltime",
    "parttime",
    "internship",
    "volunteer",
    "contract",
  ]),
  datePosted: z.date(),
  salary: z.number(),
  jobInfo: z.string(),
  experience: z.enum(["Fresh", "Beginner", "Intermediate", "Expert", "Guru"]),
  position: z.enum(["Onsite", "Hybrid", "Remote"]),
});

export type JobPostFormValues = z.infer<typeof jobPostValidationSchema>;

export const stepOneJobPostValidationSchema = z.object({
  hired: z.number().min(1, "select your numbers of hire(s)"),
  imageSrc: z.string().optional(),
  applicationLink: z.string(),
  location: z.string(),
  country: z.string(),
  companyName: z.string().min(2, "Company name required"),
  jobTitle: z.string().min(5, "Job title should be at-least 5 characters"),
  jobType: z.enum([
    "fulltime",
    "parttime",
    "internship",
    "volunteer",
    "contract",
  ]),
  salary: z.number().min(10, "min value of $10"),
  experience: z.enum(["Fresh", "Beginner", "Intermediate", "Expert", "Guru"]),
  position: z.enum(["Onsite", "Hybrid", "Remote"]),
});

export type StepOneJobPostFormValues = z.infer<
  typeof stepOneJobPostValidationSchema
>;

export const StepTwoJobPostValidationSchema = z.object({
  agreement: z.literal<boolean>(true),
  jobRole: z.string().min(10, "brief description about the job role"),
  skills: z.string().min(10, "list the skill-sets required for the role"),
  compensation: z.string(),
  process: z.string().min(10, "application process"),
  aboutCompany: z.string().min(10, "brief description about the company"),
  datePosted: z.date(),
  jobInfo: z.string().min(10, "details about the job"),
});

export type StepTwoJobPostFormValues = z.infer<
  typeof StepTwoJobPostValidationSchema
>;
