import { z } from "zod";

export const forgotPasswordValidationSchema = z.object({
  email: z.string().email("Invalid email format"),
});

export type forgotPasswordFormValues = z.infer<
  typeof forgotPasswordValidationSchema
>;
