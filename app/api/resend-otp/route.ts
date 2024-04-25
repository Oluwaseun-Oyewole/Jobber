import { sendOTPVerification } from "@/lib/otp";
import { getUserByEmail } from "@/lib/query";
import {
  OTPResendFormValues,
  otpResendValidationSchema,
} from "@/lib/schema/otp";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body: OTPResendFormValues = await req.json();
  const parsedFormValues = otpResendValidationSchema.safeParse(body);
  const { email } = body;

  if (!parsedFormValues.success) {
    return NextResponse.json(
      { message: "Empty form fields not allowed" },
      { status: 409 },
    );
  }

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email address." },
        { status: 404 },
      );
    } else {
      await sendOTPVerification({ email, username: user.name! });
      return NextResponse.json(
        {
          message: "An otp code has been sent to your mail.",
          status: 200,
        },
        { status: 201 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Oops, something went wrong" },
      { status: 501 },
    );
  }
};
