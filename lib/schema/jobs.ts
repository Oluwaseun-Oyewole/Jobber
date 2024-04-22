import { z } from "zod";

export const jobValidationSchema = z.object({
  id: z.string(),
  imageSrc: z.string(),
  jobRole: z.string(),
  skills: z.string(),
  compensation: z.string(),
  process: z.string(),
  aboutCompany: z.string(),
  applicationLink: z.string(),
  location: z.string(),
  country: z.string(),
  companyName: z.string(),
  jobTitle: z.string(),
  jobType: z.enum([
    "fulltime",
    "parttime",
    "internship",
    "volunteer",
    "contract",
  ]),
  datePosted: z.string(),
  salary: z.number(),
  jobInfo: z.string(),
  experience: z.enum(["Fresh", "Beginner", "Intermediate", "Expert", "Guru"]),
  position: z.enum(["Onsite", "Hybrid", "Remote"]),
});
