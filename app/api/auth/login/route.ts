import { signIn } from "@/auth";
import { getUserByEmail } from "@/lib/query";
import { LoginFormValues, loginValidationSchema } from "@/lib/schema/login";
import { login_redirect } from "@/routes";
import { AuthError } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body: LoginFormValues = await req.json();
  const validated = loginValidationSchema.safeParse(body);
  const { email, password } = body;

  if (!validated.success) {
    return NextResponse.json({ message: "Fill your fields" }, { status: 409 });
  }
  const user = await getUserByEmail(email);

  try {
    if (user && !user?.emailVerified) {
      return NextResponse.json(
        { message: "Please activate your account", status: 501 },
        { status: 501 },
      );
    }
    await signIn("credentials", {
      email,
      password,
      redirect: false,
      redirectTo: login_redirect,
    });
    return NextResponse.json(
      { message: "Login successful", status: 200 },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return NextResponse.json(
            { message: "Invalid credentials." },
            { status: 501 },
          );

        case "CallbackRouteError": {
          return NextResponse.json(
            { message: "Could not login! Please check your credentials." },
            { status: 501 },
          );
        }

        case "EmailSignInError": {
          return NextResponse.json({ message: "Email Error" }, { status: 501 });
        }

        case "AccessDenied": {
          return NextResponse.json(
            { message: "Access denied, please activate your account" },
            { status: 501 },
          );
        }

        default:
          return NextResponse.json(
            { message: "Oops, something went wrong" },
            { status: 501 },
          );
      }
    }
    throw error;
  }
};
