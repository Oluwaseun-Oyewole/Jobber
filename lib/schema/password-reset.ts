import { z } from "zod";

export const passwordResetValidationSchema = z.object({
  jwtUserId: z.string(),
  oldPassword: z
    .string()
    .min(6, "Password must at least be 6 characters")
    .optional(),
  newPassword: z
    .string()
    .refine(
      (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[!@#$%^&*:;'><.,/?}{[\]\-_+=])(?=.{8,})/.test(
          value ?? "",
        ),
      "Must Contain 7 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
    ),
});

export type PasswordResetFormValues = z.infer<
  typeof passwordResetValidationSchema
>;
