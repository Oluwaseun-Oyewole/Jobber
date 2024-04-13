import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  //   const { searchParams } = new URL(req.url);

  //   const sortBy = searchParams.get("sortBy");
  //   const jobType = searchParams.get("jobType")!;
  //   const experience = searchParams.get("experience");
  //   const position = searchParams.get("position");

  try {
    const filteredResult = await prisma.job.findMany({
      where: {
        jobType: "Contract",

        OR: [
          {
            experience: "Expert",
          },
          { position: "Hybrid" },
        ],
      },
    });
    return NextResponse.json(
      { message: "success", data: filteredResult },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Oops something went wrong" },
      { status: 501 },
    );
  }
};
