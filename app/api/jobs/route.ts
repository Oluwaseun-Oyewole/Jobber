import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = await new URL(req.url);
  let resultsPerPage = Number(searchParams.get("resultsPerPage"));
  let page = Number(searchParams.get("page"))!;

  if (!resultsPerPage || resultsPerPage === 0) {
    resultsPerPage += 5;
  }
  if (page <= 0) {
    page += 1;
  }
  try {
    const jobs = await prisma.job.findMany({
      skip: (page - 1) * resultsPerPage,
      take: resultsPerPage,
    });

    const totalResults = await prisma.job.count();
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
    return NextResponse.json(
      { message: "Oops something went wrong" },
      { status: 501 },
    );
  }
};
