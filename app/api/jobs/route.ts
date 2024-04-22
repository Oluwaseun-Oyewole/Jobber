import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = await new URL(req.url);
  let resultsPerPage = Number(searchParams.get("resultsPerPage"));
  let page = Number(searchParams.get("page"))!;
  const location = searchParams.get("location");

  if (!resultsPerPage || resultsPerPage === 0) {
    resultsPerPage += 5;
  }
  if (page <= 0) {
    page += 1;
  }
  try {
    const jobs = await prisma.job.findMany({
      where: {
        OR: [{ location: "Remote" }, { OR: [{ country: location?.trim() }] }],
      },

      skip: (page - 1) * resultsPerPage,
      take: resultsPerPage,
    });

    const totalResults = jobs.length;
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    const total = page > totalPages ? 0 : totalResults;
    return NextResponse.json(
      {
        message: "success",
        data: {
          jobs,
          totalResults: page > totalPages ? total : totalResults,
          totalPages: totalPages === null ? 1 : totalPages,
          page,
          resultsPerPage,
          status: 200,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("error from fetching all", error);
    return NextResponse.json(
      { message: "Oops something went wrong" },
      { status: 501 },
    );
  }
};
