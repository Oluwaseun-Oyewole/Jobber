import { z } from "zod";

export const otpValidationSchema = z.object({
  email: z.string().email("Email is required"),
  otp: z.string().min(6, "Otp is required"),
});

export type OTPFormValues = z.infer<typeof otpValidationSchema>;

export const otpResendValidationSchema = z.object({
  email: z.string().email("Email is required"),
});

export type OTPResendFormValues = z.infer<typeof otpResendValidationSchema>;
