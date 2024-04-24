import { z } from "zod";

export const registerValidationSchema = z.object({
  agreement: z.literal<boolean>(true),
  name: z.string().min(4, "Username name must be at least 4 characters"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .refine(
      (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[!@#$%^&*:;'><.,/?}{[\]\-_+=])(?=.{8,})/.test(
          value ?? "",
        ),
      "Must Contain 7 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
    ),
  userType: z.union([z.literal("Employer"), z.literal("JobSeeker")]),
});

export type RegisterFormValues = z.infer<typeof registerValidationSchema>;
