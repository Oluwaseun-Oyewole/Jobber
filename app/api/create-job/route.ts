import { getUserByEmail } from "@/lib/query";
import { JobPostFormValues } from "@/lib/schema/post-job";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body: JobPostFormValues = await req.json();
  // const parsedFormValues = jobPostValidationSchema.safeParse(body);
  const {
    email,
    datePosted,
    salary,
    imageSrc,
    jobInfo,
    jobRole,
    jobTitle,
    jobType,
    skills,
    compensation,
    hired,
    process,
    location,
    experience,
    position,
    companyName,
    aboutCompany,
    country,
    applicationLink,
  } = body;

  // if (!parsedFormValues.success) {
  //   return NextResponse.json(
  //     { message: "Empty form fields not allowed" },
  //     { status: 409 },
  //   );
  // }
  try {
    const user = await getUserByEmail(email!);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 501 });
    }
    await prisma.job.create({
      data: {
        jobId: user.id,
        datePosted,
        salary,
        imageSrc,
        jobInfo,
        jobTitle,
        jobRole,
        jobType,
        skills,
        compensation,
        hired,
        process,
        location,
        experience,
        position,
        companyName,
        aboutCompany,
        country,
        applicationLink,
      },
    });
    return NextResponse.json(
      { message: "New Job created", status: 200 },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Oops, something went wrong" },
      { status: 501 },
    );
  }
};
