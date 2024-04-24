export const maxDuration = 10;
export const dynamic = "force-dynamic";

import { jwtService } from "@/lib/jwt";
import prisma from "@/lib/prisma/prisma";
import { getUserById } from "@/lib/query";
import {
  PasswordResetFormValues,
  passwordResetValidationSchema,
} from "@/lib/schema/password-reset";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body: PasswordResetFormValues = await req.json();
  const parsedFormValues = passwordResetValidationSchema.safeParse(body);
  const { newPassword, jwtUserId } = body;
  const payload: any = await jwtService.verify(jwtUserId);

  if (!parsedFormValues.success) {
    return NextResponse.json(
      { message: "Empty form fields not allowed" },
      { status: 409 },
    );
  }
  if (!payload)
    return NextResponse.json({ message: "Invalid Token" }, { status: 404 });
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await getUserById(payload?.id);
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 409 },
      );
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
        },
      });
      return NextResponse.json(
        { message: "Password update successful", status: 200 },
        { status: 200 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Oops, something went wrong" },
      { status: 501 },
    );
  }
};
