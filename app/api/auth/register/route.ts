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
  const { name, email, password } = body;

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
      data: { name, email, password: hashedPassword },
    });
    return NextResponse.json(
      { message: "User registration successful", status: 200 },
      { status: 201 },
    );
  } catch (error) {
    console.log("error from reg", error);
    return NextResponse.json(
      { message: "Oops, something went wrong" },
      { status: 501 },
    );
  }
};
