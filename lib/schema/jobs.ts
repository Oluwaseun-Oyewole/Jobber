import { z } from "zod";

export const jobValidationSchema = z.object({
  imageSrc: z.string(),

  jobTitle: z.string(),
  jobType: z.enum([
    "FullTime",
    "PartTime",
    "Internship",
    "Volunteer",
    "Contract",
  ]),
  datePosted: z.string(),
  salary: z.number(),
  jobInfo: z.string(),
  experience: z.enum(["Fresh", "Beginner", "Intermediate", "Expert"]),
  position: z.enum(["onSite", "Hybrid", "Remote"]),
});
