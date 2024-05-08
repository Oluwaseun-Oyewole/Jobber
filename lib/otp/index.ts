import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";
import { compileOTPVerificationTemplate, sendMail } from "../mail";
import { getUserByEmail } from "../query";

export const sendOTPVerification = async ({
  email,
  username,
}: {
  email: string;
  username: string;
}) => {
  const userExist = await getUserByEmail(email);
  if (!userExist) {
    return NextResponse.json(
      { message: "Invalid email address!" },
      { status: 404 },
    );
  }
  function generateOTP(): string {
    return Math.floor(10000 + Math.random() * 900000).toString();
  }
  const currentDate = new Date();

  function addMinutes(date: Date, minutes: number) {
    date.setMinutes(date.getMinutes() + minutes);
    return date;
  }
  const otp = await prisma.otp.create({
    data: {
      otp: generateOTP(),
      userId: userExist.id,
      createdAt: currentDate,
      expiresAt: addMinutes(currentDate, 15),
    },
  });
  const body = await compileOTPVerificationTemplate(username, +otp.otp);
  return await sendMail({
    to: email,
    subject: `${otp.otp} is your verification code`,
    body,
  });
};
