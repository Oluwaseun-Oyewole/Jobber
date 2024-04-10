import { z } from "zod";

export const loginValidationSchema = z.object({
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
});

export type LoginFormValues = z.infer<typeof loginValidationSchema>;
