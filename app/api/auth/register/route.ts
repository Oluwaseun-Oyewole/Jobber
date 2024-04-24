import { sendOTPVerification } from "@/lib/otp";
import prisma from "@/lib/prisma/prisma";
import { getUserByEmail } from "@/lib/query";
import {
  RegisterFormValues,
  registerValidationSchema,
} from "@/lib/schema/register";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body: RegisterFormValues = await req.json();
  const parsedFormValues = registerValidationSchema.safeParse(body);
  const { name, email, password, userType } = body;

  if (!parsedFormValues.success) {
    return NextResponse.json(
      { message: "Empty form fields not allowed" },
      { status: 409 },
    );
  }
  try {
    const user = await getUserByEmail(email);
    if (user) {
      return NextResponse.json(
        { message: "Email already exist" },
        { status: 409 },
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { name, email, password: hashedPassword, userType },
    });

    await sendOTPVerification({ email, username: name });
    return NextResponse.json(
      { message: "An otp code has been sent to your mail", status: 200 },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Oops, something went wrong" },
      { status: 501 },
    );
  }
};
