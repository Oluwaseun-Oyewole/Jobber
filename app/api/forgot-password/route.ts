import { jwtService } from "@/lib/jwt";
import { compileResetPasswordTemplate, sendMail } from "@/lib/mail";
import { getUserByEmail } from "@/lib/query";
import {
  ForgotPasswordFormValues,
  forgotPasswordValidationSchema,
} from "@/lib/schema/forgot-password";
import { truncate } from "@/utils/helper";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body: ForgotPasswordFormValues = await req.json();
  const parsedFormValues = forgotPasswordValidationSchema.safeParse(body);
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
        { message: "Invalid email address" },
        { status: 409 },
      );
    }

    const jwtUserId = await jwtService.sign({ id: user.id! }, "15m");
    const resetPasswordURL = `${process.env.NEXTAUTH_URL}/auth/password-reset/${jwtUserId}`;
    const body = compileResetPasswordTemplate(
      user.name!,
      resetPasswordURL,
      truncate(resetPasswordURL, 70),
    );

    await sendMail({
      to: email,
      subject: "Reset Password",
      body: body,
    });

    return NextResponse.json(
      { message: "Reset link was sent to your mail", status: 200 },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Oops, something went wrong" },
      { status: 501 },
    );
  }
};
