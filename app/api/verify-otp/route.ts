import prisma from "@/lib/prisma/prisma";
import { getUserByEmail } from "@/lib/query";
import { OTPFormValues, otpValidationSchema } from "@/lib/schema/otp";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body: OTPFormValues = await req.json();
  const parsedFormValues = otpValidationSchema.safeParse(body);
  const { email, otp } = body;

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
    }
    const getOTPCode = await prisma.otp.findFirst({
      where: { userId: user.id, otp },
    });
    if (getOTPCode) {
      if (user.emailVerified) {
        return NextResponse.json(
          {
            message: "Account already activated. Please log in.",
          },
          { status: 501 },
        );
      } else {
        const { userId, otp, expiresAt } = getOTPCode;
        if (new Date() < expiresAt) {
          if (otp !== otp) {
            return NextResponse.json(
              { message: "Invalid otp code passed. Check your inbox." },
              { status: 501 },
            );
          } else {
            await prisma.user.update({
              where: { id: userId },
              data: { emailVerified: new Date() },
            });
            await prisma.otp.delete({
              where: { id: getOTPCode.id, userId, otp },
            });
            return NextResponse.json(
              {
                message: "Your account has been successfully activated.",
                status: 200,
              },
              { status: 200 },
            );
          }
        } else {
          return NextResponse.json(
            { message: "Your otp code has expired." },
            { status: 501 },
          );
        }
      }
    }
    return NextResponse.json(
      { message: "Otp code does not exist or has been used." },
      { status: 501 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Oops, something went wrong." },
      { status: 501 },
    );
  }
};
